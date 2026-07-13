# LoanPilot - Loan Management System

A full-stack loan management and financial intelligence platform with user authentication, loan tracking, financial profiling, and AI-powered recommendations.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Production Deployment](#production-deployment)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### User Management
- User registration and authentication (JWT tokens)
- Secure password hashing with bcrypt
- Role-based access control
- Session management

### Loan Management
- Create and track multiple loans
- Automatic EMI (Equated Monthly Installment) calculation
- Interest rate computation
- Loan status tracking
- Risk assessment scoring

### Financial Profiling
- Income and expense tracking
- Savings management
- Credit score monitoring
- Financial health dashboard

### Intelligence & Recommendations
- AI-powered loan recommendations
- Financial scenario simulations
- Risk modeling
- Personalized insights

### Security Features
- CORS configuration for cross-origin requests
- Rate limiting (100 requests/minute per IP)
- Security headers (HSTS, CSP, X-Frame-Options)
- Input validation and sanitization
- Comprehensive error handling

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI 0.104.1
- **Database**: PostgreSQL 15+
- **ORM**: SQLAlchemy 2.0
- **Authentication**: JWT (python-jose)
- **Password Hashing**: bcrypt
- **Server**: Uvicorn
- **Testing**: pytest

### Frontend
- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.3.1
- **Styling**: Tailwind CSS 4.2.1
- **State Management**: React Context
- **HTTP Client**: Fetch API
- **Animation**: Framer Motion

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Reverse Proxy**: Nginx
- **CI/CD**: GitHub Actions

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Python 3.13+
- PostgreSQL 15+
- Docker & Docker Compose (optional)

### Local Development

#### 1. Clone Repository
```bash
git clone https://github.com/nashrahjaan53-code/loanpilot.git
cd loanpilot
```

#### 2. Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Run database migrations
alembic upgrade head

# Start server
uvicorn app.main:app --reload
```

Backend runs on: http://localhost:8000

#### 3. Frontend Setup
```bash
cd ../front-end

# Install dependencies
npm install

# Create .env.local
echo "VITE_API_BASE_URL=http://localhost:8000" > .env.local

# Start development server
npm run dev
```

Frontend runs on: http://localhost:5173

#### 4. Access Application
- **Frontend**: http://localhost:5173
- **Backend API Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Docker Development
```bash
# Start all services
docker-compose up

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📦 Production Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for comprehensive production deployment guide.

### Quick Production Setup
```bash
# 1. Setup environment
export ENVIRONMENT=production
export SECRET_KEY=$(openssl rand -hex 32)
export DB_PASSWORD=$(openssl rand -hex 16)

# 2. Build images
docker-compose build

# 3. Start services
docker-compose up -d

# 4. Initialize database
docker-compose exec backend alembic upgrade head

# 5. Verify deployment
curl https://yourdomain.com/api/health/live
```

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```bash
POST /api/users/register
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "securepassword123"
}

Response: 201 Created
{
  "id": 1,
  "username": "user@example.com"
}
```

#### Login
```bash
POST /api/users/login
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "securepassword123"
}

Response: 200 OK
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer",
  "user_id": 1,
  "username": "user@example.com"
}
```

### Loan Endpoints

#### Create Loan
```bash
POST /api/loans/
Authorization: Bearer {token}
Content-Type: application/json

{
  "user_id": 1,
  "loan_name": "Home Loan",
  "amount": 500000,
  "interest_rate": 8.5,
  "tenure_months": 180
}

Response: 201 Created
{
  "id": 1,
  "emi": 6156.96,
  "risk_score": 35.2,
  "status": "pending"
}
```

#### Get Loans
```bash
GET /api/loans/?user_id=1
Authorization: Bearer {token}

Response: 200 OK
[
  {
    "id": 1,
    "loan_name": "Home Loan",
    "amount": 500000,
    "emi": 6156.96,
    ...
  }
]
```

#### Get Loan Summary
```bash
GET /api/loan-summary/?user_id=1
Authorization: Bearer {token}

Response: 200 OK
{
  "total_loans": 1,
  "total_emi": 6156.96,
  "emi_income_ratio": 6.16,
  "total_approved_amount": 500000
}
```

Visit http://localhost:8000/docs for interactive API documentation.

## 📁 Project Structure

```
loanpilot/
├── backend/
│   ├── app/
│   │   ├── api/              # Route handlers
│   │   ├── models/           # SQLAlchemy ORM models
│   │   ├── schemas/          # Pydantic request/response schemas
│   │   ├── services/         # Business logic services
│   │   ├── database/         # Database configuration
│   │   ├── intelligence/     # AI/ML features
│   │   └── main.py           # FastAPI app initialization
│   ├── tests/                # Test suite
│   ├── requirements.txt      # Python dependencies
│   ├── Dockerfile            # Backend container
│   └── alembic/              # Database migrations
│
├── front-end/
│   ├── src/
│   │   ├── Components/       # Reusable React components
│   │   ├── Pages/            # Page components
│   │   ├── services/         # API client services
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # React entry point
│   ├── public/               # Static assets
│   ├── package.json          # Node dependencies
│   ├── Dockerfile            # Frontend container
│   └── vite.config.js        # Vite configuration
│
├── docker-compose.yml        # Multi-container orchestration
├── nginx.conf                # Nginx reverse proxy configuration
├── .env.example              # Environment template
├── DEPLOYMENT.md             # Production deployment guide
└── README.md                 # This file
```

## 🧪 Testing

### Backend Tests
```bash
cd backend

# Run all tests
pytest tests/ -v

# Run with coverage
pytest tests/ --cov=app --cov-report=html

# Run specific test
pytest tests/test_api.py::TestAuthentication::test_register_user -v
```

### Frontend Tests
```bash
cd front-end

# Run tests (if configured)
npm test

# Run with coverage
npm test -- --coverage
```

## 🔒 Security Considerations

- ✅ JWT-based authentication with secure token generation
- ✅ Password hashing with bcrypt (salt rounds: 12)
- ✅ Rate limiting (100 req/min per IP)
- ✅ CORS configuration for allowed origins only
- ✅ Security headers (HSTS, CSP, X-Frame-Options)
- ✅ SQL injection prevention via ORM
- ✅ Input validation via Pydantic schemas
- ✅ HTTPS/TLS enforced in production
- ✅ Environment variables for sensitive data
- ✅ Comprehensive error handling without info leakage

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check logs
docker-compose logs backend

# Verify database connection
docker-compose exec backend python -c "from app.database.database import SessionLocal; SessionLocal()"

# Check migrations
docker-compose exec backend alembic current
```

### Frontend API errors
- Check `VITE_API_BASE_URL` in `.env.local`
- Verify backend is running on port 8000
- Check CORS settings in backend config
- Open browser console (F12) to see actual error

### Database issues
```bash
# Connect to database
docker-compose exec postgres psql -U loanpilot loanpilot_db

# Check tables
\dt

# Reset database (⚠️ will delete all data)
docker-compose exec postgres dropdb -U loanpilot loanpilot_db
docker-compose exec backend alembic upgrade head
```

## 📖 Documentation

- **API Documentation**: http://localhost:8000/docs (Swagger UI)
- **API ReDoc**: http://localhost:8000/redoc
- **Deployment Guide**: [DEPLOYMENT.md](DEPLOYMENT.md)
- **Architecture**: See project structure above

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'feat: Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👥 Team

- **Backend Developer**: Person 1
- **Frontend Developer**: Person 2
- **Project Lead**: Team Lead

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Contact team leads
- Check existing documentation

---

**Happy loaning! 🚀**
