const PptxGenJS = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

const FIG = path.join(__dirname, '..', 'memoire', 'figures');
const OUT = path.join(__dirname, '..', 'memoire', 'Soutenance_Clinique_GODIE.pptx');

const pptx = new PptxGenJS();

// ---- THEME CONSTANTS ----
const COLORS = {
  primary: '2563EB',
  primaryDark: '1E40AF',
  health: '059669',
  accent: '0D9488',
  warning: 'D97706',
  error: 'DC2626',
  bg: 'F8FAFC',
  bgDark: '0F172A',
  white: 'FFFFFF',
  text: '1E293B',
  textLight: '64748B',
  textWhite: 'F1F5F9',
  border: 'E2E8F0',
  slideBg: 'FFFFFF',
};

const FONT = { title: 'Plus Jakarta Sans', body: 'Inter' };

// ---- HELPER FUNCTIONS ----
function imgBase64(filename) {
  const p = path.join(FIG, filename);
  if (!fs.existsSync(p)) return null;
  const data = fs.readFileSync(p);
  return 'image/png;base64,' + data.toString('base64');
}

function addSlideLayout(slide, pageNum, totalPages) {
  slide.background = { color: COLORS.slideBg };
  // Bottom bar
  slide.addShape('rect', { x: 0, y: 7.0, w: 13.33, h: 0.5, fill: { color: COLORS.primary } });
  // Page number
  slide.addText(`${pageNum} / ${totalPages}`, {
    x: 11.5, y: 7.05, w: 1.5, h: 0.4,
    fontSize: 9, color: COLORS.textWhite, fontFace: FONT.body, align: 'right',
  });
  // Footer text
  slide.addText('JESE Andriamaniraka Davida — Licence 3 Informatique — Université d\'Antsiranana', {
    x: 0.3, y: 7.05, w: 10, h: 0.4,
    fontSize: 8, color: COLORS.textWhite, fontFace: FONT.body,
  });
}

function addSectionNumber(slide, num, title) {
  // Left accent bar
  slide.addShape('rect', { x: 0, y: 0, w: 0.15, h: 7.5, fill: { color: COLORS.primary } });
  // Number badge
  slide.addShape('roundRect', { x: 0.5, y: 0.4, w: 0.8, h: 0.8, fill: { color: COLORS.primary }, rectRadius: 0.1 });
  slide.addText(String(num), {
    x: 0.5, y: 0.4, w: 0.8, h: 0.8,
    fontSize: 28, color: COLORS.white, fontFace: FONT.title, align: 'center', valign: 'middle',
  });
  // Title
  slide.addText(title, {
    x: 1.5, y: 0.4, w: 11, h: 0.8,
    fontSize: 28, color: COLORS.text, fontFace: FONT.title, bold: true, valign: 'middle',
  });
  // Divider line
  slide.addShape('line', { x: 0.5, y: 1.35, w: 12.3, h: 0, line: { color: COLORS.border, width: 1.5 } });
}

const TOTAL = 13;

