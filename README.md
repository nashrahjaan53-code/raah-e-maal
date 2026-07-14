<div align="center">

# Raah-e-Maal
### راہِ مال — کٲشُر فائنانْس

**Financial planning built for the way Jammu & Kashmir actually earns.**

![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-D71F00?style=for-the-badge&logo=python&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>

---

## The Problem

An apple grower in Shopian earns most of his income across a few autumn weeks. A houseboat owner on Dal Lake earns on a tourist season. A saffron cultivator earns on a harvest and a price that moves with it.

Their EMIs are still due every month. Winter costs still arrive every year. Every financial app on their phone still assumes a fixed monthly salary.

**That mismatch not lack of income, but lack of a plan that understands seasonal income — is what pushes financially capable people into missed payments and predatory borrowing.**

## The Solution

**Raah-e-Maal** is a financial planning platform built around seasonal cash flow instead of a monthly salary. It takes a user's district, livelihood, and income pattern, and turns it into:

- a 12-month cash-flow view instead of a monthly snapshot
- a reserve plan that moves peak-season surplus into lean-season coverage
- a winter preparedness fund sized to real heating, food, and transport costs
- a risk score that explains *why*, not just a number
- access to relevant government schemes filtered by livelihood and district
- all of it in English, Urdu, and Kashmiri — online or offline

---

## Why This Wins

| | |
|---|---|
| **Real, underserved problem** | Not a generic budgeting app built for a specific economic reality that mainstream fintech ignores |
| **Depth over breadth** | Every feature (KCC integration, winter fund, scheme recommender) maps to a real J&K livelihood, not a checklist |
| **Genuinely localized** | Trilingual UI (EN/UR/KS), district-aware risk modeling, offline mode for NH-44 connectivity gaps not translation as an afterthought |
| **Scalable model** | The seasonal-income architecture generalizes to any region with agricultural, tourism, or gig-based economies J&K is the proof of concept |
| **Shippable** | Full-stack, working end to end: FastAPI + SQLite backend, React/Vite frontend, live simulator, persistent user profiles |

---

## Features

###  Community-First Landing Page
Hero section built around KCC loans, winter reserves, and harvest cycles, with seven localized community cards:

1. **Apple & Horticulture** — autumn harvest income spikes
2. **Saffron Cultivators** — co-op subsidies and price volatility
3. **Artisans & Loom Weavers** — pashmina/carpet material cost buffers
4. **Houseboats & Shikaras** — Dal Lake tourism seasonality
5. **Tourism & Gulmarg Operators** — snow-season peak earnings
6. **Local Shopkeepers** — interest subvention access
7. **Himayat Students** — vocational scholarship discovery

###  Interactive Loan Simulator
A sandbox for custom interest rate, term, and payment frequency, visualized against a dynamic seasonal cash-flow chart — so users stress-test a loan before signing, not after.

###  Seasonal Planning Suite
- **Apple & Saffron Seasonal Payoff Planner** — EMI rescheduling around harvest income
- **Winter Preparedness Fund Calculator** — target reserve for heating, food, and transport during highway blockages
- **AI Financial Risk Predictor** — explainable cash-flow risk score with a diagnostics briefing
- **Government Scheme Recommender** — filters relevant schemes by district and livelihood, with required documents and next steps

###  Trilingual, Offline-Capable
Full English / Urdu / Kashmiri (کٲشُر) toggle across labels, advisors, and notifications. Offline mode persists profiles and loan data locally, so the app stays usable through winter connectivity cutouts.

###  Onboarding That Feeds the Model
District, livelihood, dependents, and primary goal aren't just profile fields — they directly parameterize risk and planning outputs (e.g. Kupwara/Shopian districts weight winter risk higher; horticulture livelihoods trigger autumn spike modeling).

---

## Tech Stack

**Backend** — `/backend`
- FastAPI (async REST API)
- SQLAlchemy ORM + SQLite (`loanpilot.db`)
- Pydantic request/response schemas
- `intelligence/` — risk scoring and seasonal repayment optimization modules

**Frontend** — `/front-end`
- React (Vite)
- Tailwind CSS v4
- Framer Motion
- Client-side routing: `/`, `/tracker`, `/auth`, `/dashboard`

## Architecture

```
raah-e-maal/
├── backend/
│   └── app/
│       ├── main.py            # CORS, exception handlers, router registration
│       ├── api/                # Auth, profile, loan, repayment-strategy routers
│       ├── models/             # SQLAlchemy models
│       ├── schemas/             # Pydantic schemas
│       ├── database/           # SQLite connection config
│       └── intelligence/       # Risk scoring & seasonal repayment logic
│
└── front-end/
    └── src/
        ├── App.jsx              # Routing
        ├── Components/          # Navbar, Hero, Features, shared UI
        ├── Dashboards/          # User.jsx, Admin.jsx
        ├── Pages/                # Tracker.jsx, Auth.jsx
        └── services/             # API clients for backend endpoints
```

---

## Getting Started

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
Runs at `http://localhost:8000`.

### Frontend
```bash
cd front-end
npm install
npm run dev
```
Runs at `http://localhost:5173`.

---

## Roadmap

- [ ] Migrate scheme database from seed data to a maintained, verified dataset
- [ ] Add voice-based AI Guide queries in Kashmiri for low-literacy users
- [ ] Partner with local cooperative banks for real KCC data integration
- [ ] Expand community templates to other seasonal economies (Himachal orchards, Northeast tea gardens)

---

## Disclaimer

Government scheme information surfaced by the Recommender helps users **discover** potentially relevant programmes it is not a guarantee of eligibility. Users should verify details with the relevant issuing department before applying.

---

## Team

Built for Solution Synthesis a financially inclusive, locally grounded fintech platform for Jammu & Kashmir.

---

<div align="center">

*راہِ مال — the path of wealth, built for the way Kashmir actually earns.*

</div>