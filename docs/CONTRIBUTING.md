# 📖 Guide de Contribution - EkoFutura

Bienvenue ! Merci de votre intérêt pour contribuer à EkoFutura. Ce guide vous aidera à comprendre comment contribuer efficacement au projet.

## Table des matières

- [Code de Conduite](#code-de-conduite)
- [Comment Commencer](#comment-commencer)
- [Types de Contributions](#types-de-contributions)
- [Processus de Contribution](#processus-de-contribution)
- [Standards de Code](#standards-de-code)
- [Conventions de Commit](#conventions-de-commit)
- [Pull Request](#pull-request)
- [Signaler des Bugs](#signaler-des-bugs)
- [Suggérer des Améliorations](#suggérer-des-améliorations)

---

## 🤝 Code de Conduite

Nous nous engageons à fournir un environnement accueillant et inclusif. Tous les contributeurs doivent adhérer à notre code de conduite :

- ✅ Soyez respectueux et bienveillant
- ✅ Acceptez les critiques constructives
- ✅ Focalisez-vous sur ce qui est bon pour la communauté
- ✅ Respectez les différences d'opinion
- ❌ Pas de harcèlement, discrimination ou langage offensant

**Conséquences** : Les violations du code de conduite peuvent entraîner des avertissements ou une exclusion du projet.

---

## 🚀 Comment Commencer

### 1. Fork le Repository

```bash
# Allez sur GitHub et cliquez sur "Fork"
# https://github.com/Momad-eden/ekofutura
```

### 2. Cloner votre Fork

```bash
git clone https://github.com/YOUR_USERNAME/ekofutura.git
cd ekofutura
```

### 3. Ajouter le Repository Upstream

```bash
git remote add upstream https://github.com/Momad-eden/ekofutura.git
git fetch upstream
```

### 4. Créer une Branche de Travail

```bash
git checkout -b feature/nom-de-votre-feature
# ou
git checkout -b fix/nom-du-bug
# ou
git checkout -b docs/nom-de-la-documentation
```

### 5. Installer les Dépendances

**Frontend** :
```bash
cd frontend
npm install
npm run dev
```

**Backend** :
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

---

## 📝 Types de Contributions

### 🐛 Corrections de Bugs
- Reportez les bugs avec des détails
- Proposez des corrections avec tests
- Mettez à jour la documentation si nécessaire

### ✨ Nouvelles Fonctionnalités
- Vérifiez d'abord les issues ouvertes
- Discutez de l'implémentation dans une issue
- Suivez le guide d'implémentation
- Ajoutez des tests et documentation

### 📚 Documentation
- Améliorez le README.md
- Ajoutez des commentaires au code
- Créez des guides et tutoriels
- Corrigez les typos

### 🎨 Améliorations d'Interface
- Proposez des designs améliorés
- Améliez l'accessibilité
- Optimisez les performances

### ♻️ Refactoring
- Nettoyez le code
- Améliorez la structure
- Optimisez les performances
- Réduisez la dette technique

---

## 🔄 Processus de Contribution

### Étape 1 : Créer une Issue (si elle n'existe pas)

```markdown
**Description** : Description claire du problème/fonctionnalité

**Contexte** : Informations supplémentaires

**Étapes pour reproduire** (pour les bugs) :
1. Allez à '...'
2. Cliquez sur '...'
3. Observez l'erreur '...'

**Comportement attendu** : Ce qui devrait se passer

**Environnement** :
- OS : Windows/Mac/Linux
- Version de Node : 18+
- Navigateur : Chrome/Firefox
```

### Étape 2 : Synchroniser avec Upstream

```bash
git fetch upstream
git rebase upstream/main
```

### Étape 3 : Implémenter vos Changements

- Écrivez du code de qualité
- Suivez les standards du projet
- Testez vos modifications
- Ajoutez des commentaires explicatifs

### Étape 4 : Tester Localement

```bash
# Frontend
cd frontend
npm run dev
npm run test  # Si disponible

# Backend
cd backend
pytest  # ou votre framework de test
```

### Étape 5 : Commiter vos Changements

```bash
git add .
git commit -m "type: description courte"
```

Voir [Conventions de Commit](#conventions-de-commit) ci-dessous.

### Étape 6 : Pousser vers votre Fork

```bash
git push origin feature/nom-de-votre-feature
```

### Étape 7 : Créer une Pull Request

Allez sur GitHub et cliquez sur "Compare & pull request"

---

## 💻 Standards de Code

### TypeScript/JavaScript

```typescript
// ✅ BON
function calculateArea(radius: number): number {
  return Math.PI * radius * radius;
}

const getUserById = async (id: string): Promise<User> => {
  // Implémenter
};

// ❌ MAUVAIS
function calculateArea(r) {
  return 3.14 * r * r;
}

const getUserId = async (id) => {
  // Implémenter
};
```

**Règles** :
- Utiliser des types explicites
- Nommer les variables de manière descriptive
- Utiliser camelCase pour les variables/fonctions
- Utiliser PascalCase pour les classes/composants
- Ajouter des commentaires pour le code complexe
- Longueur max des lignes : 100 caractères

### Python

```python
# ✅ BON
from typing import Optional

def calculate_area(radius: float) -> float:
    """Calculer l'aire d'un cercle."""
    return 3.14159 * radius ** 2

async def get_user_by_id(user_id: str) -> Optional[User]:
    """Récupérer un utilisateur par son ID."""
    # Implémenter
    pass

# ❌ MAUVAIS
def calculateArea(r):
    return 3.14*r*r

def getUserId(id):
    # Get user
    pass
```

**Règles** :
- Suivre PEP 8
- Utiliser type hints
- Ajouter des docstrings pour toutes les fonctions
- Longueur max des lignes : 88 caractères (Black formatter)
- Utiliser snake_case

### CSS

```css
/* ✅ BON */
.button-primary {
  padding: 0.75rem 1.5rem;
  background-color: var(--color-primary);
  border-radius: var(--border-radius);
  transition: all 0.3s ease;
}

/* ❌ MAUVAIS */
.btn {
  padding: 12px 24px;
  background: blue;
  border-radius: 4px;
}
```

**Règles** :
- Utiliser kebab-case pour les classes
- Utiliser CSS variables
- Organiser les propriétés logiquement
- Éviter les IDs pour les styles

---

## 📌 Conventions de Commit

Nous suivons le format **Conventional Commits** :

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types autorisés

- **feat** : Nouvelle fonctionnalité
- **fix** : Correction de bug
- **docs** : Changements de documentation
- **style** : Changements de formatage (pas de logique)
- **refactor** : Refactoring du code
- **perf** : Optimisations de performance
- **test** : Ajout/modification de tests
- **chore** : Tâches de maintenance

### Exemples

```bash
# Nouvelle fonctionnalité
git commit -m "feat(auth): ajouter authentification OAuth"

# Correction de bug
git commit -m "fix(ui): corriger le positionnement du menu"

# Documentation
git commit -m "docs(readme): ajouter guide d'installation"

# Refactoring
git commit -m "refactor(api): simplifier la gestion des erreurs"

# Avec corps de message
git commit -m "feat(reporting): ajouter système de signalement

- Créer le formulaire de signalement
- Ajouter validation des données
- Intégrer avec la base de données

Closes #123"
```

---

## 🔀 Pull Request

### Avant de créer une PR

- [ ] Vous avez créé une branche depuis `main`
- [ ] Vous avez testé localement
- [ ] Vos commits suivent les conventions
- [ ] Vous avez mis à jour la documentation
- [ ] Vous n'avez pas de conflits de merge

### Template de PR

```markdown
## Description
Description courte et claire de vos changements.

## Type de changement
- [ ] Correction de bug
- [ ] Nouvelle fonctionnalité
- [ ] Changement qui casse la rétro-compatibilité
- [ ] Mise à jour de documentation

## Comment tester
Étapes pour tester vos changements :
1. ...
2. ...
3. ...

## Screenshots (si applicable)
[Ajouter des screenshots]

## Checklist
- [ ] Mon code suit les standards du projet
- [ ] J'ai effectué une auto-revue de mon code
- [ ] J'ai commenté le code complexe
- [ ] J'ai mis à jour la documentation
- [ ] Mes changements ne génèrent pas de nouveaux avertissements
- [ ] J'ai ajouté des tests qui prouvent ma correction
- [ ] Les tests unitaires passent localement

## Issues liées
Ferme #123
```

### Pendant la revue

- ✅ Répondez aux commentaires rapidement
- ✅ Demandez des clarifications si nécessaire
- ✅ Apportez les corrections suggérées
- ✅ Remerciez les reviewers

---

## 🐛 Signaler des Bugs

### Avant de signaler

1. **Vérifiez les issues existantes** - Le bug a-t-il déjà été signalé ?
2. **Testez la version actuelle** - Est-ce toujours un problème ?
3. **Rassemblez les informations** - Reproduction, environnement, logs

### Créer une Issue de Bug

```markdown
**Description**
Description claire et concise du bug.

**Reproduire le bug**
Étapes pour reproduire le comportement :
1. Allez à '...'
2. Cliquez sur '...'
3. Observez l'erreur '...'

**Comportement attendu**
Description claire du comportement attendu.

**Captures d'écran**
[Si applicable, ajoutez des captures d'écran]

**Environnement**
- OS : [ex. Windows 11, macOS 13]
- Navigateur : [ex. Chrome 120]
- Version de Node : [ex. 18.0.0]
- Version du projet : [ex. main branch]

**Logs additionnels**
[Collez les messages d'erreur ici]
```

---

## 💡 Suggérer des Améliorations

### Créer une Issue de Feature Request

```markdown
**Est-ce que cela résout un problème ?**
Description claire du problème ou besoin.

**Solution proposée**
Description claire de la solution que vous proposez.

**Alternatives considérées**
Description de toute solution alternative que vous avez considérée.

**Contexte additionnel**
Toute autre information pertinente.
```

---

## ✅ Checklist pour les Contributeurs

Avant de soumettre votre contribution :

- [ ] J'ai lu et compris ce guide
- [ ] J'ai adhéré au code de conduite
- [ ] J'ai créé une branche depuis `main`
- [ ] J'ai suivi les standards de code
- [ ] J'ai testé mes changements localement
- [ ] J'ai ajouté/mis à jour les tests
- [ ] J'ai mis à jour la documentation
- [ ] Mes commits suivent les conventions
- [ ] Mon code n'a pas de conflits avec `main`
- [ ] J'ai fourni une description claire de mes changements

---

## 🎯 Conseils pour une Contribution Réussie

1. **Commencez petit** - Une simple correction ou amélimentation
2. **Communiquez** - Posez des questions si vous avez besoin d'aide
3. **Soyez patient** - Les revues prennent du temps
4. **Apprenez des autres** - Lisez les PRs des autres contributeurs
5. **Célébrez les victoires** - Chaque contribution compte !

---

## 🆘 Besoin d'Aide ?

- 💬 [Discussions du projet](https://github.com/Momad-eden/ekofutura/discussions)
- 🐛 [Issues](https://github.com/Momad-eden/ekofutura/issues)
- 📧 Ouvrez une issue pour des questions

---

## 📜 License

En contribuant, vous acceptez que vos contributions soient sous la même licence que le projet (MIT).

---

<div align="center">

**Merci de contribuer à EkoFutura ! 🌱**

[Retour au README principal](../README.md)

</div>