// ============================================================
// SLIDE 1 — PAGE DE GARDE
// ============================================================
{
  const s = pptx.addSlide();
  s.background = { color: COLORS.bgDark };

  // Decorative shapes
  s.addShape('rect', { x: 0, y: 0, w: 13.33, h: 0.06, fill: { color: COLORS.primary } });
  s.addShape('rect', { x: 0, y: 7.44, w: 13.33, h: 0.06, fill: { color: COLORS.health } });

  // Logo
  const logo = imgBase64('fig01_logo.png');
  if (logo) {
    s.addImage({ data: logo, x: 5.67, y: 0.6, w: 2, h: 2, sizing: { type: 'contain', w: 2, h: 2 } });
  }

  // University info
  s.addText('RÉPUBLIQUE DE MADAGASCAR', { x: 0, y: 2.7, w: 13.33, h: 0.35, fontSize: 11, color: COLORS.textLight, fontFace: FONT.body, align: 'center' });
  s.addText('Université d\'Antsiranana — Faculté des Sciences', { x: 0, y: 3.0, w: 13.33, h: 0.35, fontSize: 12, color: COLORS.textWhite, fontFace: FONT.body, align: 'center' });
  s.addText('Département Informatique — Licence Professionnelle', { x: 0, y: 3.3, w: 13.33, h: 0.35, fontSize: 11, color: COLORS.textLight, fontFace: FONT.body, align: 'center' });

  // Title
  s.addShape('roundRect', { x: 2.5, y: 3.8, w: 8.33, h: 1.8, fill: { color: COLORS.primaryDark }, rectRadius: 0.15 });
  s.addText('Conception et Réalisation\nd\'une Application Web de Gestion Hospitalière', {
    x: 2.5, y: 3.8, w: 8.33, h: 1.2,
    fontSize: 24, color: COLORS.white, fontFace: FONT.title, bold: true, align: 'center', valign: 'middle',
  });
  s.addText('Cas de la Clinique GODIE à Antsiranana', {
    x: 2.5, y: 4.9, w: 8.33, h: 0.5,
    fontSize: 14, color: COLORS.textWhite, fontFace: FONT.body, align: 'center', italic: true,
  });

  // Author
  s.addText('Présenté par : JESE Andriamaniraka Davida', { x: 0, y: 5.8, w: 13.33, h: 0.35, fontSize: 13, color: COLORS.textWhite, fontFace: FONT.body, align: 'center', bold: true });
  s.addText('Année universitaire 2024–2025', { x: 0, y: 6.15, w: 13.33, h: 0.35, fontSize: 12, color: COLORS.textLight, fontFace: FONT.body, align: 'center' });
  s.addText('Antsiranana, Madagascar', { x: 0, y: 6.5, w: 13.33, h: 0.35, fontSize: 12, color: COLORS.textLight, fontFace: FONT.body, align: 'center' });

  s.addNotes({
    text: `Bonjour Mesdames, Messieurs les membres du jury.

Je m'appelle JESE Andriamaniraka Davida, étudiant en Licence Professionnelle Informatique à l'Université d'Antsiranana. J'ai l'honneur de vous présenter aujourd'hui mon mémoire de fin d'études intitulé « Conception et Réalisation d'une Application Web de Gestion Hospitalière — Cas de la Clinique GODIE à Antsiranana ».

Ce projet a été réalisé sous la direction de mon encadreur, et il a pour objectif de digitaliser la gestion d'une clinique privée de notre ville.

Je vous remercie de votre attention et je vous propose de découvrir ce projet en une présentation de 11 minutes, divisée en 13 diapositives.

Commençons par la présentation de la clinique.`
  });
}

// ============================================================
// SLIDE 2 — PRÉSENTATION DE LA CLINIQUE GODIE
// ============================================================
{
  const s = pptx.addSlide();
  addSlideLayout(s, 2, TOTAL);
  addSectionNumber(s, 1, 'Présentation de la Clinique GODIE');

  // Left: text
  s.addText([
    { text: 'Établissement de santé privé fondé en 2010', options: { fontSize: 14, color: COLORS.text, bold: true, fontFace: FONT.body } },
    { text: '\n\n', options: { fontSize: 10 } },
    { text: '• Située à Ambondrona, Antsiranana (région Diana)\n', options: { fontSize: 12, color: COLORS.text, fontFace: FONT.body } },
    { text: '• Dirigée par M. JESE Andriamaniraka Davida\n', options: { fontSize: 12, color: COLORS.text, fontFace: FONT.body } },
    { text: '• 6 services : consultations, hospitalisation, laboratoire, pharmacie, urgences, ambulance\n', options: { fontSize: 12, color: COLORS.text, fontFace: FONT.body } },
    { text: '• Spécialités : cardiologie, pédiatrie, neurologie, gynécologie, dermatologie, orthopédie', options: { fontSize: 12, color: COLORS.text, fontFace: FONT.body } },
  ], { x: 0.5, y: 1.6, w: 6, h: 4.5, valign: 'top' });

  // Right: organigramme
  const org = imgBase64('fig02_organigramme.png');
  if (org) {
    s.addImage({ data: org, x: 7, y: 1.6, w: 5.8, h: 4.5, sizing: { type: 'contain', w: 5.8, h: 4.5 } });
  }

  s.addNotes({
    text: `La Clinique GODIE est un établissement de santé privé fondé en 2010, situé dans le quartier d'Ambondrona à Antsiranana, dans le Nord de Madagascar. Elle est dirigée par Monsieur JESE Andriamaniraka Davida.

La clinique offre six services principaux : les consultations externes avec plusieurs spécialités, l'hospitalisation, le laboratoire d'analyses, la pharmacie, le service des urgences et le service d'ambulance.

L'organigramme que vous voyez à droite montre la structure hiérarchique : la Direction en haut, puis les services médical, infirmier, d'accueil, pharmaceutique, de laboratoire et comptable.

Cette organisation est importante car elle détermine les acteurs qui utiliseront l'application. Passons maintenant au contexte et à la problématique.`
  });
}

