import logging
import time
import uuid
from collections import defaultdict, deque
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timezone
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from sqlalchemy import text

from app.api import (
    financial_profile_routes,
    loan_routes,
    loan_summary_routes,
    recommendation_routes,
    simulation_routes,
    user_routes,
    chatbot_routes,
    intelligence_routes,
)
from app.connection.config import settings
from app.database.database import SessionLocal, engine, Base
from app.models import user_model, loan_model, financial_profile, recommendation_model, simulation_model

Base.metadata.create_all(bind=engine)


def configure_logging() -> None:
    logging.basicConfig(
        level=getattr(logging, settings.LOG_LEVEL.upper(), logging.INFO),
        format="%(asctime)s %(levelname)s %(name)s %(message)s",
    )


configure_logging()
logger = logging.getLogger("loanpilot.api")

rate_store: dict[str, deque[float]] = defaultdict(deque)

app = FastAPI(
    title="Loan Management System API",
    description="Person 1: API & Authentication Module",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Function to clear rate limiter (used for testing)
def clear_rate_limit_store():
    """Clear the rate limit store. Used for testing."""
    rate_store.clear()

# CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def request_context_middleware(request: Request, call_next):
    request_id = request.headers.get("X-Request-ID") or str(uuid.uuid4())
    request.state.request_id = request_id
    response = await call_next(request)
    response.headers["X-Request-ID"] = request_id
    return response


@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    limit = max(1, settings.RATE_LIMIT_REQUESTS)
    window = max(1, settings.RATE_LIMIT_WINDOW_SECONDS)

    client_host = request.client.host if request.client else "unknown"
    key = f"{client_host}:{request.url.path}"
    now = time.monotonic()

    history = rate_store[key]
    while history and now - history[0] > window:
        history.popleft()

    if len(history) >= limit:
        request_id = getattr(request.state, "request_id", str(uuid.uuid4()))
        return JSONResponse(
            status_code=429,
            content={
                "detail": "Rate limit exceeded",
                "request_id": request_id,
            },
            headers={"Retry-After": str(window)},
        )

    history.append(now)
    return await call_next(request)


@app.middleware("http")
async def security_headers_middleware(request: Request, call_next):
    response = await call_next(request)
    # Security headers
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["Content-Security-Policy"] = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "geolocation=(), microphone=(), camera=()"
    return response


@app.middleware("http")
async def access_log_middleware(request: Request, call_next):
    started = time.perf_counter()
    response = await call_next(request)
    duration_ms = round((time.perf_counter() - started) * 1000, 2)

    request_id = getattr(request.state, "request_id", "n/a")
    client_host = request.client.host if request.client else "unknown"
    logger.info(
        "request_completed request_id=%s method=%s path=%s status=%s duration_ms=%s client_ip=%s",
        request_id,
        request.method,
        request.url.path,
        response.status_code,
        duration_ms,
        client_host,
    )
    return response


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    request_id = getattr(request.state, "request_id", str(uuid.uuid4()))
    logger.exception(
        "unhandled_exception request_id=%s path=%s error=%s",
        request_id,
        request.url.path,
        str(exc),
    )
    return JSONResponse(
        status_code=500,
        content={
            "detail": "Internal server error",
            "request_id": request_id,
        },
    )


# Include routers
app.include_router(loan_routes.router, prefix="/api")
app.include_router(user_routes.router, prefix="/api")
app.include_router(financial_profile_routes.router, prefix="/api")
app.include_router(loan_summary_routes.router, prefix="/api")
app.include_router(recommendation_routes.router, prefix="/api")
app.include_router(simulation_routes.router, prefix="/api")
app.include_router(chatbot_routes.router, prefix="/api/chatbot")
app.include_router(intelligence_routes.router, prefix="/api")

@app.get("/")
async def root():
    return {
        "message": "Loan Management System API",
        "status": "running",
        "timestamp": datetime.now(timezone.utc)
    }


@app.get("/health/live")
async def health_live():
    return {"status": "alive", "timestamp": datetime.now(timezone.utc)}


@app.get("/health/ready")
async def health_ready():
    db = SessionLocal()
    try:
        db.execute(text("SELECT 1"))
        return {"status": "ready", "database": "ok", "timestamp": datetime.now(timezone.utc)}
    except Exception:
        logger.exception("readiness_check_failed")
        return JSONResponse(
            status_code=503,
            content={"status": "not_ready", "database": "error"},
        )
    finally:
        db.close()
