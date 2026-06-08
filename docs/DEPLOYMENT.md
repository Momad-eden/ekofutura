# 🚀 Guide de Déploiement - EkoFutura

Ce guide couvre le déploiement de l'application EkoFutura en production.

## Table des matières

- [Prérequis](#prérequis)
- [Architecture de Déploiement](#architecture-de-déploiement)
- [Déploiement du Frontend](#déploiement-du-frontend)
- [Déploiement du Backend](#déploiement-du-backend)
- [Configuration des Domaines](#configuration-des-domaines)
- [SSL/HTTPS](#ssltls)
- [Variables d'Environnement](#variables-denvironnement)
- [Monitoring](#monitoring)
- [Troubleshooting](#troubleshooting)

---

## 📋 Prérequis

### Outils Requis

- Git
- Docker (recommandé)
- Node.js 18+
- Python 3.9+
- Compte chez un provider de déploiement (Vercel, Render, AWS, etc.)

### Accès Requis

- Accès administrateur au repository GitHub
- Accès aux services de déploiement
- Clés API pour les services externes

---

## 🏗 Architecture de Déploiement

```
┌─────────────────────────────────────┐
│   Frontend (Next.js)                │
│   - Vercel / Netlify / AWS          │
└────────────────┬────────────────────┘
                 │ HTTPS
                 ▼
┌─────────────────────────────────────┐
│   API Gateway / Load Balancer       │
└────────────────┬────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│   Backend (Python)                  │
│   - Render / Heroku / AWS / Docker  │
└────────────────┬────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│   Base de Données                   │
│   - PostgreSQL / MongoDB            │
└─────────────────────────────────────┘
```

---

## 🌐 Déploiement du Frontend

### Option 1 : Vercel (Recommandé pour Next.js)

#### Configuration

1. **Connecter le repository**
   ```
   Allez sur https://vercel.com/new
   → Sélectionnez votre repository GitHub
   → Autorisez Vercel
   ```

2. **Configurer le projet**
   ```
   Framework Preset: Next.js
   Root Directory: frontend
   ```

3. **Ajouter les variables d'environnement**
   ```
   NEXT_PUBLIC_API_URL: https://api.ekofutura.com
   NEXT_PUBLIC_APP_NAME: EkoFutura
   ```

4. **Déployer**
   ```
   Cliquez sur "Deploy"
   ```

#### Déploiement Automatique

Le déploiement s'effectue automatiquement à chaque push sur `main` :

```yaml
# .github/workflows/deploy-frontend.yml (exemple)
name: Deploy Frontend

on:
  push:
    branches: [ main ]
    paths: [ frontend/** ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        uses: vercel/action@v4
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

### Option 2 : Netlify

1. Connectez votre repository
2. Configurez :
   ```
   Build command: npm run build
   Publish directory: .next
   Environment: NEXT_PUBLIC_API_URL
   ```
3. Déployez

### Option 3 : AWS S3 + CloudFront

```bash
# Construire
npm run build

# Déployer sur S3
aws s3 sync .next/ s3://ekofutura-frontend/

# Invalider CloudFront
aws cloudfront create-invalidation --distribution-id E123ABC --paths "/*"
```

---

## 🔧 Déploiement du Backend

### Option 1 : Render (Recommandé)

#### Configuration

1. **Créer un nouveau service**
   ```
   https://dashboard.render.com/new/web
   ```

2. **Connecter le repository GitHub**

3. **Configurer le service**
   ```
   Name: ekofutura-api
   Environment: Python 3.11
   Build Command: pip install -r requirements.txt
   Start Command: uvicorn main:app --host 0.0.0.0 --port 10000
   ```

4. **Ajouter les variables d'environnement**
   ```
   DATABASE_URL: postgresql://user:pass@host/dbname
   SECRET_KEY: your_secret_key_here
   ENVIRONMENT: production
   ```

5. **Déployer**

### Option 2 : Heroku

```bash
# Installation de Heroku CLI
npm install -g heroku

# Login
heroku login

# Créer l'application
heroku create ekofutura-api

# Ajouter les variables d'environnement
heroku config:set DATABASE_URL=postgresql://...
heroku config:set SECRET_KEY=...

# Déployer
git push heroku main
```

### Option 3 : Docker + AWS ECS

#### Créer un Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### Déployer sur ECR

```bash
# Créer le repository ECR
aws ecr create-repository --repository-name ekofutura-api

# Build et push
docker build -t ekofutura-api .
docker tag ekofutura-api:latest $AWS_ACCOUNT.dkr.ecr.$AWS_REGION.amazonaws.com/ekofutura-api:latest
docker push $AWS_ACCOUNT.dkr.ecr.$AWS_REGION.amazonaws.com/ekofutura-api:latest
```

---

## 🌍 Configuration des Domaines

### Configurer un Domaine Personnalisé

#### Sur Vercel (Frontend)

1. Allez dans les paramètres du projet
2. Domain Settings
3. Ajoutez votre domaine : `ekofutura.com`
4. Vérifiez les enregistrements DNS

#### Enregistrements DNS

```
Type    Host         Value
A       @            76.76.19.0          (exemple Vercel)
CNAME   www          cname.vercel-dns.com
CNAME   api          cname.render.com    (pour le backend)
MX      @            10 mail.example.com (si nécessaire)
TXT     @            v=spf1 ...          (SPF record)
```

---

## 🔐 SSL/TLS

### Certificats Automatiques

Les providers comme Vercel, Render et Heroku fournissent automatiquement des certificats SSL/TLS gratuits via Let's Encrypt.

### Certificat Personnalisé (AWS)

```bash
# Demander un certificat via ACM
aws acm request-certificate \
  --domain-name ekofutura.com \
  --subject-alternative-names www.ekofutura.com

# Valider via email ou DNS
# Puis utiliser dans CloudFront/ALB
```

---

## 📝 Variables d'Environnement

### Frontend (.env.production)

```env
NEXT_PUBLIC_API_URL=https://api.ekofutura.com
NEXT_PUBLIC_APP_NAME=EkoFutura
NEXT_PUBLIC_ANALYTICS_ID=G-XXXXXXXXXX
NEXT_PUBLIC_MAPBOX_TOKEN=pk_live_xxxxxxxxxx
```

### Backend (.env.production)

```env
DATABASE_URL=postgresql://user:password@host/ekofutura
SECRET_KEY=your_very_long_secret_key_here_min_32_chars
DEBUG=False
ENVIRONMENT=production
CORS_ALLOWED_ORIGINS=https://ekofutura.com,https://www.ekofutura.com
LOG_LEVEL=INFO
```

---

## 📊 Monitoring

### Uptime Monitoring

```bash
# UptimeRobot
# Configuration :
# - URL: https://api.ekofutura.com/health
# - Fréquence: 5 minutes
# - Alertes: Email, Slack
```

### Logs

#### Vercel
```
Dashboard → Analytics → Functions
```

#### Render
```
Dashboard → Logs
```

#### AWS CloudWatch
```bash
aws logs tail /aws/lambda/ekofutura-api --follow
```

### Métriques

- **Latence** : < 500ms (idéalement < 200ms)
- **Erreurs 5xx** : < 0.1%
- **Uptime** : > 99.9%

---

## 🔄 Pipeline CI/CD

### Exemple GitHub Actions

```yaml
name: Deploy Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install Frontend Dependencies
        run: cd frontend && npm install
      
      - name: Lint Frontend
        run: cd frontend && npm run lint
      
      - name: Test Frontend
        run: cd frontend && npm run test
      
      - name: Build Frontend
        run: cd frontend && npm run build

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy Frontend
        run: vercel --prod
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
      
      - name: Deploy Backend
        run: |
          git push heroku main
        env:
          HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
```

---

## 🚨 Troubleshooting

### Erreur 502 Bad Gateway

**Cause** : Le backend est down ou lent

```bash
# Vérifier l'état du backend
curl https://api.ekofutura.com/health

# Vérifier les logs
heroku logs --tail
# ou
aws logs tail /aws/lambda/ekofutura-api
```

### Erreur CORS

**Solution** : Vérifier les configurations CORS

```python
# Backend
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ALLOWED_ORIGINS", "").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Build Timeout

**Solution** : Optimiser le build

```json
{
  "buildCommand": "npm run build",
  "env": {
    "SKIP_ENV_VALIDATION": "true"
  }
}
```

### Database Connection Error

```bash
# Vérifier la chaîne de connexion
echo $DATABASE_URL

# Tester la connexion
psql $DATABASE_URL -c "SELECT 1;"
```

---

## ✅ Checklist de Déploiement

- [ ] Toutes les variables d'environnement sont configurées
- [ ] Les secrets sont sécurisés (pas en plaintext dans le code)
- [ ] Les domaines DNS sont configurés
- [ ] SSL/TLS est activé
- [ ] Monitoring et alertes sont en place
- [ ] Backups sont configurés
- [ ] Logs sont centralisés
- [ ] Le pipeline CI/CD fonctionne
- [ ] Les tests passent
- [ ] La documentation est mise à jour

---

## 📞 Support

Pour les problèmes de déploiement :
- 📧 Ouvrir une [issue GitHub](https://github.com/Momad-eden/ekofutura/issues)
- 💬 [Discussions du projet](https://github.com/Momad-eden/ekofutura/discussions)

---

<div align="center">

[Retour au README principal](../README.md) • [Guide de Contribution](./CONTRIBUTING.md)

</div>