// ============================================================
// SLIDE 3 — CONTEXTE ET PROBLÉMATIQUE
// ============================================================
{
  const s = pptx.addSlide();
  addSlideLayout(s, 3, TOTAL);
  addSectionNumber(s, 2, 'Contexte et Problématique');

  // Problem cards
  const problems = [
    { icon: '📋', title: 'Registres papier', desc: 'Recherche longue, doublons, perte de dossiers' },
    { icon: '📊', title: 'Fichiers Excel dispersés', desc: 'Non interconnectés, pas de synchronisation' },
    { icon: '💬', title: 'Communications orales', desc: 'Aucune traçabilité entre services' },
    { icon: '⚠️', title: 'Pas de sauvegarde', desc: 'Risque de perte de données' },
  ];

  problems.forEach((p, i) => {
    const x = 0.5 + (i % 2) * 6.2;
    const y = 1.7 + Math.floor(i / 2) * 2.3;
    s.addShape('roundRect', { x, y, w: 5.7, h: 2, fill: { color: COLORS.bg }, line: { color: COLORS.border, width: 1 }, rectRadius: 0.1 });
    s.addText(p.title, { x: x + 0.3, y: y + 0.2, w: 5.1, h: 0.4, fontSize: 14, bold: true, color: COLORS.primary, fontFace: FONT.body });
    s.addText(p.desc, { x: x + 0.3, y: y + 0.7, w: 5.1, h: 0.8, fontSize: 11, color: COLORS.textLight, fontFace: FONT.body });
  });

  // Problématique box
  s.addShape('roundRect', { x: 0.5, y: 6.0, w: 12.3, h: 0.8, fill: { color: COLORS.primaryDark }, rectRadius: 0.1 });
  s.addText('Comment concevoir une application web complète, sécurisée et évolutive pour gérer intégralement les activités de la Clinique GODIE ?', {
    x: 0.7, y: 6.0, w: 12, h: 0.8, fontSize: 13, color: COLORS.white, fontFace: FONT.body, italic: true, valign: 'middle',
  });

  s.addNotes({
    text: `Avant ce projet, la Clinique GODIE gérait ses activités de manière entièrement manuelle. Les patients étaient enregistrés dans des registres papier, les rendez-vous notés dans un cahier, et les informations médicales consignées dans des dossiers physiques.

Certains services utilisaient des fichiers Excel, mais ces fichiers n'étaient pas interconnectés et résidaient sur des ordinateurs différents. La coordination entre services se faisait par communication orale, sans aucune traçabilité.

Cette situation engendre des erreurs, des doublons, des pertes de temps, et rend impossible la production de statistiques en temps réel. De plus, aucune procédure de sauvegarde n'était en place.

La question centrale est donc : comment concevoir une application web complète, sécurisée et évolutive permettant de gérer de manière intégrée l'ensemble des activités de cette clinique ?

Voyons maintenant les objectifs que nous nous sommes fixés.`
  });
}

// ============================================================
// SLIDE 4 — OBJECTIFS DU PROJET
// ============================================================
{
  const s = pptx.addSlide();
  addSlideLayout(s, 4, TOTAL);
  addSectionNumber(s, 3, 'Objectifs du Projet');

  const objectives = [
    'Architecture modulaire couvrant 30 modules fonctionnels',
    'Interface moderne, responsive (PC, tablette, mobile)',
    'Framework CRUD générique (approche config-driven)',
    'Persistance des données avec auto-incrémentation des ID',
    'Tableau de bord analytique avec graphiques interactifs',
    'Exports PDF, Excel, impression + sauvegarde JSON',
    'Code maintenable et typé (TypeScript strict)',
  ];

  objectives.forEach((obj, i) => {
    const y = 1.7 + i * 0.72;
    s.addShape('roundRect', { x: 0.8, y, w: 0.5, h: 0.5, fill: { color: COLORS.health }, rectRadius: 0.08 });
    s.addText('✓', { x: 0.8, y, w: 0.5, h: 0.5, fontSize: 16, color: COLORS.white, fontFace: FONT.body, align: 'center', valign: 'middle', bold: true });
    s.addText(obj, { x: 1.5, y, w: 11, h: 0.5, fontSize: 13, color: COLORS.text, fontFace: FONT.body, valign: 'middle' });
  });

  s.addNotes({
    text: `Pour répondre à cette problématique, nous nous sommes fixé sept objectifs principaux.

Premièrement, concevoir une architecture modulaire couvrant 30 modules fonctionnels — des patients jusqu'à la facturation, en passant par les consultations, le laboratoire, la pharmacie et les urgences.

Deuxièmement, développer une interface moderne et responsive, adaptée aux ordinateurs, tablettes et téléphones, avec un mode clair et un mode sombre.

Troisièmement, implémenter un framework CRUD générique basé sur une approche « config-driven » qui permet d'ajouter un nouveau module en quelques lignes de configuration seulement.

Quatrièmement, assurer la persistance des données avec auto-incrémentation des identifiants à partir de 1.

Cinquièmement, produire un tableau de bord analytique avec statistiques en temps réel et graphiques interactifs.

Sixièmement, offrir des capacités d'export PDF, Excel et impression, ainsi qu'un système de sauvegarde et restauration JSON.

Et septièmement, garantir la fiabilité du code grâce au typage statique TypeScript.

Passons maintenant à l'analyse des besoins.`
  });
}

