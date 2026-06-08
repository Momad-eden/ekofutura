# 🌍 EkoFutura - Plateforme de Signalement Environnemental

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-67.9%25-blue)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-29.6%25-green)](https://www.python.org/)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen)]()

**Une plateforme collaborative de signalement et de sensibilisation aux enjeux environnementaux**

[Voir le projet](#features) • [Installation](#installation) • [Contribution](#contribution) • [License](#license)

</div>

---

## 📋 Table des matières

- [À propos](#à-propos)
- [Fonctionnalités](#features)
- [Structure du projet](#structure-du-projet)
- [Stack technologique](#stack-technologique)
- [Installation](#installation)
- [Démarrage rapide](#démarrage-rapide)
- [Configuration](#configuration)
- [Contribution](#contribution)
- [License](#license)

---

## À propos

**EkoFutura** est une plateforme innovante dédiée au signalement et à la sensibilisation environnementale. Elle permet aux utilisateurs de :

- 📍 **Signaler** des problèmes environnementaux (pollution, déchets, dégradation, etc.)
- 📊 **Consulter** les rapports et statistiques environnementales
- 🤝 **Collaborer** avec la communauté pour des solutions durables
- 📱 **S'informer** sur les enjeux écologiques locaux et globaux

---

## ✨ Fonctionnalités

### 🎯 Actuellement en développement

- [ ] Interface utilisateur responsive (TypeScript/Next.js)
- [ ] Système de signalement géolocalisé
- [ ] Base de données environnementale (Python)
- [ ] Tableau de bord analytique
- [ ] Système d'authentification utilisateur
- [ ] API REST complète
- [ ] Notifications et alertes
- [ ] Gamification (badges, points)
- [ ] Intégration cartographique
- [ ] Exports de rapports (PDF, CSV)

---

## 🏗 Structure du projet

```
ekofutura/
├── frontend/                 # Application Next.js (TypeScript)
│   ├── app/                 # Pages et routes
│   ├── components/          # Composants React
│   ├── public/              # Ressources statiques
│   ├── styles/              # Feuilles de style CSS
│   └── package.json
├── backend/                 # API Python (si applicable)
│   ├── src/
│   ├── tests/
│   └── requirements.txt
├── docs/                    # Documentation du projet
├── README.md                # Ce fichier
├── .gitignore
└── LICENSE
```

---

## 💻 Stack technologique

### Frontend
- **Framework** : [Next.js](https://nextjs.org/) 14+
- **Langage** : TypeScript (67.9%)
- **Styling** : CSS (1.8%)
- **Package Manager** : npm / yarn / pnpm

### Backend
- **Langage** : Python (29.6%)
- **Framework** : FastAPI ou Django (à définir)
- **Base de données** : PostgreSQL / MongoDB (à définir)
- **API** : REST API

### DevOps & Tools
- **Version Control** : Git & GitHub
- **CI/CD** : GitHub Actions (à configurer)
- **Containerization** : Docker (optionnel)

---

## 📦 Installation

### Prérequis

- **Node.js** 18+ et npm/yarn
- **Python** 3.9+ (pour le backend)
- **Git**

### Cloner le repository

```bash
git clone https://github.com/Momad-eden/ekofutura.git
cd ekofutura
```

### Installation du Frontend

```bash
cd frontend
npm install
# ou
yarn install
```

### Installation du Backend (si applicable)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Sur Windows: venv\Scripts\activate
pip install -r requirements.txt
```

---

## 🚀 Démarrage rapide

### Lancer le frontend en développement

```bash
cd frontend
npm run dev
```

L'application sera accessible à `http://localhost:3000`

### Lancer le backend en développement

```bash
cd backend
python -m uvicorn main:app --reload
```

L'API sera accessible à `http://localhost:8000`

---

## ⚙️ Configuration

### Variables d'environnement

Créez un fichier `.env.local` à la racine de `frontend/` :

```env
# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=EkoFutura

# Optionnel: Services externes
# NEXT_PUBLIC_MAPBOX_TOKEN=your_token_here
# NEXT_PUBLIC_ANALYTICS_ID=your_id_here
```

Pour le backend, créez un fichier `.env` à la racine de `backend/` :

```env
# Backend
DATABASE_URL=postgresql://user:password@localhost/ekofutura
SECRET_KEY=your_secret_key_here
DEBUG=True
```

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment contribuer :

### 1. Fork le projet
```bash
git clone https://github.com/Momad-eden/ekofutura.git
```

### 2. Créer une branche pour votre fonctionnalité
```bash
git checkout -b feature/amazing-feature
```

### 3. Commiter vos changements
```bash
git commit -m 'Add some amazing feature'
```

### 4. Pousser vers la branche
```bash
git push origin feature/amazing-feature
```

### 5. Ouvrir une Pull Request

### Directives de contribution

- ✅ Suivre le style de code existant
- ✅ Ajouter des tests pour les nouvelles fonctionnalités
- ✅ Mettre à jour la documentation
- ✅ Utiliser des messages de commit clairs et descriptifs
- ✅ Une PR = Une fonctionnalité/correction

---

## 📝 Standards de code

### TypeScript/JavaScript
- Utiliser ESLint et Prettier
- Nommer les fichiers en camelCase
- Commenter le code complexe

### Python
- Suivre PEP 8
- Utiliser type hints
- Ajouter des docstrings

---

## 🐛 Signaler un bug

Avez-vous trouvé un bug ? [Ouvrez une issue GitHub](https://github.com/Momad-eden/ekofutura/issues/new)

Décrivez :
- 📌 Le comportement actuel
- 📌 Le comportement attendu
- 📌 Les étapes pour reproduire
- 📌 Votre environnement (OS, navigateur, versions)

---

## 📖 Documentation supplémentaire

- [Frontend - Développement](./frontend/README.md)
- [Backend - API](./backend/README.md) (à créer)
- [Guide de contribution détaillé](./docs/CONTRIBUTING.md) (à créer)
- [Guide de déploiement](./docs/DEPLOYMENT.md) (à créer)

---

## 📊 Roadmap

### Phase 1 (En cours)
- [ ] Setup du frontend (Next.js)
- [ ] Setup du backend (API)
- [ ] Authentification utilisateur
- [ ] Modèle de données initial

### Phase 2
- [ ] Interface de signalement
- [ ] Système de localisation géographique
- [ ] Dashboard utilisateur

### Phase 3
- [ ] Fonctionnalités sociales (commentaires, likes)
- [ ] Système de notifications
- [ ] Intégrations externes

### Phase 4
- [ ] Gamification
- [ ] Analytics avancées
- [ ] Applications mobiles

---

## 📄 License

Ce projet est sous la licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 👤 Auteur

**Momad-eden**
- GitHub: [@Momad-eden](https://github.com/Momad-eden)

---

## 💬 Support & Contact

Avez-vous des questions ? 
- 📧 [Ouvrir une issue](https://github.com/Momad-eden/ekofutura/issues)
- 💭 [Discussions du projet](https://github.com/Momad-eden/ekofutura/discussions)

---

## 🙏 Remerciements

Merci à tous les contributeurs et à la communauté pour leur soutien !

---

<div align="center">

**[⬆ Retour au sommet](#-ekofutura---plateforme-de-signalement-environnemental)**

Fait avec ❤️ pour la planète 🌱

</div>
