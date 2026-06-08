# 🔌 Documentation du Backend - EkoFutura

Ce document décrit la structure et l'architecture du backend EkoFutura.

## Table des matières

- [Vue d'ensemble](#vue-densemble)
- [Architecture](#architecture)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Structure du Projet](#structure-du-projet)
- [API Endpoints](#api-endpoints)
- [Base de Données](#base-de-données)
- [Authentification](#authentification)
- [Testing](#testing)
- [Déploiement](#déploiement)

---

## 🎯 Vue d'ensemble

Le backend EkoFutura est une API REST construite avec :
- **Framework** : FastAPI (asynchrone, haute performance)
- **Base de données** : PostgreSQL
- **ORM** : SQLAlchemy
- **Authentification** : JWT (JSON Web Tokens)
- **Validation** : Pydantic

### Objectives

- Fournir une API robuste et sécurisée
- Gérer les signalements environnementaux
- Maintenir une base de données d'incidents
- Fournir des analytics et rapports
- Supporter plusieurs clients (web, mobile)

---

## 🏗 Architecture

```
Backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # Point d'entrée
│   ├── config.py            # Configuration
│   ├── database.py          # Configuration BDD
│   ├── security.py          # Authentification & sécurité
│   ├── models/              # Modèles SQLAlchemy
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── incident.py
│   │   └── report.py
│   ├── schemas/             # Schémas Pydantic (DTO)
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── incident.py
│   │   └── report.py
│   ├── routes/              # Endpoints API
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── users.py
│   │   ├── incidents.py
│   │   └── reports.py
│   ├── services/            # Logique métier
│   │   ├── __init__.py
│   │   ├── incident_service.py
│   │   └── user_service.py
│   └── utils/
│       ├── __init__.py
│       └── helpers.py
├── tests/                   # Tests unitaires
│   ├── test_auth.py
│   ├── test_incidents.py
│   └── test_users.py
├── requirements.txt         # Dépendances Python
├── .env.example            # Exemple de variables
├── Dockerfile              # Containerisation
└── README.md              # Ce fichier
```

---

## 📋 Prérequis

- **Python** 3.9 ou plus
- **PostgreSQL** 12 ou plus
- **pip** ou **poetry**
- **Git**

---

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone https://github.com/Momad-eden/ekofutura.git
cd ekofutura/backend
```

### 2. Créer un environnement virtuel

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

### 3. Installer les dépendances

```bash
pip install -r requirements.txt
```

### 4. Configurer les variables d'environnement

```bash
cp .env.example .env
# Éditer .env avec vos paramètres
```

### 5. Initialiser la base de données

```bash
alembic upgrade head
```

### 6. Lancer le serveur

```bash
uvicorn app.main:app --reload
```

L'API sera accessible à `http://localhost:8000`

---

## ⚙️ Configuration

### Variables d'Environnement (.env)

```env
# Application
APP_NAME=EkoFutura API
DEBUG=True
ENVIRONMENT=development

# Base de données
DATABASE_URL=postgresql://user:password@localhost/ekofutura
DATABASE_POOL_SIZE=20
DATABASE_MAX_OVERFLOW=10

# Sécurité
SECRET_KEY=your-secret-key-here-at-least-32-chars
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Logging
LOG_LEVEL=INFO

# Services externes (optionnel)
MAPBOX_ACCESS_TOKEN=pk_...
SLACK_WEBHOOK_URL=https://hooks.slack.com/...

# Email (pour notifications)
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-password
```

---

## 📁 Structure du Projet

### Models (app/models/)

```python
# user.py
from sqlalchemy import Column, String, DateTime
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"
    
    id: int
    email: str
    username: str
    hashed_password: str
    is_active: bool
    created_at: datetime
    
    incidents = relationship("Incident", back_populates="reporter")
```

### Schemas (app/schemas/)

```python
# incident.py
from pydantic import BaseModel, Field
from typing import Optional

class IncidentCreate(BaseModel):
    title: str
    description: str
    category: str  # pollution, déchets, etc.
    latitude: float
    longitude: float
    severity: str  # low, medium, high

class IncidentResponse(IncidentCreate):
    id: int
    reporter_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True
```

### Routes (app/routes/)

```python
# incidents.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.security import get_current_user

router = APIRouter(prefix="/incidents", tags=["incidents"])

@router.get("/")
async def list_incidents(
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    """Lister tous les signalements"""
    incidents = db.query(Incident).offset(skip).limit(limit).all()
    return incidents

@router.post("/")
async def create_incident(
    incident: IncidentCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Créer un nouveau signalement"""
    db_incident = Incident(**incident.dict(), reporter_id=current_user.id)
    db.add(db_incident)
    db.commit()
    return db_incident
```

---

## 🔌 API Endpoints

### Authentification

```
POST   /api/auth/register      - Créer un compte
POST   /api/auth/login         - Se connecter
POST   /api/auth/refresh       - Rafraîchir le token
POST   /api/auth/logout        - Se déconnecter
```

### Utilisateurs

```
GET    /api/users/me           - Profil utilisateur courant
GET    /api/users/{id}         - Récupérer un utilisateur
PUT    /api/users/me           - Mettre à jour le profil
DELETE /api/users/me           - Supprimer le compte
```

### Signalements (Incidents)

```
GET    /api/incidents          - Lister tous les signalements
GET    /api/incidents/{id}     - Récupérer un signalement
POST   /api/incidents          - Créer un signalement
PUT    /api/incidents/{id}     - Mettre à jour
DELETE /api/incidents/{id}     - Supprimer
GET    /api/incidents/search   - Chercher par localisation
```

### Rapports

```
GET    /api/reports            - Obtenir les statistiques
GET    /api/reports/by-category - Rapports par catégorie
GET    /api/reports/heatmap    - Données pour heatmap
```

### Santé de l'API

```
GET    /health                 - Vérifier que l'API fonctionne
GET    /docs                   - Documentation Swagger
GET    /redoc                  - Alternative ReDoc
```

---

## 🗄 Base de Données

### Migrations

Utiliser Alembic pour gérer les migrations :

```bash
# Créer une migration
alembic revision --autogenerate -m "Add column X to table Y"

# Appliquer les migrations
alembic upgrade head

# Revenir en arrière
alembic downgrade -1
```

### Schéma

```sql
-- users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- incidents
CREATE TABLE incidents (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    latitude FLOAT,
    longitude FLOAT,
    severity VARCHAR(20),
    reporter_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT now(),
    resolved_at TIMESTAMP
);

-- reports
CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    incident_id INTEGER REFERENCES incidents(id),
    content TEXT,
    created_at TIMESTAMP DEFAULT now()
);
```

---

## 🔐 Authentification

### JWT Token Flow

```
1. User envoie credentials (email/password)
2. Server valide et retourne access_token + refresh_token
3. Client stocke les tokens
4. Client envoie access_token dans Authorization header
5. Token expire après 30 min
6. Client utilise refresh_token pour obtenir nouveau access_token
```

### Utilisation dans les Routes

```python
from app.security import get_current_user

@router.get("/profile")
async def get_profile(current_user: User = Depends(get_current_user)):
    """Endpoint protégé"""
    return current_user
```

---

## ✅ Testing

### Lancer les tests

```bash
pytest

# Avec couverture
pytest --cov=app

# Mode verbose
pytest -v

# Un test spécifique
pytest tests/test_incidents.py::test_create_incident
```

### Exemple de test

```python
# tests/test_incidents.py
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

@pytest.fixture
def test_incident_data():
    return {
        "title": "Pollution détectée",
        "description": "...",
        "category": "pollution",
        "latitude": 48.8566,
        "longitude": 2.3522,
        "severity": "high"
    }

def test_create_incident(test_incident_data, auth_token):
    response = client.post(
        "/api/incidents",
        json=test_incident_data,
        headers={"Authorization": f"Bearer {auth_token}"}
    )
    assert response.status_code == 201
    assert response.json()["title"] == test_incident_data["title"]
```

---

## 🚀 Déploiement

Voir [docs/DEPLOYMENT.md](../docs/DEPLOYMENT.md) pour les détails complets.

### Déploiement rapide sur Render

```bash
# 1. Pousser le code
git push

# 2. Render détecte automatiquement
# 3. Build & deploy

# 4. Vérifier les logs
# Dashboard → Logs
```

---

## 📚 Ressources Utiles

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [Pydantic Documentation](https://docs.pydantic.dev/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

## 🆘 Troubleshooting

### ModuleNotFoundError

```bash
# Réinstaller les dépendances
pip install -r requirements.txt --force-reinstall
```

### Database Connection Error

```bash
# Vérifier la connexion PostgreSQL
psql -U user -d ekofutura -h localhost

# Vérifier DATABASE_URL
echo $DATABASE_URL
```

### Port déjà utilisé

```bash
# Utiliser un autre port
uvicorn app.main:app --reload --port 8001
```

---

<div align="center">

[Retour au README principal](../README.md) • [Guide de Contribution](./CONTRIBUTING.md) • [Guide de Déploiement](./DEPLOYMENT.md)

</div>
