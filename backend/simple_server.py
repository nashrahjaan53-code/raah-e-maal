from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

# Simple test server
app = FastAPI(
    title="Loan Management System API",
    description="Simple Test Server",
    version="1.0.0",
)

# CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simple test endpoints
@app.get("/")
async def root():
    return {
        "message": "Loan Management System API",
        "status": "running",
        "timestamp": datetime.now()
    }

@app.get("/api/loans/admin/all")
async def get_loans():
    return [
        {
            "id": 1,
            "user_id": 1,
            "loan_name": "Home Loan",
            "amount": 1800000.0,
            "emi": 15000.0,
            "interest_rate": 8.5,
            "status": "approved",
            "approved_by": None
        },
        {
            "id": 2,
            "user_id": 1,
            "loan_name": "Car Loan",
            "amount": 500000.0,
            "emi": 8000.0,
            "interest_rate": 9.0,
            "status": "pending",
            "approved_by": None
        },
        {
            "id": 3,
            "user_id": 1,
            "loan_name": "Personal Loan",
            "amount": 200000.0,
            "emi": 5000.0,
            "interest_rate": 12.0,
            "status": "approved",
            "approved_by": None
        }
    ]

@app.get("/api/users")
async def get_users():
    return [
        {
            "id": 1,
            "username": "demo_user"
        }
    ]

@app.post("/api/users/login")
async def login(credentials: dict):
    return {
        "access_token": "test-token",
        "token_type": "bearer",
        "user_id": 1,
        "username": credentials.get("username", "demo_user")
    }

@app.post("/api/users/register")
async def register(userData: dict):
    return {"message": "User registered successfully"}

@app.get("/api/users/verify-token")
async def verify_token():
    return {
        "valid": True,
        "user_id": 1,
        "username": "demo_user"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
