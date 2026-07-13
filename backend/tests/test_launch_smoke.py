import os
from pathlib import Path

# Ensure test-safe settings are loaded before app imports.
os.environ.setdefault("DATABASE_URL", "sqlite:///./test_launch.db")
os.environ.setdefault("SECRET_KEY", "test-secret-key")
os.environ.setdefault("ALGORITHM", "HS256")
os.environ.setdefault("ACCESS_TOKEN_EXPIRE_MINUTES", "30")
os.environ.setdefault("ADMIN_USERNAMES", "admin")
os.environ.setdefault("RATE_LIMIT_REQUESTS", "10000")  # Disable rate limiting for tests
os.environ.setdefault("RATE_LIMIT_WINDOW_SECONDS", "60")

from fastapi.testclient import TestClient

from app.database.database import Base, engine
from app.main import app, clear_rate_limit_store


def _auth_header(token: str) -> dict[str, str]:
    return {"Authorization": f"Bearer {token}"}


def _register_and_login(client: TestClient, username: str, password: str = "pass123") -> dict:
    register_response = client.post(
        "/api/users/register",
        json={"username": username, "password": password},
    )
    assert register_response.status_code == 201

    login_response = client.post(
        "/api/users/login",
        json={"username": username, "password": password},
    )
    assert login_response.status_code == 200
    return login_response.json()


def test_launch_smoke_auth_and_access_control():
    db_path = Path("test_launch.db")

    # Start each run from a clean schema.
    clear_rate_limit_store()  # Clear rate limiter before test
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    client = TestClient(app)

    alice_login = _register_and_login(client, "alice")
    bob_login = _register_and_login(client, "bob")
    admin_login = _register_and_login(client, "admin")

    alice_user_id = alice_login["user_id"]

    profile_response = client.post(
        "/api/financial-profile/",
        json={
            "user_id": alice_user_id,
            "income": 90000,
            "expenses": 30000,
            "savings": 10000,
            "credit_score": 760,
        },
        headers=_auth_header(alice_login["access_token"]),
    )
    assert profile_response.status_code == 201

    loan_response = client.post(
        "/api/loans/",
        json={
            "user_id": alice_user_id,
            "loan_name": "Car Loan",
            "amount": 500000,
            "tenure_months": 48,
            "interest_rate": 9.5,
        },
        headers=_auth_header(alice_login["access_token"]),
    )
    assert loan_response.status_code == 201

    forbidden_loans = client.get(
        f"/api/loans/?user_id={alice_user_id}",
        headers=_auth_header(bob_login["access_token"]),
    )
    assert forbidden_loans.status_code == 403

    forbidden_sim = client.post(
        "/api/simulation/run",
        json={"user_id": alice_user_id},
        headers=_auth_header(bob_login["access_token"]),
    )
    assert forbidden_sim.status_code == 403

    admin_all_loans = client.get(
        "/api/loans/admin/all",
        headers=_auth_header(admin_login["access_token"]),
    )
    assert admin_all_loans.status_code == 200
    assert len(admin_all_loans.json()) >= 1

    # Clean up test database file created by SQLite URL.
    engine.dispose()
    if db_path.exists():
        db_path.unlink()
