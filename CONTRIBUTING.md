# Guide de contribution — Clinique GODIE

Merci de votre intérêt pour contribuer à ce projet. Ce document décrit le processus à suivre.

## Processus

1. **Forkez** le dépôt puis créez votre branche :
   ```bash
   git checkout -b feature/nom-fonctionnalite
   ```

2. **Développez** en respectant les conventions existantes :
   - TypeScript strict
   - Composants fonctionnels React
   - Classes Tailwind CSS
   - Pas de `any` explicite — typer toutes les variables et paramètres

3. **Vérifiez** votre code avant de soumettre :
   ```bash
   npm run typecheck
   npm run lint
   npm run build
   ```

4. **Commitez** avec un message clair (français ou anglais) :
   ```bash
   git commit -m "Ajout du module de gestion des ambulances"
   ```

5. **Poussez** et ouvrez une **Pull Request** décrivant :
   - Le problème résolu ou la fonctionnalité ajoutée
   - Les changements effectués
   - Les captures d'écran (si interface modifiée)

## Conventions de code

- **Nommage** : `PascalCase` pour les composants, `camelCase` pour les fonctions et variables
- **Imports** : utiliser l'alias `@/` (ex. `@/components/Modal`)
- **Fichiers** : un composant par fichier, organisé par cohésion
- **Commentaires** : uniquement pour expliquer le *pourquoi*, jamais le *quoi*
- **Aucune donnée de démonstration** : les collections démarrent vides

## Structure des modules

Tout nouveau module CRUD s'ajoute dans `src/services/resources.ts` via un objet `ResourceDef` — aucune page dédiée à créer. Le framework `CrudPage` génère automatiquement la table, la recherche, les filtres, la pagination, les modales d'ajout/édition et les exports.

## Signaler un bug

Ouvrez une *Issue* avec :
- Description du problème
- Étapes pour reproduire
- Comportement attendu vs. observé
- Navigateur et système utilisés
