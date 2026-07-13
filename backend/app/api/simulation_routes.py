from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.api.dependencies import authorize_user_access, get_current_payload
from app.database.database import get_db
from app.intelligence.scenarios_generator import generate_scenarios
from app.models import financial_profile, loan_model, simulation_model
from app.schemas.simulation_schema import SimulationCreate, SimulationUpdate, SimulationResponse
from app.services.simulation_service import (
    create_simulation,
    get_simulation_by_id,
    get_simulations_by_user,
    update_simulation,
    delete_simulation,
)


router = APIRouter(
	prefix="/simulation",
	tags=["Simulation"],
)


class SimulationRequest(BaseModel):
	user_id: int


def _build_simulation_payload(user_id: int, db: Session):
	profile = (
		db.query(financial_profile.FinancialProfile)
		.filter(financial_profile.FinancialProfile.user_id == user_id)
		.first()
	)
	if not profile:
		raise HTTPException(status_code=404, detail="Financial profile not found")

	loans = (
		db.query(loan_model.Loan)
		.filter(loan_model.Loan.user_id == user_id)
		.all()
	)
	if not loans:
		raise HTTPException(status_code=404, detail="No loans found for this user")

	loan_inputs = [
		{
			"loan_id": loan.id,
			"balance": loan.amount,
			"interest_rate": loan.interest_rate,
			"emi": loan.emi,
		}
		for loan in loans
	]

	analysis = generate_scenarios(loan_inputs, profile.income)

	total_emi = sum(loan.emi for loan in loans)
	total_balance = sum(loan.amount for loan in loans)
	emi_income_ratio = round((total_emi / profile.income) * 100, 2) if profile.income > 0 else None

	return {
		"user_id": user_id,
		"summary": {
			"loan_count": len(loans),
			"total_balance": round(total_balance, 2),
			"total_emi": round(total_emi, 2),
			"emi_income_ratio": emi_income_ratio,
		},
		"analysis": analysis,
	}


# CRUD Endpoints

@router.get("/", response_model=list[SimulationResponse])
def list_simulations(
	db: Session = Depends(get_db),
	current_payload: dict = Depends(get_current_payload),
):
	"""Get all simulations for the current user."""
	user_id = current_payload.get("user_id")
	return get_simulations_by_user(db, user_id)


@router.post("/", response_model=SimulationResponse, status_code=201)
def create_new_simulation(
	sim: SimulationCreate,
	db: Session = Depends(get_db),
	current_payload: dict = Depends(get_current_payload),
):
	"""Create a new simulation."""
	authorize_user_access(sim.user_id, current_payload)
	return create_simulation(db, sim.user_id, sim.name, sim.parameters, sim.result)


@router.get("/{simulation_id}", response_model=SimulationResponse)
def read_simulation(
	simulation_id: int,
	db: Session = Depends(get_db),
	current_payload: dict = Depends(get_current_payload),
):
	"""Get a specific simulation by ID."""
	simulation = get_simulation_by_id(db, simulation_id)
	if not simulation:
		raise HTTPException(status_code=404, detail="Simulation not found")
	authorize_user_access(simulation.user_id, current_payload)
	return simulation


@router.put("/{simulation_id}", response_model=SimulationResponse)
def update_existing_simulation(
	simulation_id: int,
	sim_update: SimulationUpdate,
	db: Session = Depends(get_db),
	current_payload: dict = Depends(get_current_payload),
):
	"""Update a simulation."""
	simulation = get_simulation_by_id(db, simulation_id)
	if not simulation:
		raise HTTPException(status_code=404, detail="Simulation not found")
	authorize_user_access(simulation.user_id, current_payload)
	update_data = sim_update.dict(exclude_unset=True)
	return update_simulation(db, simulation_id, **update_data)


@router.delete("/{simulation_id}", status_code=204)
def delete_existing_simulation(
	simulation_id: int,
	db: Session = Depends(get_db),
	current_payload: dict = Depends(get_current_payload),
):
	"""Delete a simulation."""
	simulation = get_simulation_by_id(db, simulation_id)
	if not simulation:
		raise HTTPException(status_code=404, detail="Simulation not found")
	authorize_user_access(simulation.user_id, current_payload)
	delete_simulation(db, simulation_id)


# Specialized Endpoints

@router.post("/run")
def run_simulation(
	payload: SimulationRequest,
	db: Session = Depends(get_db),
	current_payload: dict = Depends(get_current_payload),
):
	authorize_user_access(payload.user_id, current_payload)
	return _build_simulation_payload(payload.user_id, db)


@router.get("/user/{user_id}")
def get_user_simulation(
	user_id: int,
	db: Session = Depends(get_db),
	payload: dict = Depends(get_current_payload),
):
	authorize_user_access(user_id, payload)
	return _build_simulation_payload(user_id, db)
