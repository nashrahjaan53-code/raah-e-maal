from sqlalchemy.orm import Session

from app.models.simulation_model import Simulation


def create_simulation(
	db: Session,
	user_id: int,
	name: str,
	parameters: dict,
	result: dict,
) -> Simulation:
	simulation = Simulation(
		user_id=user_id,
		name=name,
		parameters=parameters,
		result=result,
	)
	db.add(simulation)
	db.commit()
	db.refresh(simulation)
	return simulation


def get_simulation_by_id(db: Session, simulation_id: int) -> Simulation | None:
	return db.query(Simulation).filter(Simulation.id == simulation_id).first()


def get_simulations_by_user(db: Session, user_id: int) -> list[Simulation]:
	return (
		db.query(Simulation)
		.filter(Simulation.user_id == user_id)
		.order_by(Simulation.id.desc())
		.all()
	)


def update_simulation(
	db: Session,
	simulation_id: int,
	name: str | None = None,
	parameters: dict | None = None,
	result: dict | None = None,
) -> Simulation | None:
	simulation = get_simulation_by_id(db, simulation_id)
	if not simulation:
		return None

	if name is not None:
		simulation.name = name
	if parameters is not None:
		simulation.parameters = parameters
	if result is not None:
		simulation.result = result

	db.commit()
	db.refresh(simulation)
	return simulation


def delete_simulation(db: Session, simulation_id: int) -> bool:
	simulation = get_simulation_by_id(db, simulation_id)
	if not simulation:
		return False

	db.delete(simulation)
	db.commit()
	return True
