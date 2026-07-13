# Production Deployment Guide

## Prerequisites
- Docker & Docker Compose installed
- PostgreSQL 15+
- Node.js 20+
- Python 3.13+
- A production domain and SSL certificate

## Environment Setup

### 1. Create Production Environment Files

```bash
cp .env.example .env.production
```

Edit `.env.production` with production values:
```env
# Database
DATABASE_URL=postgresql://user:strong_password@postgres:5432/loanpilot_db

# Security
SECRET_KEY=generate-with-`openssl rand -hex 32`
ENVIRONMENT=production
LOG_LEVEL=INFO

# CORS - Update with your domain
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Frontend
VITE_API_BASE_URL=https://api.yourdomain.com
```

### 2. Generate Secure Secret Key
```bash
openssl rand -hex 32
# Use output as SECRET_KEY
```

## Docker Deployment

### Development
```bash
docker-compose up
```

Access:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/docs
- Database: localhost:5432

### Production

#### 1. Build Images
```bash
docker-compose -f docker-compose.yml build
```

#### 2. Deploy with Environment
```bash
export ENVIRONMENT=production
export SECRET_KEY=$(openssl rand -hex 32)
export DB_PASSWORD=$(openssl rand -hex 16)
export BACKEND_ENV_FILE=.env.production

docker-compose up -d
```

#### 3. Initialize Database
```bash
docker-compose exec backend alembic upgrade head
```

#### 4. Verify Deployment
```bash
# Check services
docker-compose ps

# Check logs
docker-compose logs -f backend
docker-compose logs -f postgres

# Test health checks
curl http://localhost:8000/health/live
```

## Nginx Configuration for SSL

1. Obtain SSL certificate (Let's Encrypt recommended):
```bash
certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com
```

2. Copy certificates to `./ssl/` directory

3. Update `nginx.conf` with your domain

4. Restart Nginx:
```bash
docker-compose restart nginx
```

## Database Backups

### Automated Daily Backup
```bash
# Add to crontab (backup at 2 AM daily)
0 2 * * * docker-compose exec -T postgres pg_dump -U loanpilot loanpilot_db > /backups/$(date +\%Y-\%m-\%d).sql
```

### Manual Backup
```bash
docker-compose exec postgres pg_dump -U loanpilot loanpilot_db > backup.sql
```

### Restore from Backup
```bash
docker-compose exec -T postgres psql -U loanpilot loanpilot_db < backup.sql
```

## Monitoring

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
```

### Check Health
```bash
# Backend health
curl https://yourdomain.com/api/health/live

# Database connection
docker-compose exec backend python -c "from app.database.database import SessionLocal; SessionLocal()" && echo "Database OK"
```

## Scaling

### Increase Backend Replicas
```bash
docker-compose up --scale backend=3
```

### Load Balancing
Configure in nginx.conf:
```nginx
upstream backend {
    server backend:8000;
    server backend_2:8000;
    server backend_3:8000;
}
```

## Security Checklist

- [ ] Changed all default passwords
- [ ] Set strong SECRET_KEY
- [ ] Enable HTTPS/SSL
- [ ] Configured CORS for your domain
- [ ] Set LOG_LEVEL=INFO in production
- [ ] Database backups configured
- [ ] Firewall rules configured (only expose 80, 443)
- [ ] Rate limiting enabled
- [ ] Security headers set in nginx.conf

## Troubleshooting

### Database Connection Failed
```bash
# Check PostgreSQL is healthy
docker-compose exec postgres pg_isready

# Verify DATABASE_URL format
docker-compose logs -f backend | grep DATABASE_URL
```

### Frontend Can't Connect to Backend
- Check CORS_ORIGINS in backend
- Check VITE_API_BASE_URL in frontend
- Verify firewall allows traffic
- Check SSL certificate validity

### Out of Memory
```bash
# Increase Docker memory limit in docker-compose.yml
services:
  backend:
    deploy:
      resources:
        limits:
          memory: 2G
```

## Rollback

```bash
# Stop current deployment
docker-compose down

# Restore previous database
docker-compose up -d postgres
docker-compose exec -T postgres psql -U loanpilot loanpilot_db < backup.sql

# Restart with previous version
git checkout <previous-tag>
docker-compose up -d
```

## Support

For issues, check logs:
```bash
docker-compose logs backend 2>&1 | tail -100
```
