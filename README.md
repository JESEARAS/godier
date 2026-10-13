# Clinique GODIE — Application Web de Gestion Hospitalière

> Projet de fin d'études — Licence Professionnelle Informatique
> Clinique GODIE — Antsiranana, Madagascar
> Directeur : JESE Andriamaniraka Davida

Application web complète de gestion hospitalière développée en React, TypeScript, Vite et Tailwind CSS. L'application couvre 30 modules fonctionnels : patients, médecins, personnel, infirmiers, rendez-vous, consultations, ordonnances, hospitalisations, chambres, lits, laboratoires, analyses, résultats, médicaments, pharmacie, stock, fournisseurs, factures, paiements, assurances, services, spécialités, urgences, ambulances, utilisateurs, rôles, permissions, paramètres, sauvegarde et journal des activités.

## Aperçu

- **30 modules** fonctionnels avec CRUD complet (créer, lire, modifier, supprimer)
- **Recherche instantanée**, filtres, pagination
- **Export PDF, Excel (CSV), impression** sur tous les modules
- **Tableau de bord** avec graphiques (Chart.js) et statistiques en temps réel
- **Calendrier** interactif des rendez-vous
- **Mode clair / mode sombre**
- **Design responsive** (ordinateur, tablette, téléphone)
- **Base de données vide** au démarrage — identifiants auto-incrémentés à partir de 1
- **Sauvegarde / restauration** des données (export JSON)
- **Journal des activités**

## Technologies

| Couche | Technologie |
|--------|-------------|
| Frontend | React 18, TypeScript |
| Build | Vite 5 |
| Styles | Tailwind CSS 3 |
| Graphiques | Chart.js + react-chartjs-2 |
| PDF | jsPDF |
| QR Code | qrcode.react |
| Icônes | lucide-react |
| Routage | react-router-dom 7 |

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/votre-compte/clinique-godie.git
cd clinique-godie

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Prévisualiser le build
npm run preview
```

## Scripts disponibles

| Script | Description |
|--------|-------------|
| `npm run dev` | Démarre le serveur de développement |
| `npm run build` | Construit l'application pour la production |
| `npm run preview` | Prévisualise le build de production |
| `npm run typecheck` | Vérification des types TypeScript |
| `npm run lint` | Analyse du code avec ESLint |

## Architecture

```
src/
├── components/          # Composants réutilisables
│   ├── CrudPage.tsx     # Page CRUD générique (config-driven)
│   ├── Sidebar.tsx      # Navigation latérale + barre supérieure
│   ├── Modal.tsx        # Fenêtres modales et confirmation
│   ├── Toast.tsx         # Notifications
│   └── ui.tsx           # Cartes statistiques, en-têtes, états vides
├── pages/               # Pages personnalisées
│   ├── Dashboard.tsx    # Tableau de bord
│   ├── Appointments.tsx # Calendrier des rendez-vous
│   ├── Reports.tsx      # Rapports et exports
│   ├── Settings.tsx     # Paramètres et sauvegarde
│   └── NotFound.tsx     # Page 404
├── hooks/               # Hooks personnalisés
│   ├── useCollection.ts # Store localStorage + auto-incrément
│   └── useRefStore.ts   # Résolution des références
├── services/
│   └── resources.ts     # Registre des 30 modules (config-driven)
├── types/
│   └── index.ts         # Types d'entités du domaine
├── utils/
│   └── format.ts        # Formatage dates, monnaie, CSV
├── App.tsx              # Routage principal
└── index.css            # Styles globaux + Tailwind
```

## Modules

L'application est organisée en 6 groupes fonctionnels :

1. **Patients & Soins** — Patients
2. **Personnel** — Médecins, Personnel, Infirmiers
3. **Consultations** — Rendez-vous, Consultations, Ordonnances
4. **Hospitalisation** — Hospitalisations, Chambres, Lits
5. **Laboratoire** — Laboratoires, Analyses, Résultats
6. **Pharmacie** — Médicaments, Fournisseurs, Stock
7. **Facturation** — Factures, Paiements, Assurances
8. **Référentiels** — Services, Spécialités
9. **Urgences** — Urgences, Ambulances
10. **Sécurité** — Utilisateurs, Rôles, Journal des activités

## Persistance des données

Les données sont stockées dans le `localStorage` du navigateur. Chaque collection utilise un compteur d'auto-incrément persistant pour garantir des identifiants uniques commençant à 1. La page **Paramètres** permet d'exporter et restaurer une sauvegarde JSON complète, et de réinitialiser la base de données.

## Auteur

**JESE Andriamaniraka Davida**
Directeur de la Clinique GODIE — Antsiranana, Madagascar

## Licence

MIT — Voir le fichier [LICENSE](./LICENSE)
# HOSPITAL