// ============================================================
// SLIDE 5 — ANALYSE DES BESOINS
// ============================================================
{
  const s = pptx.addSlide();
  addSlideLayout(s, 5, TOTAL);
  addSectionNumber(s, 4, 'Analyse des Besoins');

  // Left: Actors
  s.addText('Acteurs du système', { x: 0.5, y: 1.6, w: 5.5, h: 0.4, fontSize: 15, bold: true, color: COLORS.primary, fontFace: FONT.title });
  const actors = [
    'Administrateur — accès complet',
    'Médecin — patients, consultations, ordonnances',
    'Réceptionniste — patients, rendez-vous',
    'Pharmacien — médicaments, stock, fournisseurs',
    'Technicien de laboratoire — analyses, résultats',
    'Comptable — factures, paiements, assurances',
  ];
  actors.forEach((a, i) => {
    s.addText(`▸ ${a}`, { x: 0.5, y: 2.1 + i * 0.5, w: 5.5, h: 0.45, fontSize: 11, color: COLORS.text, fontFace: FONT.body });
  });

  // Right: Stats
  s.addText('Chiffres clés', { x: 7, y: 1.6, w: 5.5, h: 0.4, fontSize: 15, bold: true, color: COLORS.primary, fontFace: FONT.title });

  const stats = [
    { val: '30', label: 'Modules fonctionnels' },
    { val: '7', label: 'Acteurs identifiés' },
    { val: '22', label: 'Besoins fonctionnels (BF)' },
    { val: '10', label: 'Besoins non fonctionnels (BNF)' },
    { val: '12', label: 'Règles de gestion (RG)' },
  ];
  stats.forEach((st, i) => {
    const y = 2.1 + i * 0.85;
    s.addShape('roundRect', { x: 7, y, w: 5.8, h: 0.7, fill: { color: COLORS.bg }, line: { color: COLORS.border, width: 1 }, rectRadius: 0.08 });
    s.addText(st.val, { x: 7.2, y, w: 1.2, h: 0.7, fontSize: 24, bold: true, color: COLORS.primary, fontFace: FONT.title, align: 'center', valign: 'middle' });
    s.addText(st.label, { x: 8.5, y, w: 4, h: 0.7, fontSize: 12, color: COLORS.text, fontFace: FONT.body, valign: 'middle' });
  });

  s.addNotes({
    text: `L'analyse des besoins a permis d'identifier sept acteurs qui interagiront avec le système : l'administrateur avec un accès complet, le médecin pour les consultations et ordonnances, le réceptionniste pour l'accueil et les rendez-vous, le pharmacien pour les médicaments, le technicien de laboratoire pour les analyses, et le comptable pour la facturation.

Cette analyse a abouti à 22 besoins fonctionnels, 10 besoins non fonctionnels et 12 règles de gestion. Les besoins fonctionnels couvrent les opérations CRUD pour chaque module, ainsi que les exports, le tableau de bord et la sauvegarde. Les besoins non fonctionnels concernent l'ergonomie, les performances, la sécurité et la maintenabilité.

Les règles de gestion définissent les contraintes métier, comme l'auto-incrémentation des identifiants, la confirmation avant suppression, ou la liaison obligatoire entre une consultation et un patient.

Voyons maintenant l'architecture générale de l'application.`
  });
}

// ============================================================
// SLIDE 6 — ARCHITECTURE GÉNÉRALE
// ============================================================
{
  const s = pptx.addSlide();
  addSlideLayout(s, 6, TOTAL);
  addSectionNumber(s, 5, 'Architecture Générale');

  const arch = imgBase64('fig12_architecture.png');
  if (arch) {
    s.addImage({ data: arch, x: 1.5, y: 1.6, w: 10, h: 4.5, sizing: { type: 'contain', w: 10, h: 4.5 } });
  }

  // Three layer labels
  const layers = [
    { x: 1.5, label: 'Présentation', color: COLORS.primary },
    { x: 5.5, label: 'Logique Métier', color: COLORS.health },
    { x: 9.5, label: 'Persistance', color: COLORS.accent },
  ];
  layers.forEach(l => {
    s.addShape('roundRect', { x: l.x, y: 6.0, w: 3.5, h: 0.6, fill: { color: l.color }, rectRadius: 0.08 });
    s.addText(l.label, { x: l.x, y: 6.0, w: 3.5, h: 0.6, fontSize: 12, bold: true, color: COLORS.white, fontFace: FONT.body, align: 'center', valign: 'middle' });
  });

  s.addNotes({
    text: `L'application suit une architecture de type Single Page Application, ou SPA, avec trois couches distinctes.

La couche Présentation, en bleu, gère l'affichage et les interactions utilisateur. Elle est composée des pages (Dashboard, CrudPage) et des composants réutilisables (Modal, Toast, Sidebar).

La couche Logique Métier, en vert, contient les hooks personnalisés : useCollection pour le CRUD et la persistance, useRefStore pour la résolution des références, et resources.ts qui est le registre de configuration des 30 modules.

La couche Persistance, en teal, assure le stockage des données dans le localStorage du navigateur, avec un système d'auto-incrémentation des identifiants.

Cette séparation des préoccupations améliore la maintenabilité : on peut modifier une couche sans impacter les autres. Par exemple, en production, on pourrait remplacer le localStorage par une API REST sans modifier l'interface.

Voyons les technologies utilisées.`
  });
}

