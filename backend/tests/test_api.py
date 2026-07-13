import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

class TestAuthentication:
    """Test user authentication"""
    
    def test_register_user(self):
        response = client.post(
            "/api/users/register",
            json={"username": "testuser", "password": "testpass123"}
        )
        assert response.status_code == 201
        assert response.json()["username"] == "testuser"
        assert "id" in response.json()
    
    def test_register_duplicate_user(self):
        # Register first user
        client.post(
            "/api/users/register",
            json={"username": "duplicate", "password": "pass123"}
        )
        # Try to register same username
        response = client.post(
            "/api/users/register",
            json={"username": "duplicate", "password": "pass123"}
        )
        assert response.status_code in [400, 409]  # Conflict or Bad Request
    
    def test_login_user(self):
        # Register user first
        username = "logintest"
        password = "securepass123"
        client.post(
            "/api/users/register",
            json={"username": username, "password": password}
        )
        # Login
        response = client.post(
            "/api/users/login",
            json={"username": username, "password": password}
        )
        assert response.status_code == 200
        assert "access_token" in response.json()
        assert response.json()["token_type"] == "bearer"
    
    def test_login_wrong_password(self):
        username = "wrongpass"
        client.post(
            "/api/users/register",
            json={"username": username, "password": "correctpass"}
        )
        response = client.post(
            "/api/users/login",
            json={"username": username, "password": "wrongpass"}
        )
        assert response.status_code in [400, 401]
    
    def test_login_nonexistent_user(self):
        response = client.post(
            "/api/users/login",
            json={"username": "nonexistent", "password": "pass123"}
        )
        assert response.status_code in [400, 401, 404]


class TestHealthCheck:
    """Test health check endpoints"""
    
    def test_root_endpoint(self):
        response = client.get("/")
        assert response.status_code == 200
        assert response.json()["status"] == "running"
    
    def test_health_live_endpoint(self):
        response = client.get("/health/live")
        assert response.status_code == 200
        assert response.json()["status"] == "alive"


class TestRateLimiting:
    """Test rate limiting"""
    
    def test_rate_limit_exceeded(self):
        from app.connection.config import settings
        from app.main import clear_rate_limit_store
        
        old_limit = settings.RATE_LIMIT_REQUESTS
        settings.RATE_LIMIT_REQUESTS = 5
        clear_rate_limit_store()
        
        try:
            endpoint = "/api/users/login"
            responses = []
            for i in range(15):
                response = client.post(
                    endpoint,
                    json={"username": f"user{i}", "password": "pass"}
                )
                responses.append(response.status_code)
            
            assert 429 in responses
        finally:
            settings.RATE_LIMIT_REQUESTS = old_limit
            clear_rate_limit_store()


class TestSecurityHeaders:
    """Test security headers"""
    
    def test_security_headers_present(self):
        response = client.get("/")
        
        # Check for security headers
        assert "x-content-type-options" in response.headers
        assert response.headers["x-content-type-options"] == "nosniff"
        
        assert "x-frame-options" in response.headers
        assert response.headers["x-frame-options"] == "DENY"
        
        assert "x-xss-protection" in response.headers


class TestErrorHandling:
    """Test error handling"""
    
    def test_404_not_found(self):
        response = client.get("/api/nonexistent-endpoint")
        assert response.status_code == 404
    
    def test_invalid_request_body(self):
        response = client.post(
            "/api/users/register",
            json={"invalid": "field"}  # Missing required fields
        )
        assert response.status_code in [400, 422]
        assert "detail" in response.json()


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
