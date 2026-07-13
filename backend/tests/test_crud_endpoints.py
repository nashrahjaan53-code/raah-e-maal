import os

from fastapi.testclient import TestClient

# Ensure test-safe settings are loaded before app imports.
os.environ.setdefault("DATABASE_URL", "sqlite:///./test_launch.db")
os.environ.setdefault("SECRET_KEY", "test-secret-key")
os.environ.setdefault("ALGORITHM", "HS256")
os.environ.setdefault("ACCESS_TOKEN_EXPIRE_MINUTES", "30")
os.environ.setdefault("ADMIN_USERNAMES", "admin")
os.environ.setdefault("RATE_LIMIT_REQUESTS", "10000")  # Disable rate limiting for tests
os.environ.setdefault("RATE_LIMIT_WINDOW_SECONDS", "60")

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


def _new_client() -> TestClient:
    clear_rate_limit_store()  # Clear rate limiter before each test
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    return TestClient(app)


def test_user_crud_with_owner_and_admin_access_controls():
    client = _new_client()

    alice_login = _register_and_login(client, "alice")
    bob_login = _register_and_login(client, "bob")
    admin_login = _register_and_login(client, "admin")

    alice_id = alice_login["user_id"]

    me_response = client.get(
        f"/api/users/{alice_id}",
        headers=_auth_header(alice_login["access_token"]),
    )
    assert me_response.status_code == 200
    assert me_response.json()["username"] == "alice"

    forbidden_response = client.get(
        f"/api/users/{alice_id}",
        headers=_auth_header(bob_login["access_token"]),
    )
    assert forbidden_response.status_code == 403

    update_response = client.patch(
        f"/api/users/{alice_id}",
        json={"username": "alice_updated", "password": "newpass123"},
        headers=_auth_header(alice_login["access_token"]),
    )
    assert update_response.status_code == 200
    assert update_response.json()["username"] == "alice_updated"

    relogin_response = client.post(
        "/api/users/login",
        json={"username": "alice_updated", "password": "newpass123"},
    )
    assert relogin_response.status_code == 200

    delete_response = client.delete(
        f"/api/users/{alice_id}",
        headers=_auth_header(admin_login["access_token"]),
    )
    assert delete_response.status_code == 200

    not_found_response = client.get(
        f"/api/users/{alice_id}",
        headers=_auth_header(admin_login["access_token"]),
    )
    assert not_found_response.status_code == 404


def test_loan_crud_with_read_by_id_and_access_control():
    client = _new_client()

    alice_login = _register_and_login(client, "alice")
    bob_login = _register_and_login(client, "bob")
    alice_id = alice_login["user_id"]

    # Create financial profile first (required for loan application with risk assessment)
    profile_response = client.post(
        "/api/financial-profile/",
        json={
            "user_id": alice_id,
            "income": 75000,
            "expenses": 25000,
            "savings": 5000,
            "credit_score": 720,
        },
        headers=_auth_header(alice_login["access_token"]),
    )
    assert profile_response.status_code == 201

    create_response = client.post(
        "/api/loans/",
        json={
            "user_id": alice_id,
            "loan_name": "Bike Loan",
            "amount": 150000,
            "tenure_months": 36,
            "interest_rate": 10.5,
        },
        headers=_auth_header(alice_login["access_token"]),
    )
    assert create_response.status_code == 201
    loan_id = create_response.json()["id"]

    get_response = client.get(
        f"/api/loans/{loan_id}",
        headers=_auth_header(alice_login["access_token"]),
    )
    assert get_response.status_code == 200
    assert get_response.json()["loan_name"] == "Bike Loan"

    forbidden_response = client.get(
        f"/api/loans/{loan_id}",
        headers=_auth_header(bob_login["access_token"]),
    )
    assert forbidden_response.status_code == 403

    update_response = client.patch(
        f"/api/loans/{loan_id}",
        json={"emi": 4200, "loan_name": "Bike Loan Updated"},
        headers=_auth_header(alice_login["access_token"]),
    )
    assert update_response.status_code == 200
    assert update_response.json()["emi"] == 4200
    assert update_response.json()["loan_name"] == "Bike Loan Updated"

    delete_response = client.delete(
        f"/api/loans/{loan_id}",
        headers=_auth_header(alice_login["access_token"]),
    )
    assert delete_response.status_code == 200

    missing_response = client.get(
        f"/api/loans/{loan_id}",
        headers=_auth_header(alice_login["access_token"]),
    )
    assert missing_response.status_code == 404


def test_financial_profile_crud_with_admin_list():
    client = _new_client()

    alice_login = _register_and_login(client, "alice")
    bob_login = _register_and_login(client, "bob")
    admin_login = _register_and_login(client, "admin")
    alice_id = alice_login["user_id"]

    create_response = client.post(
        "/api/financial-profile/",
        json={
            "user_id": alice_id,
            "income": 90000,
            "expenses": 32000,
            "savings": 15000,
            "credit_score": 770,
        },
        headers=_auth_header(alice_login["access_token"]),
    )
    assert create_response.status_code == 201

    query_get_response = client.get(
        f"/api/financial-profile/?user_id={alice_id}",
        headers=_auth_header(alice_login["access_token"]),
    )
    assert query_get_response.status_code == 200

    path_get_response = client.get(
        f"/api/financial-profile/{alice_id}",
        headers=_auth_header(alice_login["access_token"]),
    )
    assert path_get_response.status_code == 200
    assert path_get_response.json()["credit_score"] == 770

    forbidden_response = client.get(
        f"/api/financial-profile/{alice_id}",
        headers=_auth_header(bob_login["access_token"]),
    )
    assert forbidden_response.status_code == 403

    admin_list_response = client.get(
        "/api/financial-profile/admin/all",
        headers=_auth_header(admin_login["access_token"]),
    )
    assert admin_list_response.status_code == 200
    assert any(item["user_id"] == alice_id for item in admin_list_response.json())

    delete_response = client.delete(
        f"/api/financial-profile/{alice_id}",
        headers=_auth_header(alice_login["access_token"]),
    )
    assert delete_response.status_code == 200

    missing_response = client.get(
        f"/api/financial-profile/{alice_id}",
        headers=_auth_header(alice_login["access_token"]),
    )
    assert missing_response.status_code == 404