// ============================================================
// SLIDE 7 — TECHNOLOGIES UTILISÉES
// ============================================================
{
  const s = pptx.addSlide();
  addSlideLayout(s, 7, TOTAL);
  addSectionNumber(s, 6, 'Technologies Utilisées');

  const techs = [
    { name: 'React 18', role: 'Bibliothèque UI', color: COLORS.primary },
    { name: 'TypeScript', role: 'Typage statique', color: COLORS.primaryDark },
    { name: 'Vite 5', role: 'Build tool rapide', color: COLORS.health },
    { name: 'Tailwind CSS 3', role: 'Design system', color: COLORS.accent },
    { name: 'Chart.js', role: 'Graphiques interactifs', color: COLORS.warning },
    { name: 'jsPDF', role: 'Génération PDF', color: COLORS.error },
  ];

  techs.forEach((t, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.8 + col * 6.2;
    const y = 1.7 + row * 1.6;
    s.addShape('roundRect', { x, y, w: 5.7, h: 1.4, fill: { color: COLORS.bg }, line: { color: t.color, width: 2 }, rectRadius: 0.1 });
    s.addShape('rect', { x, y, w: 0.1, h: 1.4, fill: { color: t.color } });
    s.addText(t.name, { x: x + 0.3, y: y + 0.15, w: 5.2, h: 0.5, fontSize: 15, bold: true, color: COLORS.text, fontFace: FONT.title });
    s.addText(t.role, { x: x + 0.3, y: y + 0.7, w: 5.2, h: 0.4, fontSize: 11, color: COLORS.textLight, fontFace: FONT.body });
  });

  s.addNotes({
    text: `Pour réaliser cette application, nous avons choisi des technologies modernes et éprouvées.

React 18 est la bibliothèque UI la plus utilisée au monde. Elle permet de construire des composants réutilisables avec un écosystème très riche.

TypeScript apporte le typage statique, qui détecte les erreurs à la compilation et améliore la maintenabilité du code, particulièrement important pour un projet avec 30 modules.

Vite 5 sert de build tool : il démarre en moins d'une seconde et offre un Hot Module replacement quasi instantané.

Tailwind CSS 3 est notre framework CSS, avec une approche utility-first qui garantit une cohérence visuelle parfaite et un mode sombre natif.

Chart.js est utilisé pour les graphiques interactifs du tableau de bord : courbes, camemberts, barres.

Et jsPDF génère les documents PDF côté client, sans dépendance serveur.

Passons au diagramme UML principal.`
  });
}

// ============================================================
// SLIDE 8 — DIAGRAMME UML (CAS D'UTILISATION)
// ============================================================
{
  const s = pptx.addSlide();
  addSlideLayout(s, 8, TOTAL);
  addSectionNumber(s, 7, 'Conception UML');

  const usecase = imgBase64('fig03_usecase_general.png');
  if (usecase) {
    s.addImage({ data: usecase, x: 0.5, y: 1.6, w: 8, h: 5, sizing: { type: 'contain', w: 8, h: 5 } });
  }

  // Right side: key points
  s.addText('Points clés', { x: 8.8, y: 1.6, w: 4, h: 0.4, fontSize: 14, bold: true, color: COLORS.primary, fontFace: FONT.title });
  const points = [
    '7 acteurs identifiés',
    '30 modules fonctionnels',
    'Opérations CRUD par module',
    'Recherche et filtres',
    'Exports PDF / Excel',
    'Tableau de bord analytique',
  ];
  points.forEach((p, i) => {
    s.addText(`▸ ${p}`, { x: 8.8, y: 2.1 + i * 0.55, w: 4, h: 0.5, fontSize: 11, color: COLORS.text, fontFace: FONT.body });
  });

  s.addNotes({
    text: `Le diagramme de cas d'utilisation que vous voyez à gauche modélise les interactions entre les acteurs et le système.

L'administrateur a accès à tous les modules. Le médecin accède aux patients, consultations, ordonnances et hospitalisations. Le réceptionniste gère les patients et les rendez-vous. Le pharmacien gère les médicaments et le stock. Le technicien de laboratoire gère les analyses et résultats. Et le comptable gère les factures et paiements.

Chaque module implémente les quatre opérations CRUD : Créer, Lire, Modifier et Supprimer, ainsi que des fonctionnalités de recherche, de filtres et d'export.

La modélisation UML a également inclus un diagramme de classes avec une trentaine d'entités, des diagrammes de séquence pour les processus clés, et un Modèle Conceptuel de Données suivant la méthode Merise.

Passons à la démonstration du tableau de bord.`
  });
}

