# GSB Frontend

## Présentation du projet

Ce projet constitue l'interface utilisateur de l'application **GSB (Gestion de Suivi des Bordereaux)**, développée dans le cadre de l'**épreuve E5 du BTS SIO (Services Informatiques aux Organisations)**, option **SLAM (Solutions Logicielles et Applications Métier)**.

Il s'agit d'une application web moderne et intuitive permettant aux utilisateurs de gérer leurs bordereaux de frais, avec une interface adaptée selon le rôle (utilisateur standard ou administrateur).

---

## Table des matières
- [Contexte pédagogique](#contexte-pédagogique)
- [Fonctionnalités principales](#fonctionnalités-principales)
- [Technologies utilisées](#technologies-utilisées)
- [Structure de l'application](#structure-de-lapplication)
- [Installation et démarrage](#installation-et-démarrage)
- [Guide d'utilisation](#guide-dutilisation)
- [Comptes de démonstration](#comptes-de-démonstration)

---

## Contexte pédagogique

### Objectifs pédagogiques
Ce projet démontre la maîtrise des compétences suivantes :
- **Développement frontend moderne** : Utilisation de React avec les hooks et le contexte
- **Interface utilisateur** : Création d'une interface intuitive et responsive
- **Gestion d'état** : Utilisation de Context API pour la gestion de l'authentification
- **Routage** : Navigation entre les pages avec React Router
- **Visualisation de données** : Intégration de graphiques et statistiques
- **UX/UI** : Design moderne avec Tailwind CSS et thème clair/sombre
- **Intégration API** : Communication avec le backend via des requêtes HTTP

### Compétences évaluées
- Conception et développement d'interfaces utilisateur
- Gestion de l'état et des données
- Intégration avec une API REST
- Expérience utilisateur (UX) et interface utilisateur (UI)
- Responsive design et accessibilité

---

## Fonctionnalités principales

### Pour tous les utilisateurs
- **Authentification** : Connexion sécurisée avec gestion des sessions
- **Tableau de bord** : Vue d'ensemble des bordereaux avec filtres et pagination
- **Gestion des bordereaux** : Création, modification, suppression de bordereaux
- **Upload de justificatifs** : Téléversement de fichiers pour les bordereaux
- **Statistiques** : Visualisation des données avec graphiques (camemberts, barres)
- **Pièces jointes** : Bibliothèque personnelle de fichiers
- **Profil** : Modification des informations personnelles et changement de mot de passe
- **Support** : Page d'aide avec FAQ et contact
- **Thème clair/sombre** : Basculement entre les thèmes selon les préférences

### Pour les administrateurs
- **Tableau de bord administrateur** : Vue globale sur tous les utilisateurs
- **Gestion des utilisateurs** : Consultation, modification, suppression des utilisateurs
- **Validation des bordereaux** : Validation ou refus des bordereaux de tous les utilisateurs
- **Statistiques globales** : Analyses et graphiques sur l'ensemble des données

---

## Technologies utilisées

### Framework et bibliothèques principales
- **React 19** : Bibliothèque JavaScript pour créer des interfaces utilisateur
- **Vite** : Outil de build moderne et rapide
- **React Router DOM** : Routage côté client pour la navigation

### Styling et UI
- **Tailwind CSS** : Framework CSS utilitaire pour un design moderne
- **React Icons** : Bibliothèque d'icônes
- **Font Awesome** : Icônes supplémentaires

### Visualisation de données
- **Recharts** : Bibliothèque de graphiques React
- **Chart.js & react-chartjs-2** : Graphiques avancés (camemberts, barres)

### Authentification
- **jwt-decode** : Décodage des tokens JWT côté client

---

## Structure de l'application

```
GSBfrontend/
├── src/
│   ├── pages/          # Pages principales de l'application
│   │   ├── Login.jsx              → Page de connexion
│   │   ├── Dashboard.jsx           → Tableau de bord utilisateur
│   │   ├── DashboardAdminUsers.jsx → Tableau de bord administrateur
│   │   ├── Statistics.jsx          → Page des statistiques
│   │   ├── Attachments.jsx         → Gestion des pièces jointes
│   │   ├── Profile.jsx             → Profil utilisateur
│   │   ├── Support.jsx             → Page d'aide
│   │   └── UserBills.jsx           → Liste des bordereaux
│   │
│   ├── Components/     # Composants réutilisables
│   │   ├── Attachments/      → Composants pour les pièces jointes
│   │   ├── BillDetails/      → Détails des bordereaux
│   │   ├── Profile/          → Composants du profil
│   │   ├── Statistics/       → Composants de statistiques
│   │   ├── Support/          → Composants de support
│   │   └── ...               → Autres composants (filtres, pagination, etc.)
│   │
│   ├── context/        # Contextes React (gestion d'état)
│   │   ├── AuthContext.jsx    → Gestion de l'authentification
│   │   ├── PrivateRoute.jsx   → Protection des routes privées
│   │   └── AdminRoute.jsx     → Protection des routes admin
│   │
│   ├── common/         # Composants communs
│   │   ├── Sidebar.jsx        → Barre latérale de navigation
│   │   └── ThemeContext.jsx   → Gestion du thème clair/sombre
│   │
│   ├── modals/         # Modales de l'application
│   │   ├── CreateBillModal.jsx    → Création de bordereau
│   │   ├── BillDetailsModal.jsx   → Détails d'un bordereau
│   │   ├── EditUserModal.jsx      → Édition d'utilisateur
│   │   └── ConfirmatioModal.jsx   → Modales de confirmation
│   │
│   ├── assets/         # Ressources (images, logos)
│   ├── App.jsx         # Composant racine avec le routage
│   └── main.jsx        # Point d'entrée de l'application
│
└── public/             # Fichiers statiques
```

---

## Installation et démarrage

### Prérequis
- Node.js installé (version 16 ou supérieure)
- Backend GSB configuré et fonctionnel

### Installation
1. Installer les dépendances :
   ```bash
   npm install
   ```

2. Démarrer l'application en mode développement :
   ```bash
   npm run dev
   ```

L'application sera accessible sur `http://localhost:5173`

### Build de production
Pour créer une version de production :
```bash
npm run build
```

---

## Guide d'utilisation

### Connexion
1. Accéder à la page de connexion
2. Saisir l'email et le mot de passe
3. Cliquer sur "Se connecter"
4. Redirection automatique vers le tableau de bord selon le rôle

### Tableau de bord utilisateur
- **Vue d'ensemble** : Liste de tous les bordereaux de l'utilisateur
- **Filtres** : Filtrer par statut (En attente, Validée, Refusée) ou par type
- **Actions** :
  - Créer un nouveau bordereau
  - Consulter les détails d'un bordereau
  - Modifier ou supprimer un bordereau
- **Pagination** : Navigation entre les pages de résultats

### Création d'un bordereau
1. Cliquer sur "Créer un bordereau"
2. Remplir le formulaire :
   - Date
   - Montant
   - Type (Repas, Transport, Hébergement, Autre)
   - Description
   - Justificatif (upload de fichier)
3. Valider la création

### Statistiques
- **Graphiques** : Visualisation des données sous forme de graphiques
- **Analyses** : Répartition par type, par période, etc.
- **Cartes statistiques** : Indicateurs clés (total, moyenne, etc.)

### Pièces jointes
- **Bibliothèque** : Consultation de tous les fichiers uploadés
- **Upload** : Ajout de nouveaux fichiers
- **Suppression** : Retrait de fichiers inutiles

### Profil
- **Informations personnelles** : Consultation et modification
- **Changement de mot de passe** : Mise à jour sécurisée

### Tableau de bord administrateur
- **Liste des utilisateurs** : Vue de tous les utilisateurs
- **Statistiques globales** : Analyses sur l'ensemble des données
- **Gestion** : Modification, suppression d'utilisateurs
- **Validation** : Validation ou refus des bordereaux

---

## Comptes de démonstration

Pour tester l'application, deux comptes sont disponibles :

### 👤 Utilisateur standard
- **Email** : `jean@doe.com`
- **Mot de passe** : `password`
- **Rôle** : Utilisateur basique

**Fonctionnalités accessibles** :
- ✅ Création et gestion de ses propres bordereaux
- ✅ Consultation de ses statistiques personnelles
- ✅ Gestion de sa bibliothèque de pièces jointes
- ✅ Modification de son profil
- ✅ Consultation de l'historique de ses bordereaux

### 👨‍💼 Administrateur
- **Email** : `jean@admin.com`
- **Mot de passe** : `password`
- **Rôle** : Administrateur

**Fonctionnalités accessibles** :
- ✅ Toutes les fonctionnalités utilisateur standard
- ✅ Accès au tableau de bord administrateur
- ✅ Gestion de tous les utilisateurs (consultation, modification, suppression)
- ✅ Validation et refus des bordereaux de tous les utilisateurs
- ✅ Consultation des statistiques globales
- ✅ Vue d'ensemble de l'activité de l'application

**Note importante** : Ces comptes doivent être présents dans la base de données backend pour fonctionner. Assurez-vous que le backend est démarré et que ces utilisateurs existent.

---

## Navigation et routes

### Routes publiques
- `/` → Page de connexion

### Routes privées (authentification requise)
- `/dashboard` → Tableau de bord utilisateur
- `/statistics` → Statistiques personnelles
- `/attachments` → Gestion des pièces jointes
- `/profile` → Profil utilisateur
- `/support` → Page d'aide et support

### Routes administrateur (admin uniquement)
- `/dashboard-admin/users` → Tableau de bord administrateur

### Protection des routes
- Les routes privées vérifient la présence d'un token JWT valide
- Les routes administrateur vérifient en plus le rôle "admin"
- Redirection automatique vers la page de connexion si non authentifié

---

## Fonctionnalités techniques

### Authentification
- **JWT** : Stockage du token dans le localStorage
- **Gestion de session** : Vérification automatique de la validité du token
- **Déconnexion** : Suppression du token et redirection

### Thème clair/sombre
- **Basculement** : Changement de thème en un clic
- **Persistance** : Sauvegarde de la préférence dans le localStorage
- **Application automatique** : Restauration du thème au chargement

### Gestion des données
- **Requêtes API** : Communication avec le backend via fetch
- **Gestion d'erreurs** : Affichage approprié des erreurs
- **Loading states** : Indicateurs de chargement pendant les requêtes

### Responsive design
- **Adaptation** : Interface adaptée aux différentes tailles d'écran
- **Mobile-friendly** : Utilisation optimale sur mobile et tablette

---

## Points techniques remarquables

### Architecture
- **Composants réutilisables** : Code modulaire et maintenable
- **Context API** : Gestion centralisée de l'état (authentification, thème)
- **Séparation des responsabilités** : Pages, composants, contextes bien organisés

### Expérience utilisateur
- **Interface intuitive** : Navigation claire et logique
- **Feedback visuel** : Modales, confirmations, messages d'erreur
- **Performance** : Chargement rapide grâce à Vite
- **Accessibilité** : Respect des bonnes pratiques d'accessibilité

### Intégrations
- **API REST** : Communication fluide avec le backend
- **Graphiques** : Visualisation de données avec Recharts et Chart.js
- **Upload de fichiers** : Gestion des uploads de justificatifs

---

## Conclusion

Cette application frontend démontre la capacité à concevoir et développer une interface utilisateur moderne, intuitive et fonctionnelle. Elle offre une expérience utilisateur optimale pour la gestion des bordereaux de frais, avec une distinction claire entre les rôles utilisateur et administrateur. L'intégration avec le backend et l'utilisation de technologies modernes en font une application complète et professionnelle.
