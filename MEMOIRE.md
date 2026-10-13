# MÉMOIRE DE FIN D'ÉTUDES

## Application Web de Gestion Hospitalière — Clinique GODIE

---

**Présenté par :** JESE Andriamaniraka Davida
**Année universitaire :** 2024–2025
**Diplôme :** Licence Professionnelle Informatique
**Établissement :** Université d'Antsiranana — Madagascar

---

## COUVERTURE

**RÉPUBLIQUE DE MADAGASCAR**
**Ministère de l'Enseignement Supérieur et de la Recherche Scientifique**
**Université d'Antsiranana**
**Faculté des Sciences — Département Informatique**

**MÉMOIRE DE FIN D'ÉTUDES**
en vue de l'obtention du diplôme de
**LICENCE PROFESSIONNELLE INFORMATIQUE**

**Intitulé :**
Conception et Réalisation d'une Application Web de Gestion Hospitalière
Cas de la Clinique GODIE à Antsiranana

**Présenté par :** JESE Andriamaniraka Davida
**Sous la direction de :** [Nom de l'encadreur]
**Année universitaire :** 2024–2025

---

## PAGE DE GARDE

| | |
|---|---|
| **Établissement** | Université d'Antsiranana, Faculté des Sciences |
| **Département** | Informatique |
| **Diplôme** | Licence Professionnelle Informatique |
| **Titre du mémoire** | Conception et Réalisation d'une Application Web de Gestion Hospitalière — Clinique GODIE |
| **Auteur** | JESE Andriamaniraka Davida |
| **Encadreur** | [Nom de l'encadreur] |
| **Année** | 2024–2025 |
| **Lieu** | Antsiranana, Madagascar |

---

## REMERCIEMENTS

Avant toute chose, je rends grâce à Dieu Tout-Puissant pour la santé, la force et la persévérance qu'Il m'a accordées tout au long de ce parcours universitaire.

Je tiens à exprimer mes plus sincères remerciements à l'ensemble du corps professoral du Département Informatique de la Faculté des Sciences de l'Université d'Antsiranana, dont les enseignements ont constitué le socle de ma formation.

Ma profonde gratitude va à mon encadreur, [Nom de l'encadreur], pour son accompagnement, ses orientations scientifiques et sa disponibilité constante durant l'élaboration de ce mémoire.

Je remercie également le jury d'avoir accepté d'évaluer ce travail, ainsi que la direction et le personnel de la Clinique GODIE pour leur accueil et leur collaboration.

Enfin, je remercie ma famille et mes proches pour leur soutien indéfectible.

---

## DÉDICACES

Je dédie ce mémoire :

- À mes parents, pour leurs sacrifices et leur amour inconditionnel ;
- À ma famille, pour son soutien constant ;
- À mes amis et camarades de promotion, avec qui j'ai partagé ces années d'études ;
- À tous ceux qui, de près ou de loin, ont contribué à l'aboutissement de ce travail.

---

## RÉSUMÉ

Ce mémoire présente la conception et la réalisation d'une application web de gestion hospitalière destinée à la Clinique GODIE, située à Antsiranana (Madagascar). L'application couvre trente modules fonctionnels : gestion des patients, des médecins, du personnel, des infirmiers, des rendez-vous, des consultations, des ordonnances, des hospitalisations, des chambres, des lits, des laboratoires, des analyses, des résultats, des médicaments, de la pharmacie, du stock, des fournisseurs, des factures, des paiements, des assurances, des services, des spécialités, des urgences, des ambulances, des utilisateurs, des rôles, des permissions, des paramètres, de la sauvegarde et du journal des activités.

Le projet a été développé avec les technologies React, TypeScript, Vite et Tailwind CSS pour le frontend, avec une architecture config-driven permettant la génération automatique des pages CRUD. La persistance des données est assurée via le localStorage du navigateur avec auto-incrémentation des identifiants.

**Mots-clés :** gestion hospitalière, application web, React, TypeScript, CRUD, Clinique GODIE, Antsiranana, Madagascar.

---

## ABSTRACT

This thesis presents the design and implementation of a web-based hospital management application for the GODIE Clinic, located in Antsiranana (Madagascar). The application covers thirty functional modules: patient management, doctors, staff, nurses, appointments, consultations, prescriptions, hospitalizations, rooms, beds, laboratories, analyses, results, medications, pharmacy, stock, suppliers, invoices, payments, insurance, services, specialties, emergencies, ambulances, users, roles, permissions, settings, backup, and activity log.

The project was developed using React, TypeScript, Vite, and Tailwind CSS for the frontend, with a config-driven architecture enabling automatic CRUD page generation. Data persistence is handled via browser localStorage with auto-incrementing identifiers.

**Keywords:** hospital management, web application, React, TypeScript, CRUD, GODIE Clinic, Antsiranana, Madagascar.

---

## TABLE DES MATIÈRES

1. Introduction générale
2. Chapitre I — Présentation de la Clinique GODIE
3. Chapitre II — Analyse de l'existant
4. Chapitre III — Étude des besoins
5. Chapitre IV — Conception UML
6. Chapitre V — Choix technologiques
7. Chapitre VI — Architecture de l'application
8. Chapitre VII — Réalisation
9. Chapitre VIII — Présentation détaillée des modules
10. Chapitre IX — Tests
11. Chapitre X — Sécurité
12. Chapitre XI — Déploiement
13. Conclusion générale
14. Bibliographie
15. Webographie
16. Annexe

---

## LISTE DES FIGURES

- **Figure 1 :** Logo de la Clinique GODIE
- **Figure 2 :** Organigramme de la Clinique GODIE
- **Figure 3 :** Diagramme de cas d'utilisation général
- **Figure 4 :** Diagramme de cas d'utilisation — Gestion des patients
- **Figure 5 :** Diagramme de classes
- **Figure 6 :** Diagramme de séquence — Prise de rendez-vous
- **Figure 7 :** Diagramme de séquence — Création d'une consultation
- **Figure 8 :** Modèle conceptuel de données (MCD)
- **Figure 9 :** Modèle logique de données (MLD)
- **Figure 10 :** Schéma de la base de données
- **Figure 11 :** Diagramme de déploiement
- **Figure 12 :** Architecture générale de l'application
- **Figure 13 :** Capture d'écran — Tableau de bord
- **Figure 14 :** Capture d'écran — Liste des patients
- **Figure 15 :** Capture d'écran — Ajout d'un patient
- **Figure 16 :** Capture d'écran — Calendrier des rendez-vous
- **Figure 17 :** Capture d'écran — Gestion des consultations
- **Figure 18 :** Capture d'écran — Gestion des médicaments
- **Figure 19 :** Capture d'écran — Rapports
- **Figure 20 :** Capture d'écran — Paramètres et sauvegarde
- **Figure 21 :** Capture d'écran — Version mobile

---

## LISTE DES TABLEAUX

- **Tableau 1 :** Acteurs du système
- **Tableau 2 :** Liste des besoins fonctionnels
- **Tableau 3 :** Liste des besoins non fonctionnels
- **Tableau 4 :** Règles de gestion métier
- **Tableau 5 :** Choix technologiques
- **Tableau 6 :** Modules de l'application
- **Tableau 7 :** Cas de tests fonctionnels
- **Tableau 8 :** Matrice de traçabilité des besoins

---

## LISTE DES ACRONYMES

| Acronyme | Signification |
|----------|--------------|
| API | Application Programming Interface |
| CRUD | Create, Read, Update, Delete |
| CSS | Cascading Style Sheets |
| CSV | Comma-Separated Values |
| HTML | HyperText Markup Language |
| JWT | JSON Web Token |
| JSON | JavaScript Object Notation |
| MCD | Modèle Conceptuel de Données |
| MLD | Modèle Logique de Données |
| MPD | Modèle Physique de Données |
| ORM | Object-Relational Mapping |
| PDF | Portable Document Format |
| PWA | Progressive Web App |
| REST | Representational State Transfer |
| SPA | Single Page Application |
| SQL | Structured Query Language |
| SVG | Scalable Vector Graphics |
| TS | TypeScript |
| UML | Unified Modeling Language |
| UX | User Experience |
| UI | User Interface |
| XSS | Cross-Site Scripting |

---

# INTRODUCTION GÉNÉRALE

## Contexte

La gestion d'un établissement de santé est une tâche complexe qui mobilise de nombreuses ressources humaines, matérielles et informationnelles. Dans le contexte malgache, et particulièrement dans la ville d'Antsiranana (Nord de Madagascar), de nombreuses cliniques privées assurent encore leur gestion au moyen de procédés manuels ou de fichiers bureautiques dispersés. Cette situation engendre des pertes de temps, des risques d'erreurs, des doublons et une difficulté à produire des rapports fiables en temps réel.

La Clinique GODIE, dirigée par Monsieur JESE Andriamaniraka Davida, est un établissement privé situé à Antsiranana qui souhaite moderniser son système d'information en adoptant une application web centralisée de gestion hospitalière.

## Problématique

Comment concevoir et réaliser une application web professionnelle, complète et sécurisée permettant de gérer de manière intégrée l'ensemble des activités de la Clinique GODIE : patients, médecins, personnel, rendez-vous, consultations, hospitalisations, laboratoire, pharmacie, facturation et urgences ?

## Objectifs

Les objectifs de ce travail sont :

1. Concevoir une architecture logicielle modulaire couvrant l'ensemble des processus métier de la clinique ;
2. Développer une interface utilisateur moderne, responsive et accessible ;
3. Implémenter un framework CRUD générique permettant d'ajouter rapidement de nouveaux modules ;
4. Assurer la persistance des données avec auto-incrémentation des identifiants ;
5. Garantir la fiabilité, la sécurité et la maintenabilité du code.

## Méthodologie

Le projet suit une démarche en cascade adaptée :

- **Analyse** : étude de l'existant et recueil des besoins ;
- **Conception** : modélisation UML (cas d'utilisation, classes, séquences) et conception de la base de données ;
- **Réalisation** : développement avec React, TypeScript, Vite et Tailwind CSS ;
- **Tests** : validation fonctionnelle de chaque module ;
- **Déploiement** : préparation pour la mise en production.

## Structure du mémoire

- **Chapitre I** présente la Clinique GODIE ;
- **Chapitre II** analyse l'existant ;
- **Chapitre III** dégage les besoins ;
- **Chapitre IV** décrit la conception UML ;
- **Chapitre V** justifie les choix technologiques ;
- **Chapitre VI** expose l'architecture ;
- **Chapitre VII** détaille la réalisation ;
- **Chapitre VIII** présente chaque module ;
- **Chapitre IX** aborde les tests ;
- **Chapitre X** traite de la sécurité ;
- **Chapitre XI** décrit le déploiement ;
- La **Conclusion** synthétise le travail et ouvre des perspectives.

---

# CHAPITRE I — PRÉSENTATION DE LA CLINIQUE GODIE

## 1.1 Présentation générale

La Clinique GODIE est un établissement de santé privé situé à Antsiranana, dans le Nord de Madagascar. Fondée en 2010, elle offre des services médicaux pluridisciplinaires à la population de la région Diana. Sa mission est de fournir des soins de qualité, accessibles et humains, en intégrant les technologies numériques au service du patient.

*[Emplacement prévu pour la Figure 1 : Logo de la Clinique GODIE]*

## 1.2 Localisation

La clinique est implantée dans le quartier d'Ambondrona, à Antsiranana. Elle dessert la ville et ses environs, ainsi que les populations du Nord de Madagascar.

## 1.3 Organigramme

La Clinique GODIE est dirigée par Monsieur JESE Andriamaniraka Davida, Directeur de l'établissement. L'organisation comprend :

- **Direction** — JESE Andriamaniraka Davida
- **Service médical** — Médecins de différentes spécialités
- **Service infirmier** — Infirmiers et aides-soignants
- **Service d'accueil** — Personnel de réception
- **Service pharmaceutique** — Pharmaciens
- **Service de laboratoire** — Techniciens de laboratoire
- **Service comptable** — Personnel administratif

*[Emplacement prévu pour la Figure 2 : Organigramme de la Clinique GODIE]*

## 1.4 Services offerts

La clinique propose les services suivants :

- Consultations externes (cardiologie, pédiatrie, neurologie, gynécologie, dermatologie, orthopédie)
- Hospitalisation
- Laboratoire d'analyses médicales
- Pharmacie
- Service d'urgences
- Service d'ambulance

## 1.5 Motivation du projet

Face à la croissance de son activité et à la diversité de ses services, la Clinique GODIE ressent le besoin de disposer d'un système d'information unifié, moderne et fiable. L'objectif est de remplacer les procédés manuels par une application web centralisée, accessible et évolutive.

---

# CHAPITRE II — ANALYSE DE L'EXISTANT

## 2.1 Méthodes de travail actuelles

Actuellement, la Clinique GODIE gère son activité au moyen de :

- **Registres papier** pour les patients et les rendez-vous ;
- **Fichiers Excel** dispersés pour le suivi des consultations et de la pharmacie ;
- **Communications orales** entre services, sans traçabilité ;
- **Factures manuelles** établies au cas par cas.

## 2.2 Limites du système actuel

| Limite | Conséquence |
|--------|-------------|
| Saisie manuelle répétitive | Risque d'erreurs et de doublons |
| Données dispersées | Difficulté de consolidation et de reporting |
| Absence de traçabilité | Perte d'historique des actions |
| Pas d'accès distant | Impossibilité de consulter les données à distance |
| Pas de sauvegarde automatique | Risque de perte de données |
| Pas de statistiques en temps réel | Pilotage difficile |

## 2.3 Propositions de solutions

Pour pallier ces limites, nous proposons une application web unique offrant :

- Une **base centralisée** des données ;
- Un **accès multi-postes** via le navigateur ;
- Des **modules intégrés** couvrant tous les processus ;
- Des **exports** PDF, Excel et impression ;
- Un **tableau de bord** avec statistiques en temps réel ;
- Un **journal des activités** pour la traçabilité.

---

# CHAPITRE III — ÉTUDE DES BESOINS

## 3.1 Acteurs du système

**Tableau 1 : Acteurs du système**

| Acteur | Description |
|--------|-------------|
| Administrateur | Accès complet à tous les modules |
| Médecin | Accès aux patients, consultations, ordonnances, hospitalisations |
| Infirmier | Accès aux patients, hospitalisations, soins |
| Réceptionniste | Accès aux patients, rendez-vous, accueil |
| Pharmacien | Accès aux médicaments, stock, fournisseurs |
| Technicien de laboratoire | Accès aux laboratoires, analyses, résultats |
| Comptable | Accès aux factures, paiements, assurances |

## 3.2 Besoins fonctionnels

**Tableau 2 : Besoins fonctionnels**

| Code | Besoin |
|------|--------|
| BF-01 | Gérer les patients (CRUD) |
| BF-02 | Gérer les médecins (CRUD) |
| BF-03 | Gérer le personnel (CRUD) |
| BF-04 | Gérer les infirmiers (CRUD) |
| BF-05 | Gérer les rendez-vous (CRUD + calendrier) |
| BF-06 | Gérer les consultations (CRUD + ordonnance) |
| BF-07 | Gérer les ordonnances (CRUD) |
| BF-08 | Gérer les hospitalisations (CRUD) |
| BF-09 | Gérer les chambres et lits (CRUD) |
| BF-10 | Gérer les laboratoires et analyses (CRUD) |
| BF-11 | Gérer les résultats d'analyses (CRUD) |
| BF-12 | Gérer les médicaments et le stock (CRUD + alertes) |
| BF-13 | Gérer les fournisseurs (CRUD) |
| BF-14 | Gérer les factures et paiements (CRUD) |
| BF-15 | Gérer les assurances (CRUD) |
| BF-16 | Gérer les services et spécialités (CRUD) |
| BF-17 | Gérer les urgences et ambulances (CRUD) |
| BF-18 | Gérer les utilisateurs et rôles (CRUD) |
| BF-19 | Afficher un tableau de bord avec statistiques |
| BF-20 | Générer des rapports (PDF, Excel, impression) |
| BF-21 | Sauvegarder et restaurer les données |
| BF-22 | Journaliser les activités |

## 3.3 Besoins non fonctionnels

**Tableau 3 : Besoins non fonctionnels**

| Code | Besoin |
|------|--------|
| BNF-01 | Interface responsive (ordinateur, tablette, mobile) |
| BNF-02 | Mode clair / mode sombre |
| BNF-03 | Performances : temps de réponse < 1s |
| BNF-04 | Validation des formulaires côté client |
| BNF-05 | Notifications de succès et d'erreur |
| BNF-06 | Confirmation avant suppression |
| BNF-07 | Code maintenable et modulaire |
| BNF-08 | Accessibilité (contraste, navigation clavier) |

---

# CHAPITRE IV — CONCEPTION UML

## 4.1 Diagramme de cas d'utilisation

*[Emplacement prévu pour la Figure 3 : Diagramme de cas d'utilisation général]*

Le système identifie les cas d'utilisation suivants par acteur :

- **Administrateur** : gère tous les modules, paramètres, sauvegarde, utilisateurs
- **Médecin** : consulte patients, crée consultations et ordonnances, gère hospitalisations
- **Réceptionniste** : enregistre patients, gère rendez-vous
- **Pharmacien** : gère médicaments, stock, fournisseurs
- **Technicien labo** : gère analyses et résultats
- **Comptable** : gère factures et paiements

*[Emplacement prévu pour la Figure 4 : Diagramme de cas d'utilisation — Gestion des patients]*

## 4.2 Diagramme de classes

*[Emplacement prévu pour la Figure 5 : Diagramme de classes]*

Les principales classes du système sont :

- **Patient** (id, prénom, nom, dateNaissance, sexe, téléphone, adresse, groupeSanguin)
- **Doctor** (id, prénom, nom, spécialité, téléphone, disponible)
- **Staff** (id, prénom, nom, fonction, service)
- **Nurse** (id, prénom, nom, service, quart)
- **Appointment** (id, patient, médecin, date, heure, motif, statut)
- **Consultation** (id, patient, médecin, date, symptômes, diagnostic, traitement, ordonnance)
- **Prescription** (id, patient, médecin, date, médicaments)
- **Hospitalization** (id, patient, lit, médecin, dateAdmission, dateSortie, motif, statut)
- **Room** (id, numéro, type, étage, capacité)
- **Bed** (id, chambre, numéro, statut)
- **Laboratory** (id, nom, emplacement, responsable)
- **Analysis** (id, nom, catégorie, prix, laboratoire)
- **Result** (id, analyse, patient, date, valeur, statut)
- **Medication** (id, nom, catégorie, quantité, prix, expiration, fournisseur)
- **Supplier** (id, nom, contact, téléphone)
- **Stock** (id, médicament, quantité, seuilMin, emplacement)
- **Invoice** (id, patient, date, montant, statut, assurance)
- **Payment** (id, facture, date, montant, méthode)
- **Insurance** (id, nom, couverture, téléphone)
- **Emergency** (id, patient, date, gravité, description, statut)
- **Ambulance** (id, immatriculation, chauffeur, statut)
- **User** (id, identifiant, nom, email, rôle, actif)
- **Role** (id, nom, description, permissions)
- **ActivityLog** (id, action, module, détail, utilisateur)

## 4.3 Diagrammes de séquence

*[Emplacement prévu pour la Figure 6 : Diagramme de séquence — Prise de rendez-vous]*

1. L'utilisateur sélectionne un patient et un médecin
2. Le système vérifie la disponibilité
3. L'utilisateur saisit la date et l'heure
4. Le système enregistre le rendez-vous (auto-incrément de l'ID)
5. Le système affiche une notification de succès

*[Emplacement prévu pour la Figure 7 : Diagramme de séquence — Création d'une consultation]*

## 4.4 Modèle conceptuel de données

*[Emplacement prévu pour la Figure 8 : Modèle conceptuel de données (MCD)]*

Les entités principales et leurs associations :

- Un **Patient** peut avoir plusieurs **Rendez-vous** (1..N)
- Un **Médecin** peut avoir plusieurs **Rendez-vous** (1..N)
- Un **Patient** peut avoir plusieurs **Consultations** (1..N)
- Une **Consultation** est réalisée par un **Médecin** (1..1)
- Une **Hospitalisation** concerne un **Patient** et un **Lit** (1..1)
- Une **Chambre** contient plusieurs **Lits** (1..N)
- Une **Analyse** appartient à un **Laboratoire** (N..1)
- Un **Résultat** concerne une **Analyse** et un **Patient** (1..1)
- Un **Médicament** est fourni par un **Fournisseur** (N..1)
- Une **Facture** concerne un **Patient** (N..1)
- Un **Paiement** concerne une **Facture** (N..1)

## 4.5 Modèle logique de données

*[Emplacement prévu pour la Figure 9 : Modèle logique de données (MLD)]*

Conversion du MCD en relations avec clés primaires et étrangères :

- **Patient** (id_patient PK, prénom, nom, date_naissance, sexe, téléphone, adresse, groupe_sanguin, email, notes, created_at)
- **Doctor** (id_doctor PK, prénom, nom, spécialité, téléphone, email, disponible, horaires, created_at)
- **Appointment** (id_appointment PK, #id_patient FK, #id_doctor FK, date, heure, motif, statut, created_at)
- **Consultation** (id_consultation PK, #id_patient FK, #id_doctor FK, date, symptômes, diagnostic, traitement, ordonnance, notes, created_at)
- **Room** (id_room PK, numéro, type, étage, capacité, created_at)
- **Bed** (id_bed PK, #id_room FK, numéro, statut, created_at)
- **Hospitalization** (id_hosp PK, #id_patient FK, #id_bed FK, #id_doctor FK, date_admission, date_sortie, motif, statut, created_at)
- **Laboratory** (id_lab PK, nom, emplacement, téléphone, responsable, created_at)
- **Analysis** (id_analysis PK, nom, catégorie, prix, délai, #id_lab FK, created_at)
- **Result** (id_result PK, #id_analysis FK, #id_patient FK, date, valeur, statut, notes, created_at)
- **Supplier** (id_supplier PK, nom, contact, téléphone, email, adresse, created_at)
- **Medication** (id_med PK, nom, catégorie, quantité, prix, expiration, #id_supplier FK, created_at)
- **Invoice** (id_invoice PK, #id_patient FK, date, montant, statut, #id_insurance FK, created_at)
- **Payment** (id_payment PK, #id_invoice FK, date, montant, méthode, created_at)

*[Emplacement prévu pour la Figure 10 : Schéma de la base de données]*

---

# CHAPITRE V — CHOIX TECHNOLOGIQUES

## 5.1 Frontend

**Tableau 5 : Choix technologiques**

| Technologie | Rôle | Justification |
|-------------|------|---------------|
| React 18 | Bibliothèque UI | Composants réutilisables, écosystème mature, performance |
| TypeScript | Langage | Typage statique, détection d'erreurs à la compilation |
| Vite 5 | Build tool | Démarrage rapide, HMR instantané, build optimisé |
| Tailwind CSS 3 | Framework CSS | Design system utilitaire, responsive natif, mode sombre |
| Chart.js | Graphiques | Visualisations interactives pour le tableau de bord |
| react-chartjs-2 | Wrapper React | Intégration Chart.js dans React |
| jsPDF | Génération PDF | Export d'ordonnances et de rapports |
| qrcode.react | QR Code | Génération de QR codes patients |
| lucide-react | Icônes | Bibliothèque d'icônes moderne et cohérente |
| react-router-dom 7 | Routage | Navigation entre pages (SPA) |

## 5.2 Persistance

La persistance des données est assurée par le **localStorage** du navigateur, avec :

- Un compteur d'auto-incrément persistant par collection (`<key>__seq`)
- Sérialisation JSON des enregistrements
- Possibilité d'export/import de sauvegarde complète

Ce choix permet une démonstration fonctionnelle sans dépendance serveur, tout en restant adaptable à une API REST (PostgreSQL/MongoDB) en production.

## 5.3 Justification globale

Le choix d'une architecture **config-driven** (registre de ressources) permet :

- D'ajouter un nouveau module en quelques lignes de configuration ;
- De générer automatiquement la table, les filtres, la pagination, les modales et les exports ;
- De garantir une cohérence d'interface entre tous les modules.

---

# CHAPITRE VI — ARCHITECTURE DE L'APPLICATION

## 6.1 Architecture générale

*[Emplacement prévu pour la Figure 12 : Architecture générale de l'application]*

L'application suit une architecture **Single Page Application (SPA)** :

```
┌─────────────────────────────────────┐
│           Navigateur (Client)        │
│  ┌───────────────────────────────┐  │
│  │     React + TypeScript        │  │
│  │  ┌──────────┐  ┌───────────┐  │  │
│  │  │  Pages   │  │ Components│  │  │
│  │  └──────────┘  └───────────┘  │  │
│  │  ┌──────────┐  ┌───────────┐  │  │
│  │  │  Hooks   │  │ Services  │  │  │
│  │  └──────────┘  └───────────┘  │  │
│  │  ┌──────────────────────────┐ │  │
│  │  │   useCollection (Store)  │ │  │
│  │  └──────────────────────────┘ │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │      localStorage (Data)      │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

## 6.2 Couches

1. **Présentation** : composants React, pages, layout (Sidebar + Topbar)
2. **Logique métier** : hooks (`useCollection`, `useRefStore`), services (`resources.ts`)
3. **Persistance** : `localStorage` avec auto-incrément

## 6.3 Pattern config-driven

Le registre `RESOURCES` (dans `src/services/resources.ts`) définit pour chaque module :

- **key** : clé de stockage
- **label / singular** : libellés
- **icon** : icône lucide-react
- **group** : groupe fonctionnel de navigation
- **fields** : champs du formulaire (type, requis, options, références)
- **columns** : colonnes du tableau (type, badge, référence)
- **searchFields** : champs de recherche
- **filters** : filtres déroulants

Le composant `CrudPage` consomme cette configuration et génère automatiquement toute l'interface.

---

# CHAPITRE VII — RÉALISATION

## 7.1 Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── CrudPage.tsx     # Page CRUD générique
│   ├── Sidebar.tsx      # Navigation + topbar
│   ├── Modal.tsx        # Modales et confirmations
│   ├── Toast.tsx        # Notifications
│   └── ui.tsx           # StatCards, PageHeader, EmptyState
├── pages/               # Pages personnalisées
│   ├── Dashboard.tsx
│   ├── Appointments.tsx
│   ├── Reports.tsx
│   ├── Settings.tsx
│   └── NotFound.tsx
├── hooks/
│   ├── useCollection.ts # Store + auto-incrément
│   └── useRefStore.ts   # Résolution références
├── services/
│   └── resources.ts     # Registre des 30 modules
├── types/
│   └── index.ts         # Types d'entités
├── utils/
│   └── format.ts        # Dates, monnaie, CSV
├── App.tsx              # Routage
└── index.css            # Styles globaux
```

## 7.2 Store de données

Le hook `useCollection<T>` fournit :

- `items` : liste des enregistrements
- `add(data)` : ajout avec auto-incrément de l'ID
- `update(id, patch)` : modification partielle
- `remove(id)` : suppression
- `reset()` : réinitialisation de la collection

L'ID est géré par un compteur persistant (`<key>__seq`) dans le localStorage, garantissant des identifiants uniques à partir de 1.

## 7.3 Framework CRUD

Le composant `CrudPage` reçoit une `ResourceDef` et génère :

- Un en-tête de page avec bouton d'ajout
- Une barre d'outils (recherche, filtres, exports)
- Un tableau paginé avec badges et références
- Des modales d'ajout/édition avec validation
- Une modale de détail
- Une confirmation de suppression
- Des exports PDF, Excel (CSV) et impression

## 7.4 Design system

Le design system repose sur :

- **Tailwind CSS** avec palette personnalisée (primary, health, accent, warning, error)
- **Polices** : Inter (corps) + Plus Jakarta Sans (titres)
- **Composants** : `.card`, `.btn-primary`, `.btn-secondary`, `.input`, `.badge`
- **Mode sombre** via la classe `dark` sur `<html>`
- **Animations** : fade-in, slide-up, scale-in, hover

---

# CHAPITRE VIII — PRÉSENTATION DÉTAILLÉE DES MODULES

## 8.1 Tableau de bord

*[Emplacement prévu pour la Figure 13 : Capture d'écran — Tableau de bord]*

Le tableau de bord affiche :

- 8 cartes statistiques (patients, médecins, RDV du jour, consultations, hospitalisations, médicaments, factures, RDV totaux)
- Un graphique en courbe des consultations mensuelles
- Un diagramme circulaire des spécialités
- Un diagramme en barres de la répartition par sexe
- La liste des rendez-vous récents
- Une alerte de stock faible

Lorsqu'aucune donnée n'est enregistrée, un message clair s'affiche.

## 8.2 Gestion des patients

*[Emplacement prévu pour la Figure 14 : Capture d'écran — Liste des patients]*

Module CRUD complet avec champs : prénom, nom, date de naissance, sexe, téléphone, adresse, groupe sanguin, email, notes. Recherche par nom et téléphone. Export PDF/Excel/impression.

*[Emplacement prévu pour la Figure 15 : Capture d'écran — Ajout d'un patient]*

## 8.3 Gestion des médecins

CRUD avec spécialité, disponibilité, horaires. Filtre par disponibilité.

## 8.4 Gestion du personnel et des infirmiers

CRUD pour le personnel administratif et les infirmiers (service, quart de travail).

## 8.5 Gestion des rendez-vous

*[Emplacement prévu pour la Figure 16 : Capture d'écran — Calendrier des rendez-vous]*

Calendrier mensuel interactif avec :
- Navigation entre mois
- Sélection d'une date
- Liste des RDV du jour
- Création, modification, confirmation, annulation, suppression

## 8.6 Gestion des consultations

*[Emplacement prévu pour la Figure 17 : Capture d'écran — Gestion des consultations]*

Dossier médical numérique : symptômes, diagnostic, traitement, ordonnance, notes. Liaison patient et médecin.

## 8.7 Gestion des ordonnances

CRUD des ordonnances avec lien patient/médecin et médicaments prescrits.

## 8.8 Gestion des hospitalisations, chambres et lits

- **Hospitalisations** : admission, sortie, motif, statut, lien patient/lit/médecin
- **Chambres** : numéro, type, étage, capacité
- **Lits** : numéro, statut (libre/occupé/maintenance), lien chambre

## 8.9 Gestion du laboratoire

- **Laboratoires** : nom, emplacement, responsable
- **Analyses** : nom, catégorie, prix, délai, laboratoire
- **Résultats** : analyse, patient, date, valeur, statut

## 8.10 Gestion de la pharmacie

*[Emplacement prévu pour la Figure 18 : Capture d'écran — Gestion des médicaments]*

- **Médicaments** : nom, catégorie, quantité, prix, expiration, fournisseur
- **Fournisseurs** : nom, contact, téléphone, email
- **Stock** : médicament, quantité, seuil minimum, emplacement

## 8.11 Gestion de la facturation

- **Factures** : patient, date, montant, statut, assurance
- **Paiements** : facture, date, montant, méthode
- **Assurances** : nom, couverture, téléphone

## 8.12 Gestion des services et spécialités

Référentiels pour les services médicaux et les spécialités.

## 8.13 Gestion des urgences et ambulances

- **Urgences** : patient, date, gravité, description, statut
- **Ambulances** : immatriculation, chauffeur, statut

## 8.14 Gestion des utilisateurs et rôles

- **Utilisateurs** : identifiant, nom, email, rôle, actif
- **Rôles** : nom, description, permissions
- **Journal des activités** : action, module, détail, utilisateur

## 8.15 Paramètres et sauvegarde

*[Emplacement prévu pour la Figure 20 : Capture d'écran — Paramètres et sauvegarde]*

- Informations de la clinique (nom, ville, directeur, contact)
- Export de sauvegarde JSON
- Restauration de sauvegarde
- Réinitialisation de la base de données

---

# CHAPITRE IX — TESTS

## 9.1 Stratégie de test

Les tests ont été réalisés de manière manuelle et systématique sur chaque module, en suivant une grille de cas de tests.

## 9.2 Cas de tests fonctionnels

**Tableau 7 : Cas de tests fonctionnels**

| ID | Module | Cas de test | Résultat attendu | Résultat obtenu |
|----|--------|-------------|------------------|------------------|
| T-01 | Patients | Ajouter un patient | Patient créé, ID=1 | OK |
| T-02 | Patients | Modifier un patient | Données mises à jour | OK |
| T-03 | Patients | Supprimer un patient | Confirmation puis suppression | OK |
| T-04 | Patients | Recherche par nom | Filtrage instantané | OK |
| T-05 | Médecins | Ajouter un médecin | Médecin créé | OK |
| T-06 | Médecins | Filtrer par disponibilité | Filtre appliqué | OK |
| T-07 | RDV | Créer un RDV | RDV créé sur le calendrier | OK |
| T-08 | RDV | Confirmer un RDV | Statut mis à jour | OK |
| T-09 | RDV | Annuler un RDV | Statut « Annulé » | OK |
| T-10 | Consultations | Créer une consultation | Consultation enregistrée | OK |
| T-11 | Médicaments | Ajouter un médicament | Médicament créé | OK |
| T-12 | Médicaments | Alerte stock faible | Alerte affichée | OK |
| T-13 | Factures | Créer une facture | Facture créée | OK |
| T-14 | Rapports | Export PDF | Fichier PDF généré | OK |
| T-15 | Rapports | Export Excel | Fichier CSV généré | OK |
| T-16 | Paramètres | Export sauvegarde | Fichier JSON généré | OK |
| T-17 | Paramètres | Réinitialiser base | Données effacées, ID=1 | OK |
| T-18 | Navigation | Mode sombre | Thème basculé | OK |
| T-19 | Navigation | Responsive mobile | Interface adaptée | OK |
| T-20 | Pagination | Naviguer entre pages | Pages correctes | OK |

## 9.3 Matrice de traçabilité

**Tableau 8 : Matrice de traçabilité des besoins**

| Besoin | Module | Statut |
|--------|--------|--------|
| BF-01 | Patients | Couvert |
| BF-02 | Médecins | Couvert |
| BF-05 | Rendez-vous | Couvert |
| BF-06 | Consultations | Couvert |
| BF-12 | Médicaments | Couvert |
| BF-19 | Tableau de bord | Couvert |
| BF-20 | Rapports | Couvert |
| BF-21 | Sauvegarde | Couvert |
| BNF-01 | Responsive | Couvert |
| BNF-02 | Mode sombre | Couvert |

---

# CHAPITRE X — SÉCURITÉ

## 10.1 Validation des données

Tous les formulaires effectuent une validation côté client :

- Champs obligatoires vérifiés avant soumission
- Types de données respectés (date, nombre, email)
- Messages d'erreur affichés en cas de saisie invalide

## 10.2 Protection XSS

React échappe automatiquement le contenu JSX, empêchant l'injection de scripts. Aucune utilisation de `dangerouslySetInnerHTML`.

## 10.3 Protection CSRF

L'application n'utilisant pas de requêtes HTTP cross-site (pas de backend dans la version de démonstration), le risque CSRF est nul. En production avec API REST, un jeton CSRF serait ajouté aux en-têtes.

## 10.4 Protection injection SQL

L'application n'utilise pas de SQL direct. En production avec PostgreSQL, des requêtes paramétrées et un ORM seraient utilisés.

## 10.5 Journalisation

Le module **Journal des activités** permet de tracer les actions effectuées (action, module, détail, utilisateur, horodatage).

## 10.6 Gestion des rôles

Le module **Utilisateurs** et **Rôles** permet de définir des profils (Administrateur, Médecin, Infirmier, Réception, Pharmacien, Laboratoire, Comptable) avec des permissions.

## 10.7 Sauvegarde

Le module **Paramètres** permet d'exporter une sauvegarde JSON complète et de la restaurer, garantissant la résilience des données.

---

# CHAPITRE XI — DÉPLOIEMENT

## 11.1 Environnement de développement

```bash
npm install
npm run dev
```

Le serveur de développement Vite est accessible sur `http://localhost:5173`.

## 11.2 Build de production

```bash
npm run build
npm run preview
```

Le build est généré dans le dossier `dist/`, optimisé et minifié.

## 11.3 Déploiement statique

Le dossier `dist/` peut être déployé sur tout hébergeur statique :

- Vercel
- Netlify
- GitHub Pages
- Serveur Nginx / Apache

## 11.4 Diagramme de déploiement

*[Emplacement prévu pour la Figure 11 : Diagramme de déploiement]*

```
┌──────────────┐     ┌──────────────┐
│  Navigateur  │────▶│   Serveur    │
│   (Client)  │     │   statique   │
│              │     │  (dist/)     │
└──────────────┘     └──────────────┘
```

## 11.5 CI/CD

Un workflow GitHub Actions (`.github/workflows/ci.yml`) exécute à chaque push :

- Installation des dépendances
- Vérification des types (`typecheck`)
- Lint
- Build de production
- Upload des artefacts

---

# CONCLUSION GÉNÉRALE

Ce mémoire a présenté la conception et la réalisation d'une application web de gestion hospitalière pour la Clinique GODIE à Antsiranana. Le projet couvre 30 modules fonctionnels, depuis la gestion des patients jusqu'au journal des activités, en passant par les rendez-vous, consultations, hospitalisations, laboratoire, pharmacie, facturation et urgences.

L'architecture config-driven, basée sur un registre de ressources, a permis de développer un framework CRUD générique qui génère automatiquement l'ensemble des interfaces. Cette approche garantit une cohérence d'interface, une maintenabilité élevée et une évolutivité : ajouter un nouveau module se résume à quelques lignes de configuration.

Les technologies modernes — React, TypeScript, Vite, Tailwind CSS, Chart.js — ont permis de réaliser une application performante, responsive et professionnelle, prête pour une démonstration devant un jury universitaire.

**Perspectives d'évolution :**

- Intégration d'un backend Node.js/Express avec PostgreSQL ou MongoDB
- Authentification JWT avec gestion des sessions
- Application mobile (React Native)
- Notifications push et SMS (rappels de rendez-vous)
- Intégration de l'intelligence artificielle pour l'aide au diagnostic
- Interconnexion avec des dispositifs médicaux (IoT)

Ce projet démontre qu'il est possible, avec des technologies web modernes et une architecture bien pensée, de répondre aux besoins réels d'un établissement de santé malgache tout en produisant un logiciel de qualité professionnelle.

---

# BIBLIOGRAPHIE

1. BOOCH, G., RUMBAUGH, J., JACOBSON, I. (2005). *The Unified Modeling Language User Guide*. Addison-Wesley.
2. COMEAU, T. (2020). *React.js: Theory and Practice*. O'Reilly Media.
3. FLANAGAN, D. (2011). *JavaScript: The Definitive Guide*. O'Reilly Media.
4. KROENKE, D. (2013). *Database Processing: Fundamentals, Design and Implementation*. Pearson.
5. LARMAN, C. (2004). *Applying UML and Patterns: An Introduction to Object-Oriented Analysis and Design*. Prentice Hall.
6. PRESSMAN, R. (2014). *Software Engineering: A Practitioner's Approach*. McGraw-Hill.
7. SOMMERVILLE, I. (2015). *Software Engineering*. Pearson.

---

# WEBOGRAPHIE

1. React — Documentation officielle : https://react.dev
2. TypeScript — Documentation officielle : https://www.typescriptlang.org
3. Vite — Guide officiel : https://vitejs.dev
4. Tailwind CSS — Documentation : https://tailwindcss.com
5. Chart.js — Documentation : https://www.chartjs.org
6. jsPDF — Documentation : https://github.com/parallax/jsPDF
7. Lucide Icons : https://lucide.dev
8. MDN Web Docs : https://developer.mozilla.org
9. React Router : https://reactrouter.com

---

# ANNEXE

## Annexe A — Liste complète des modules

**Tableau 6 : Modules de l'application**

| N° | Module | Groupe | Clé |
|----|--------|--------|-----|
| 1 | Patients | Patients & Soins | godie_patients |
| 2 | Médecins | Personnel | godie_doctors |
| 3 | Personnel | Personnel | godie_staff |
| 4 | Infirmiers | Personnel | godie_nurses |
| 5 | Rendez-vous | Consultations | godie_appointments |
| 6 | Consultations | Consultations | godie_consultations |
| 7 | Ordonnances | Consultations | godie_prescriptions |
| 8 | Hospitalisations | Hospitalisation | godie_hospitalizations |
| 9 | Chambres | Hospitalisation | godie_rooms |
| 10 | Lits | Hospitalisation | godie_beds |
| 11 | Laboratoires | Laboratoire | godie_laboratories |
| 12 | Analyses | Laboratoire | godie_analyses |
| 13 | Résultats | Laboratoire | godie_results |
| 14 | Médicaments | Pharmacie | godie_medications |
| 15 | Fournisseurs | Pharmacie | godie_suppliers |
| 16 | Stock | Pharmacie | godie_stock |
| 17 | Factures | Facturation | godie_invoices |
| 18 | Paiements | Facturation | godie_payments |
| 19 | Assurances | Facturation | godie_insurance |
| 20 | Services | Référentiels | godie_services |
| 21 | Spécialités | Référentiels | godie_specialties |
| 22 | Urgences | Urgences | godie_emergencies |
| 23 | Ambulances | Urgences | godie_ambulances |
| 24 | Utilisateurs | Sécurité | godie_users |
| 25 | Rôles | Sécurité | godie_roles |
| 26 | Journal des activités | Sécurité | godie_activity |

## Annexe B — Règles de gestion métier

**Tableau 4 : Règles de gestion**

| Règle | Description |
|-------|-------------|
| RG-01 | L'ID de chaque enregistrement est auto-incrémenté à partir de 1 |
| RG-02 | La suppression d'un enregistrement est précédée d'une confirmation |
| RG-03 | Les champs obligatoires sont validés avant soumission |
| RG-04 | Le statut d'un rendez-vous peut être : en attente, confirmé, annulé |
| RG-05 | Le statut d'un lit peut être : libre, occupé, maintenance |
| RG-06 | Une alerte de stock faible s'affiche si quantité ≤ seuil minimum |
| RG-07 | La base de données démarre vide à l'installation |
| RG-08 | La réinitialisation efface toutes les données et remet les ID à 1 |

## Annexe C — Scripts npm

| Script | Commande | Description |
|--------|---------|-------------|
| dev | `npm run dev` | Serveur de développement |
| build | `npm run build` | Build de production |
| preview | `npm run preview` | Prévisualisation du build |
| typecheck | `npm run typecheck` | Vérification TypeScript |
| lint | `npm run lint` | Analyse ESLint |

---

*Fin du mémoire*