// ============================================================
// SLIDE 9 — DÉMONSTRATION : TABLEAU DE BORD
// ============================================================
{
  const s = pptx.addSlide();
  addSlideLayout(s, 9, TOTAL);
  addSectionNumber(s, 8, 'Démonstration : Tableau de Bord');

  const dash = imgBase64('fig13_dashboard.png');
  if (dash) {
    s.addImage({ data: dash, x: 1, y: 1.6, w: 11.3, h: 4.8, sizing: { type: 'contain', w: 11.3, h: 4.8 } });
  }

  s.addText('8 cartes statistiques • Graphiques en temps réel • Alertes de stock • RDV récents', {
    x: 0.5, y: 6.3, w: 12.3, h: 0.4, fontSize: 12, color: COLORS.textLight, fontFace: FONT.body, align: 'center', italic: true,
  });

  s.addNotes({
    text: `Voici le tableau de bord, qui est la page d'accueil de l'application.

En haut, vous voyez 8 cartes statistiques qui affichent en temps réel : le nombre total de patients, le nombre de médecins, les rendez-vous du jour, le nombre de consultations, les hospitalisations en cours, les médicaments en stock, les factures émises et le total des rendez-vous.

En dessous, trois graphiques interactifs implémentés avec Chart.js : une courbe des consultations mensuelles, un camembert des spécialités médicales, et un diagramme en barres de la répartition par sexe.

La liste des rendez-vous récents est affichée en bas, permettant un accès rapide aux dernières activités.

Une alerte de stock faible s'affiche automatiquement quand des médicaments atteignent leur seuil minimum.

Lorsque la base est vide, un état vide s'affiche, invitant l'utilisateur à enregistrer des données — c'est la règle de gestion RG-08.

Voyons maintenant les principaux modules.`
  });
}

// ============================================================
// SLIDE 10 — DÉMONSTRATION : MODULES PRINCIPAUX
// ============================================================
{
  const s = pptx.addSlide();
  addSlideLayout(s, 10, TOTAL);
  addSectionNumber(s, 9, 'Démonstration : Modules Principaux');

  // 4 screenshots in a grid
  const shots = [
    { file: 'fig14_patients.png', label: 'Patients' },
    { file: 'fig17_consultations.png', label: 'Consultations' },
    { file: 'fig16_rdv.png', label: 'Rendez-vous' },
    { file: 'fig18_medicaments.png', label: 'Médicaments' },
  ];

  shots.forEach((sh, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.5 + col * 6.3;
    const y = 1.7 + row * 2.5;
    const img = imgBase64(sh.file);
    if (img) {
      s.addShape('roundRect', { x, y, w: 5.8, h: 2.3, fill: { color: COLORS.bg }, line: { color: COLORS.border, width: 1 }, rectRadius: 0.08 });
      s.addImage({ data: img, x: x + 0.1, y: y + 0.1, w: 5.6, h: 1.8, sizing: { type: 'contain', w: 5.6, h: 1.8 } });
      s.addText(sh.label, { x, y: y + 1.9, w: 5.8, h: 0.35, fontSize: 11, bold: true, color: COLORS.primary, fontFace: FONT.body, align: 'center' });
    }
  });

  s.addNotes({
    text: `Voici quatre des principaux modules de l'application, présentés sous forme de captures d'écran réelles.

En haut à gauche, le module Patients : il affiche la liste des patients dans un tableau avec recherche instantanée, filtres, et boutons d'export PDF et Excel. Le bouton « Ajouter » ouvre un formulaire modal avec validation des champs obligatoires.

En haut à droite, le module Consultations : c'est le dossier médical numérique, avec les symptômes, le diagnostic, le traitement et l'ordonnance. Chaque consultation est liée à un patient et un médecin.

En bas à gauche, le module Rendez-vous : il dispose d'un calendrier mensuel interactif avec navigation entre les mois. Les statuts sont affichés en badges colorés : vert pour confirmé, ambre pour en attente, rouge pour annulé.

En bas à droite, le module Médicaments : il gère le catalogue des médicaments avec la quantité en stock, le prix en Ariary, la date d'expiration et le fournisseur.

Tous ces modules sont générés automatiquement par le framework CRUD générique à partir de leur configuration. L'application compte 30 modules au total, tous fonctionnels.

Passons aux résultats obtenus.`
  });
}

