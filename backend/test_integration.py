import json
import pytest

BASE_URL = "http://127.0.0.1:8000"

@pytest.mark.skip(reason="Manual integration script that performs real HTTP requests against a local backend.")
def test_full_flow():
    import requests
    print("=== TESTING FULL INTEGRATION FLOW ===\n")
    
    user = f"testuser{int(__import__('time').time() % 10000)}"
    password = "password123"
    
    print(f"1. REGISTER USER: {user}")
    reg_resp = requests.post(f"{BASE_URL}/api/users/register", json={"username": user, "password": password})
    print(f"Status: {reg_resp.status_code}")
    user_data = reg_resp.json()
    user_id = user_data.get("id")
    print(f"User ID: {user_id}\n")
    
    print(f"2. LOGIN USER")
    login_resp = requests.post(f"{BASE_URL}/api/users/login", json={"username": user, "password": password})
    print(f"Status: {login_resp.status_code}")
    login_data = login_resp.json()
    token = login_data.get("access_token")
    print(f"Token: {token[:50]}...\n")
    
    headers = {"Authorization": f"Bearer {token}"}
    
    print(f"3. CREATE FINANCIAL PROFILE")
    profile_resp = requests.post(
        f"{BASE_URL}/api/financial-profile/",
        headers=headers,
        json={"user_id": user_id, "income": 100000, "expenses": 50000, "savings": 10000, "credit_score": 750}
    )
    print(f"Status: {profile_resp.status_code}")
    print(f"Response: {json.dumps(profile_resp.json(), indent=2)}\n")
    
    print(f"4. CREATE LOAN")
    loan_resp = requests.post(
        f"{BASE_URL}/api/loans/",
        headers=headers,
        json={
            "user_id": user_id,
            "loan_name": "Home Loan",
            "amount": 500000,
            "interest_rate": 8.5,
            "tenure_months": 180
        }
    )
    print(f"Status: {loan_resp.status_code}")
    loan_data = loan_resp.json()
    loan_id = loan_data.get("id")
    print(f"Response: {json.dumps(loan_data, indent=2)}\n")
    
    print(f"5. GET LOANS")
    get_loans_resp = requests.get(f"{BASE_URL}/api/loans/?user_id={user_id}", headers=headers)
    print(f"Status: {get_loans_resp.status_code}")
    print(f"Loans count: {len(get_loans_resp.json())}\n")
    
    print(f"6. GET LOAN SUMMARY")
    summary_resp = requests.get(f"{BASE_URL}/api/loan-summary/?user_id={user_id}", headers=headers)
    print(f"Status: {summary_resp.status_code}")
    print(f"Response: {json.dumps(summary_resp.json(), indent=2)}\n")
    
    print(f"7. RUN SIMULATION")
    sim_resp = requests.post(f"{BASE_URL}/api/simulation/run", headers=headers, json={"user_id": user_id})
    print(f"Status: {sim_resp.status_code}")
    if sim_resp.status_code == 200:
        sim_data = sim_resp.json()
        print(f"Response keys: {list(sim_data.keys())}\n")
    else:
        print(f"Error: {sim_resp.json()}\n")
    
    print(f"8. REQUEST RECOMMENDATIONS")
    rec_resp = requests.post(f"{BASE_URL}/api/recommendations/request", headers=headers, json={"user_id": user_id})
    print(f"Status: {rec_resp.status_code}")
    if rec_resp.status_code == 200:
        rec_data = rec_resp.json()
        print(f"Response keys: {list(rec_data.keys())}\n")
    else:
        print(f"Error: {rec_resp.json()}\n")
    
    print("=== INTEGRATION TEST COMPLETE ===")

if __name__ == "__main__":
    test_full_flow()