// ============================================================
// SLIDE 11 — RÉSULTATS ET AMÉLIORATIONS
// ============================================================
{
  const s = pptx.addSlide();
  addSlideLayout(s, 11, TOTAL);
  addSectionNumber(s, 10, 'Résultats et Améliorations');

  // Left: Results
  s.addText('Résultats obtenus', { x: 0.5, y: 1.6, w: 5.8, h: 0.4, fontSize: 15, bold: true, color: COLORS.health, fontFace: FONT.title });
  const results = [
    '30 modules fonctionnels opérationnels',
    'Architecture config-driven validée',
    '26 cas de tests passés (100%)',
    'Application responsive (PC, mobile)',
    'Mode clair / sombre fonctionnel',
    'Exports PDF, Excel, impression',
    'Sauvegarde et restauration JSON',
  ];
  results.forEach((r, i) => {
    s.addText(`✓ ${r}`, { x: 0.5, y: 2.1 + i * 0.6, w: 5.8, h: 0.5, fontSize: 12, color: COLORS.text, fontFace: FONT.body });
  });

  // Right: Improvements
  s.addText('Améliorations apportées', { x: 7, y: 1.6, w: 5.8, h: 0.4, fontSize: 15, bold: true, color: COLORS.primary, fontFace: FONT.title });
  const improvements = [
    'Élimination des registres papier',
    'Centralisation des données',
    'Traçabilité des actions (journal)',
    'Statistiques en temps réel',
    'Réduction des erreurs de saisie',
    'Accessibilité multi-postes',
    'Sauvegarde automatique des données',
  ];
  improvements.forEach((imp, i) => {
    s.addText(`▸ ${imp}`, { x: 7, y: 2.1 + i * 0.6, w: 5.8, h: 0.5, fontSize: 12, color: COLORS.text, fontFace: FONT.body });
  });

  s.addNotes({
    text: `Les résultats obtenus sont très satisfaisants.

Tous les 30 modules sont fonctionnels et opérationnels. L'architecture config-driven a été validée : ajouter un module prend littéralement quelques lignes de configuration.

26 cas de tests ont été exécutés, tous passés avec succès, soit 100% de réussite. La matrice de traçabilité a confirmé que tous les besoins identifiés ont été couverts.

L'application est entièrement responsive, testée sur ordinateur, tablette et téléphone. Le mode sombre fonctionne parfaitement. Les exports PDF, Excel et l'impression sont opérationnels, ainsi que la sauvegarde et restauration JSON.

Les améliorations apportées à la clinique sont significatives : élimination des registres papier, centralisation de toutes les données, traçabilité des actions via le journal des activités, statistiques en temps réel pour le pilotage, réduction des erreurs de saisie, accessibilité multi-postes, et sauvegarde automatique des données.

Passons à la conclusion.`
  });
}

// ============================================================
// SLIDE 12 — CONCLUSION ET PERSPECTIVES
// ============================================================
{
  const s = pptx.addSlide();
  addSlideLayout(s, 12, TOTAL);
  addSectionNumber(s, 11, 'Conclusion et Perspectives');

  // Conclusion box
  s.addShape('roundRect', { x: 0.5, y: 1.6, w: 12.3, h: 2.5, fill: { color: COLORS.bg }, line: { color: COLORS.primary, width: 2 }, rectRadius: 0.1 });
  s.addText('Conclusion', { x: 0.8, y: 1.7, w: 11.5, h: 0.5, fontSize: 16, bold: true, color: COLORS.primary, fontFace: FONT.title });
  s.addText([
    { text: 'Application web de gestion hospitalière complète et professionnelle\n', options: { fontSize: 13, color: COLORS.text, fontFace: FONT.body } },
    { text: '30 modules couvrant l\'ensemble du parcours de soins\n', options: { fontSize: 13, color: COLORS.text, fontFace: FONT.body } },
    { text: 'Architecture config-driven : productivité, cohérence, maintenabilité\n', options: { fontSize: 13, color: COLORS.text, fontFace: FONT.body } },
    { text: 'Technologies modernes : React, TypeScript, Vite, Tailwind CSS', options: { fontSize: 13, color: COLORS.text, fontFace: FONT.body } },
  ], { x: 0.8, y: 2.2, w: 11.5, h: 1.8, valign: 'top' });

  // Perspectives box
  s.addShape('roundRect', { x: 0.5, y: 4.3, w: 12.3, h: 2.3, fill: { color: COLORS.bg }, line: { color: COLORS.health, width: 2 }, rectRadius: 0.1 });
  s.addText('Perspectives d\'évolution', { x: 0.8, y: 4.4, w: 11.5, h: 0.5, fontSize: 16, bold: true, color: COLORS.health, fontFace: FONT.title });

  const perspectives = [
    'Backend Node.js / Express avec PostgreSQL',
    'Authentification JWT et gestion des sessions',
    'Application mobile native (React Native)',
    'Notifications SMS / push (rappels de RDV)',
    'Intelligence artificielle pour l\'aide au diagnostic',
    'Interconnexion avec des dispositifs médicaux (IoT)',
  ];
  perspectives.forEach((p, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    s.addText(`▸ ${p}`, { x: 0.8 + col * 6, y: 4.9 + row * 0.6, w: 5.8, h: 0.5, fontSize: 11, color: COLORS.text, fontFace: FONT.body });
  });

  s.addNotes({
    text: `Pour conclure, ce projet a permis de concevoir et de réaliser une application web de gestion hospitalière complète et professionnelle pour la Clinique GODIE.

L'application couvre 30 modules fonctionnels, de l'accueil du patient jusqu'à la facturation, en passant par les consultations, le laboratoire, la pharmacie et les urgences. L'architecture config-driven a permis de couvrir ce large périmètre avec un code minimal et maintenable, tout en garantissant une cohérence parfaite de l'interface.

Les technologies modernes — React, TypeScript, Vite, Tailwind CSS, Chart.js — ont permis de réaliser une application performante, responsive et de qualité professionnelle.

Plusieurs perspectives d'évolution sont envisagées : l'intégration d'un backend Node.js avec PostgreSQL pour une gestion multi-postes, l'authentification JWT, le développement d'une application mobile avec React Native, l'envoi de SMS de rappel de rendez-vous, l'intégration de l'intelligence artificielle pour l'aide au diagnostic, et l'interconnexion avec des dispositifs médicaux connectés.

Ce projet démontre qu'avec des technologies web modernes et une architecture bien pensée, il est possible de répondre aux besoins réels d'un établissement de santé malgache tout en produisant un logiciel de qualité professionnelle.

Je vous remercie de votre attention. Je suis maintenant à votre disposition pour répondre à vos questions.`
  });
}

// ============================================================
// SLIDE 13 — REMERCIEMENTS / QUESTIONS
// ============================================================
{
  const s = pptx.addSlide();
  s.background = { color: COLORS.bgDark };

  s.addShape('rect', { x: 0, y: 0, w: 13.33, h: 0.06, fill: { color: COLORS.primary } });
  s.addShape('rect', { x: 0, y: 7.44, w: 13.33, h: 0.06, fill: { color: COLORS.health } });

  s.addText('Merci de votre attention', {
    x: 0, y: 2.0, w: 13.33, h: 1,
    fontSize: 36, color: COLORS.white, fontFace: FONT.title, bold: true, align: 'center',
  });

  s.addText('Questions ?', {
    x: 0, y: 3.2, w: 13.33, h: 0.8,
    fontSize: 28, color: COLORS.primary, fontFace: FONT.title, align: 'center', italic: true,
  });

  // Logo
  const logo = imgBase64('fig01_logo.png');
  if (logo) {
    s.addImage({ data: logo, x: 5.67, y: 4.2, w: 2, h: 2, sizing: { type: 'contain', w: 2, h: 2 } });
  }

  s.addText('JESE Andriamaniraka Davida — Licence 3 Informatique — 2024–2025', {
    x: 0, y: 6.5, w: 13.33, h: 0.4,
    fontSize: 12, color: COLORS.textLight, fontFace: FONT.body, align: 'center',
  });

  s.addNotes({
    text: `Je vous remercie chaleureusement pour votre attention durant ces 11 minutes de présentation.

Je tiens à remercier mon encadreur pour son accompagnement, les membres du jury pour le temps qu'ils consacrent à l'évaluation de ce travail, la direction et le personnel de la Clinique GODIE pour leur collaboration, ainsi que ma famille et mes camarades de promotion pour leur soutien.

Je suis maintenant à votre disposition pour répondre à vos questions.`
  });
}

// ============================================================
// WRITE FILE
// ============================================================
pptx.writeFile({ fileName: OUT }).then(() => {
  console.log('PPTX generated: ' + OUT);
}).catch(err => {
  console.error('Error:', err);
});
