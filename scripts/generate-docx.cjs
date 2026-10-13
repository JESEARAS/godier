const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, BorderStyle, ImageRun,
  PageBreak, Header, Footer, PageNumber, NumberFormat,
} = require('docx');

const FIG = path.join(__dirname, '..', 'memoire', 'figures');

// Helper: create a paragraph with justified alignment
function jp(text, opts = {}) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { line: 360, after: 200 },
    indent: opts.noIndent ? undefined : { firstLine: 720 },
    children: [new TextRun({ text, font: 'Times New Roman', size: 24 })],
  });
}

function hp(text, level) {
  return new Paragraph({
    heading: level,
    alignment: level === HeadingLevel.HEADING_1 ? AlignmentType.CENTER : AlignmentType.LEFT,
    spacing: { before: 400, after: 200 },
    children: [new TextRun({ text, font: 'Times New Roman', size: level === HeadingLevel.HEADING_1 ? 36 : level === HeadingLevel.HEADING_2 ? 30 : 26, bold: true })],
  });
}

function emptyP() {
  return new Paragraph({ children: [new TextRun({ text: '', font: 'Times New Roman', size: 24 })] });
}

function imageFig(filename, caption, width = 550) {
  const imgPath = path.join(FIG, filename);
  if (!fs.existsSync(imgPath)) return [emptyP()];
  const imgData = fs.readFileSync(imgPath);
  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new ImageRun({ data: imgData, transformation: { width, height: Math.round(width * 0.6) } })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 },
      children: [new TextRun({ text: caption, font: 'Times New Roman', size: 20, italics: true })],
    }),
  ];
}

function makeTable(headers, rows) {
  const hdr = new TableRow({
    children: headers.map(h => new TableCell({
      children: [new Paragraph({ children: [new TextRun({ text: h, font: 'Times New Roman', size: 22, bold: true, color: 'FFFFFF' })] })],
      shading: { fill: '2563EB' },
    })),
  });
  const bodyRows = rows.map(r => new TableRow({
    children: r.map(c => new TableCell({
      children: [new Paragraph({ children: [new TextRun({ text: c, font: 'Times New Roman', size: 22 })] })],
    })),
  }));
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [hdr, ...bodyRows],
  });
}

const sections = [];

// COVER
sections.push({
  properties: { page: { margin: { top: 2000, bottom: 2000, left: 2000, right: 2000 } } },
  children: [
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: 'RÉPUBLIQUE DE MADAGASCAR', font: 'Times New Roman', size: 26, bold: true })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Ministère de l\'Enseignement Supérieur et de la Recherche Scientifique', font: 'Times New Roman', size: 24 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: 'Université d\'Antsiranana', font: 'Times New Roman', size: 26, bold: true })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Faculté des Sciences — Département Informatique', font: 'Times New Roman', size: 24 })] }),
    ...imageFig('fig01_logo.png', '', 200),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 400 }, children: [new TextRun({ text: 'MÉMOIRE DE FIN D\'ÉTUDES', font: 'Times New Roman', size: 28, bold: true })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'en vue de l\'obtention du diplôme de', font: 'Times New Roman', size: 24 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'LICENCE PROFESSIONNELLE INFORMATIQUE', font: 'Times New Roman', size: 28, bold: true })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 400, after: 200 }, children: [new TextRun({ text: 'Conception et Réalisation d\'une Application Web de Gestion Hospitalière', font: 'Times New Roman', size: 30, bold: true })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Cas de la Clinique GODIE à Antsiranana', font: 'Times New Roman', size: 26 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 400 }, children: [new TextRun({ text: 'Présenté par : JESE Andriamaniraka Davida', font: 'Times New Roman', size: 24 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Sous la direction de : [Nom de l\'encadreur]', font: 'Times New Roman', size: 24 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Année universitaire : 2024–2025', font: 'Times New Roman', size: 24 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 400 }, children: [new TextRun({ text: 'Antsiranana, Madagascar', font: 'Times New Roman', size: 26, bold: true })] }),
  ],
});

// CONTENT section with headers/footers
const contentChildren = [];

// REMERCIEMENTS
contentChildren.push(hp('REMERCIEMENTS', HeadingLevel.HEADING_1));
contentChildren.push(jp('Avant toute chose, je rends grâce à Dieu Tout-Puissant pour la santé, la force et la persévérance qu\'Il m\'a accordées tout au long de ce parcours universitaire.'));
contentChildren.push(jp('Je tiens à exprimer mes plus sincères remerciements à l\'ensemble du corps professoral du Département Informatique de la Faculté des Sciences de l\'Université d\'Antsiranana, dont les enseignements ont constitué le socle de ma formation.'));
contentChildren.push(jp('Ma profonde gratitude va à mon encadreur, [Nom de l\'encadreur], pour son accompagnement constant, ses orientations scientifiques et sa disponibilité à chaque étape de ce travail.'));
contentChildren.push(jp('Je remercie également les membres du jury d\'avoir accepté d\'évaluer ce travail, ainsi que la direction et le personnel de la Clinique GODIE pour leur accueil et leur collaboration.'));
contentChildren.push(jp('Enfin, je remercie du fond du cœur ma famille pour son soutien indéfectible.'));

// DÉDICACE
contentChildren.push(new Paragraph({ children: [new PageBreak()] }));
contentChildren.push(hp('DÉDICACE', HeadingLevel.HEADING_1));
contentChildren.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 600, line: 480 }, children: [new TextRun({ text: 'À mes parents, qui ont sacrifié tant de choses pour mon éducation, et qui m\'ont transmis les valeurs de travail, de persévérance et d\'honneur.\n\nÀ ma famille, pour son soutien constant et son amour sans faille.\n\nÀ mes amis et camarades de promotion, avec qui j\'ai partagé ces années d\'études inoubliables.\n\nÀ tous ceux qui, de près ou de loin, ont contribué à l\'aboutissement de ce travail.\n\nJe dédie ce mémoire.', font: 'Times New Roman', size: 26, italics: true })] }));

// RÉSUMÉ
contentChildren.push(new Paragraph({ children: [new PageBreak()] }));
contentChildren.push(hp('RÉSUMÉ', HeadingLevel.HEADING_1));
contentChildren.push(jp('Ce mémoire présente la conception et la réalisation d\'une application web de gestion hospitalière destinée à la Clinique GODIE, un établissement de santé privé situé à Antsiranana, dans le Nord de Madagascar. L\'application a pour objectif de moderniser et de centraliser la gestion des activités de la clinique.'));
contentChildren.push(jp('Le projet couvre trente modules fonctionnels intégrés : gestion des patients, des médecins, du personnel, des infirmiers, des rendez-vous, des consultations, des ordonnances, des hospitalisations, des chambres et lits, des laboratoires, des analyses, des résultats, des médicaments, de la pharmacie, du stock, des fournisseurs, des factures, des paiements, des assurances, des services, des spécialités, des urgences, des ambulances, des utilisateurs, des rôles, des paramètres, de la sauvegarde et du journal des activités.'));
contentChildren.push(jp('Le développement a été réalisé avec React 18, TypeScript, Vite 5 et Tailwind CSS 3, en adoptant une architecture config-driven permettant la génération automatique des pages CRUD. La persistance est assurée par le localStorage avec auto-incrémentation des identifiants.'));
contentChildren.push(new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: 'Mots-clés : gestion hospitalière, application web, React, TypeScript, CRUD, Clinique GODIE, Antsiranana, Madagascar.', font: 'Times New Roman', size: 24, bold: true })] }));

// ABSTRACT
contentChildren.push(new Paragraph({ children: [new PageBreak()] }));
contentChildren.push(hp('ABSTRACT', HeadingLevel.HEADING_1));
contentChildren.push(jp('This thesis presents the design and implementation of a web-based hospital management application for the GODIE Clinic, a private healthcare establishment located in Antsiranana, in the North of Madagascar.'));
contentChildren.push(jp('The project covers thirty integrated functional modules: patient management, doctors, staff, nurses, appointments, consultations, prescriptions, hospitalizations, rooms and beds, laboratories, analyses, results, medications, pharmacy, stock, suppliers, invoices, payments, insurance, services, specialties, emergencies, ambulances, users, roles, settings, backup, and activity log.'));
contentChildren.push(jp('The development was carried out using React 18, TypeScript, Vite 5, and Tailwind CSS 3, adopting a config-driven architecture enabling automatic CRUD page generation. Data persistence is ensured by browser localStorage with auto-incrementing identifiers.'));
contentChildren.push(new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: 'Keywords: hospital management, web application, React, TypeScript, CRUD, GODIE Clinic, Antsiranana, Madagascar.', font: 'Times New Roman', size: 24, bold: true })] }));

// TABLE DES MATIÈRES (simplified)
contentChildren.push(new Paragraph({ children: [new PageBreak()] }));
contentChildren.push(hp('TABLE DES MATIÈRES', HeadingLevel.HEADING_1));
const tocItems = [
  'Introduction générale', 'Chapitre I — Présentation de la Clinique GODIE',
  'Chapitre II — Analyse de l\'existant', 'Chapitre III — Étude des besoins',
  'Chapitre IV — Conception UML', 'Chapitre V — Choix technologiques',
  'Chapitre VI — Architecture de l\'application', 'Chapitre VII — Réalisation',
  'Chapitre VIII — Présentation détaillée des modules', 'Chapitre IX — Tests',
  'Chapitre X — Sécurité', 'Chapitre XI — Déploiement',
  'Conclusion générale', 'Bibliographie', 'Webographie', 'Annexes',
];
tocItems.forEach(t => contentChildren.push(new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: t, font: 'Times New Roman', size: 24, bold: true })] })));

// LISTE DES FIGURES
contentChildren.push(new Paragraph({ children: [new PageBreak()] }));
contentChildren.push(hp('LISTE DES FIGURES', HeadingLevel.HEADING_1));
const figures = [
  'Figure 1 — Logo de la Clinique GODIE', 'Figure 2 — Organigramme de la Clinique GODIE',
  'Figure 3 — Diagramme de cas d\'utilisation général', 'Figure 4 — Cas d\'utilisation : Gestion des patients',
  'Figure 5 — Diagramme de classes', 'Figure 6 — Séquence : Prise de rendez-vous',
  'Figure 7 — Séquence : Création d\'une consultation', 'Figure 8 — Modèle conceptuel de données (MCD)',
  'Figure 9 — Modèle logique de données (MLD)', 'Figure 10 — Diagramme d\'activité',
  'Figure 11 — Diagramme de déploiement', 'Figure 12 — Architecture générale',
  'Figure 13 — Tableau de bord', 'Figure 14 — Liste des patients',
  'Figure 15 — Ajout d\'un patient', 'Figure 16 — Calendrier des rendez-vous',
  'Figure 17 — Gestion des consultations', 'Figure 18 — Gestion des médicaments',
  'Figure 19 — Rapports', 'Figure 20 — Paramètres et sauvegarde', 'Figure 21 — Version mobile',
];
figures.forEach(f => contentChildren.push(new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: f, font: 'Times New Roman', size: 22 })] })));

// LISTE DES TABLEAUX
contentChildren.push(new Paragraph({ children: [new PageBreak()] }));
contentChildren.push(hp('LISTE DES TABLEAUX', HeadingLevel.HEADING_1));
['Tableau 1 — Acteurs du système', 'Tableau 2 — Besoins fonctionnels', 'Tableau 3 — Besoins non fonctionnels', 'Tableau 4 — Règles de gestion', 'Tableau 5 — Choix technologiques', 'Tableau 6 — Modules de l\'application', 'Tableau 7 — Cas de tests fonctionnels', 'Tableau 8 — Matrice de traçabilité'].forEach(f => contentChildren.push(new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: f, font: 'Times New Roman', size: 22 })] })));

// ACRONYMES
contentChildren.push(new Paragraph({ children: [new PageBreak()] }));
contentChildren.push(hp('LISTE DES ACRONYMES', HeadingLevel.HEADING_1));
contentChildren.push(makeTable(['Acronyme', 'Signification'], [
  ['API', 'Application Programming Interface'], ['CRUD', 'Create, Read, Update, Delete'],
  ['CSS', 'Cascading Style Sheets'], ['CSV', 'Comma-Separated Values'],
  ['HTML', 'HyperText Markup Language'], ['HTTPS', 'HyperText Transfer Protocol Secure'],
  ['JSON', 'JavaScript Object Notation'], ['JWT', 'JSON Web Token'],
  ['MCD', 'Modèle Conceptuel de Données'], ['MLD', 'Modèle Logique de Données'],
  ['PDF', 'Portable Document Format'], ['REST', 'Representational State Transfer'],
  ['SPA', 'Single Page Application'], ['SQL', 'Structured Query Language'],
  ['SVG', 'Scalable Vector Graphics'], ['UML', 'Unified Modeling Language'],
  ['UI', 'User Interface'], ['UX', 'User Experience'], ['XSS', 'Cross-Site Scripting'],
]));

// INTRODUCTION
contentChildren.push(new Paragraph({ children: [new PageBreak()] }));
contentChildren.push(hp('INTRODUCTION GÉNÉRALE', HeadingLevel.HEADING_1));
contentChildren.push(hp('Contexte', HeadingLevel.HEADING_2));
contentChildren.push(jp('La gestion d\'un établissement de santé est une tâche complexe qui mobilise de nombreuses ressources humaines, matérielles et informationnelles. Dans le contexte malgache, et particulièrement dans la ville d\'Antsiranana, de nombreuses cliniques privées assurent encore leur gestion au moyen de procédés manuels ou de fichiers bureautiques dispersés.'));
contentChildren.push(jp('La Clinique GODIE, dirigée par Monsieur JESE Andriamaniraka Davida, est un établissement privé situé à Antsiranana qui souhaite s\'engager dans cette démarche de modernisation en adoptant une application web centralisée de gestion hospitalière.'));
contentChildren.push(hp('Problématique', HeadingLevel.HEADING_2));
contentChildren.push(jp('Comment concevoir et réaliser une application web professionnelle, complète et sécurisée permettant de gérer de manière intégrée l\'ensemble des activités de la Clinique GODIE — patients, médecins, personnel, rendez-vous, consultations, hospitalisations, laboratoire, pharmacie, facturation et urgences ?'));
contentChildren.push(hp('Objectifs', HeadingLevel.HEADING_2));
['Concevoir une architecture logicielle modulaire couvrant l\'ensemble des processus métier', 'Développer une interface utilisateur moderne, responsive et accessible', 'Implémenter un framework CRUD générique permettant d\'ajouter rapidement de nouveaux modules', 'Assurer la persistance des données avec auto-incrémentation des identifiants', 'Garantir la fiabilité, la sécurité et la maintenabilité du code', 'Produire un tableau de bord analytique avec statistiques en temps réel', 'Offrir des capacités d\'export (PDF, Excel, impression) et de sauvegarde'].forEach((t, i) => contentChildren.push(new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: `${i + 1}. ${t}`, font: 'Times New Roman', size: 24 })] })));
contentChildren.push(hp('Méthodologie', HeadingLevel.HEADING_2));
contentChildren.push(jp('Le projet suit une démarche en cascade adaptée : analyse, conception, réalisation, tests et déploiement.'));
contentChildren.push(hp('Structure du mémoire', HeadingLevel.HEADING_2));
contentChildren.push(jp('Le mémoire est structuré en onze chapitres, de la présentation de la clinique au déploiement, suivis d\'une conclusion générale, d\'une bibliographie, d\'une webographie et d\'annexes.'));

// CHAPITRE I
contentChildren.push(new Paragraph({ children: [new PageBreak()] }));
contentChildren.push(hp('CHAPITRE I — PRÉSENTATION DE LA CLINIQUE GODIE', HeadingLevel.HEADING_1));
contentChildren.push(hp('1.1 Présentation générale', HeadingLevel.HEADING_2));
contentChildren.push(jp('La Clinique GODIE est un établissement de santé privé situé à Antsiranana, dans le Nord de Madagascar. Fondée en 2010 par Monsieur JESE Andriamaniraka Davida, la clinique offre des services médicaux pluridisciplinaires à la population de la région Diana.'));
contentChildren.push(...imageFig('fig01_logo.png', 'Figure 1 — Logo de la Clinique GODIE', 250));
contentChildren.push(hp('1.2 Localisation géographique', HeadingLevel.HEADING_2));
contentChildren.push(jp('La Clinique GODIE est implantée dans le quartier d\'Ambondrona, à Antsiranana, chef-lieu de la région Diana. Elle dessert la ville et ses environs, ainsi que les populations des districts voisins.'));
contentChildren.push(hp('1.3 Organigramme', HeadingLevel.HEADING_2));
contentChildren.push(jp('La Clinique GODIE est dirigée par Monsieur JESE Andriamaniraka Davida. L\'organisation comprend la Direction, le Service médical, le Service infirmier, le Service d\'accueil, le Service pharmaceutique, le Service de laboratoire et le Service comptable.'));
contentChildren.push(...imageFig('fig02_organigramme.png', 'Figure 2 — Organigramme de la Clinique GODIE'));
contentChildren.push(hp('1.4 Services offerts', HeadingLevel.HEADING_2));
['Consultations externes (cardiologie, pédiatrie, neurologie, gynécologie, dermatologie, orthopédie)', 'Hospitalisation avec chambres et lits', 'Laboratoire d\'analyses médicales', 'Pharmacie', 'Service d\'urgences', 'Service d\'ambulance'].forEach(t => contentChildren.push(new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: `• ${t}`, font: 'Times New Roman', size: 24 })] })));
contentChildren.push(hp('1.5 Motivation du projet', HeadingLevel.HEADING_2));
contentChildren.push(jp('Face à la croissance de son activité et à la diversité de ses services, la Clinique GODIE ressent le besoin de disposer d\'un système d\'information unifié, moderne et fiable, pour remplacer les procédés manuels par une application web centralisée.'));

// CHAPITRE II
contentChildren.push(new Paragraph({ children: [new PageBreak()] }));
contentChildren.push(hp('CHAPITRE II — ANALYSE DE L\'EXISTANT', HeadingLevel.HEADING_1));
contentChildren.push(hp('2.1 Méthodes de travail actuelles', HeadingLevel.HEADING_2));
contentChildren.push(jp('L\'analyse du système actuel révèle que la gestion s\'effectue au moyen de registres papier, de fichiers Excel dispersés, de communications orales et de factures manuelles, sans intégration entre les outils.'));
contentChildren.push(hp('2.2 Limites du système actuel', HeadingLevel.HEADING_2));
contentChildren.push(makeTable(['Limite', 'Conséquence'], [
  ['Saisie manuelle répétitive', 'Erreurs de transcription, doublons'],
  ['Données dispersées', 'Difficulté de consolidation et de reporting'],
  ['Absence de traçabilité', 'Perte de l\'historique des actions'],
  ['Pas d\'accès distant', 'Impossibilité de consulter à distance'],
  ['Pas de sauvegarde automatique', 'Risque de perte de données'],
  ['Pas de statistiques en temps réel', 'Pilotage difficile'],
]));
contentChildren.push(hp('2.3 Propositions de solutions', HeadingLevel.HEADING_2));
contentChildren.push(jp('Nous proposons une application web unique offrant une base centralisée, un accès multi-postes, des modules intégrés, des exports PDF/Excel, un tableau de bord, un journal des activités et un système de sauvegarde.'));

// CHAPITRE III
contentChildren.push(new Paragraph({ children: [new PageBreak()] }));
contentChildren.push(hp('CHAPITRE III — ÉTUDE DES BESOINS', HeadingLevel.HEADING_1));
contentChildren.push(hp('3.1 Identification des acteurs', HeadingLevel.HEADING_2));
contentChildren.push(makeTable(['Acteur', 'Description'], [
  ['Administrateur', 'Accès complet à tous les modules'],
  ['Médecin', 'Patients, consultations, ordonnances, hospitalisations'],
  ['Infirmier', 'Patients, hospitalisations, lits'],
  ['Réceptionniste', 'Patients, rendez-vous'],
  ['Pharmacien', 'Médicaments, stock, fournisseurs'],
  ['Technicien de laboratoire', 'Laboratoires, analyses, résultats'],
  ['Comptable', 'Factures, paiements, assurances'],
]));
contentChildren.push(hp('3.2 Besoins fonctionnels', HeadingLevel.HEADING_2));
contentChildren.push(makeTable(['Code', 'Besoin'], [
  ['BF-01', 'Gérer les patients (CRUD)'], ['BF-02', 'Gérer les médecins (CRUD)'],
  ['BF-05', 'Gérer les rendez-vous (CRUD + calendrier)'], ['BF-06', 'Gérer les consultations (CRUD)'],
  ['BF-08', 'Gérer les hospitalisations (CRUD)'], ['BF-12', 'Gérer les médicaments et le stock'],
  ['BF-14', 'Gérer les factures et paiements'], ['BF-18', 'Gérer les utilisateurs et rôles'],
  ['BF-19', 'Afficher un tableau de bord'], ['BF-20', 'Générer des rapports (PDF, Excel)'],
  ['BF-21', 'Sauvegarder et restaurer les données'], ['BF-22', 'Journaliser les activités'],
]));
contentChildren.push(hp('3.3 Besoins non fonctionnels', HeadingLevel.HEADING_2));
contentChildren.push(makeTable(['Code', 'Besoin'], [
  ['BNF-01', 'Interface responsive'], ['BNF-02', 'Mode clair et sombre'],
  ['BNF-03', 'Temps de réponse < 1s'], ['BNF-04', 'Validation des formulaires'],
  ['BNF-07', 'Code maintenable (TypeScript)'], ['BNF-09', 'Base de données vide au démarrage'],
  ['BNF-10', 'Auto-incrémentation des identifiants'],
]));
contentChildren.push(hp('3.4 Règles de gestion', HeadingLevel.HEADING_2));
contentChildren.push(makeTable(['Règle', 'Description'], [
  ['RG-01', 'ID auto-incrémenté à partir de 1'], ['RG-02', 'Confirmation avant suppression'],
  ['RG-03', 'Validation des champs obligatoires'], ['RG-08', 'Base vide à l\'installation'],
  ['RG-09', 'Réinitialisation remet les ID à 1'], ['RG-10', 'Consultation liée à patient et médecin'],
]));

// CHAPITRE IV
contentChildren.push(new Paragraph({ children: [new PageBreak()] }));
contentChildren.push(hp('CHAPITRE IV — CONCEPTION UML', HeadingLevel.HEADING_1));
contentChildren.push(hp('4.1 Diagramme de cas d\'utilisation', HeadingLevel.HEADING_2));
contentChildren.push(jp('Le diagramme de cas d\'utilisation modélise les interactions entre les acteurs et les fonctionnalités du système.'));
contentChildren.push(...imageFig('fig03_usecase_general.png', 'Figure 3 — Diagramme de cas d\'utilisation général'));
contentChildren.push(...imageFig('fig04_usecase_patients.png', 'Figure 4 — Cas d\'utilisation : Gestion des patients'));
contentChildren.push(hp('4.2 Diagramme de classes', HeadingLevel.HEADING_2));
contentChildren.push(jp('Le diagramme de classes décrit la structure statique du système avec les entités principales : Patient, Doctor, Appointment, Consultation, Prescription, Room, Bed, Hospitalization, Medication, Invoice, Payment, etc.'));
contentChildren.push(...imageFig('fig05_classes.png', 'Figure 5 — Diagramme de classes'));
contentChildren.push(hp('4.3 Diagrammes de séquence', HeadingLevel.HEADING_2));
contentChildren.push(...imageFig('fig06_sequence_rdv.png', 'Figure 6 — Séquence : Prise de rendez-vous'));
contentChildren.push(...imageFig('fig07_sequence_consultation.png', 'Figure 7 — Séquence : Création d\'une consultation'));
contentChildren.push(hp('4.4 Diagramme d\'activité', HeadingLevel.HEADING_2));
contentChildren.push(...imageFig('fig10_activity.png', 'Figure 10 — Diagramme d\'activité : Consultation médicale'));
contentChildren.push(hp('4.5 Modèle conceptuel de données', HeadingLevel.HEADING_2));
contentChildren.push(...imageFig('fig08_mcd.png', 'Figure 8 — Modèle Conceptuel de Données (MCD)'));
contentChildren.push(hp('4.6 Modèle logique de données', HeadingLevel.HEADING_2));
contentChildren.push(...imageFig('fig09_mld.png', 'Figure 9 — Modèle Logique de Données (MLD)'));

// CHAPITRE V
contentChildren.push(new Paragraph({ children: [new PageBreak()] }));
contentChildren.push(hp('CHAPITRE V — CHOIX TECHNOLOGIQUES', HeadingLevel.HEADING_1));
contentChildren.push(hp('5.1 Frontend', HeadingLevel.HEADING_2));
contentChildren.push(makeTable(['Technologie', 'Rôle', 'Justification'], [
  ['React 18', 'Bibliothèque UI', 'Composants réutilisables, écosystème mature'],
  ['TypeScript', 'Langage', 'Typage statique, détection d\'erreurs'],
  ['Vite 5', 'Build tool', 'Démarrage rapide, HMR instantané'],
  ['Tailwind CSS 3', 'Framework CSS', 'Design system utilitaire, responsive'],
  ['Chart.js', 'Graphiques', 'Visualisations interactives'],
  ['jsPDF', 'Génération PDF', 'Export de documents côté client'],
  ['lucide-react', 'Icônes', 'Bibliothèque moderne et cohérente'],
  ['react-router-dom 7', 'Routage', 'Navigation SPA'],
]));
contentChildren.push(hp('5.2 Persistance des données', HeadingLevel.HEADING_2));
contentChildren.push(jp('La persistance est assurée par le localStorage du navigateur, avec un compteur d\'auto-incrément persistant par collection. Ce choix permet une démonstration sans dépendance serveur, tout en restant adaptable à une API REST en production.'));
contentChildren.push(hp('5.3 Justification globale', HeadingLevel.HEADING_2));
contentChildren.push(jp('L\'architecture config-driven permet d\'ajouter un nouveau module en quelques lignes de configuration, garantissant productivité, cohérence et maintenabilité.'));

// CHAPITRE VI
contentChildren.push(new Paragraph({ children: [new PageBreak()] }));
contentChildren.push(hp('CHAPITRE VI — ARCHITECTURE DE L\'APPLICATION', HeadingLevel.HEADING_1));
contentChildren.push(hp('6.1 Architecture générale', HeadingLevel.HEADING_2));
contentChildren.push(jp('L\'application suit une architecture Single Page Application (SPA) avec trois couches : présentation, logique métier et persistance.'));
contentChildren.push(...imageFig('fig12_architecture.png', 'Figure 12 — Architecture générale de l\'application'));
contentChildren.push(hp('6.2 Couches logicielles', HeadingLevel.HEADING_2));
contentChildren.push(jp('La couche Présentation (React + TypeScript) gère l\'interface. La couche Logique (hooks, services) contient useCollection, useRefStore et resources.ts. La couche Persistance (localStorage) assure le stockage avec auto-incrémentation.'));
contentChildren.push(hp('6.3 Pattern config-driven', HeadingLevel.HEADING_2));
contentChildren.push(jp('Le registre RESOURCES définit pour chaque module : key, label, icon, group, fields, columns, searchFields et filters. Le composant CrudPage consomme cette configuration et génère automatiquement toute l\'interface.'));

// CHAPITRE VII
contentChildren.push(new Paragraph({ children: [new PageBreak()] }));
contentChildren.push(hp('CHAPITRE VII — RÉALISATION', HeadingLevel.HEADING_1));
contentChildren.push(hp('7.1 Structure du projet', HeadingLevel.HEADING_2));
contentChildren.push(jp('Le dossier src/ contient components/ (CrudPage, Sidebar, Modal, Toast, ui), pages/ (Dashboard, Appointments, Reports, Settings, NotFound), hooks/ (useCollection, useRefStore), services/ (resources.ts), types/, utils/ (format.ts), App.tsx et index.css.'));
contentChildren.push(hp('7.2 Store de données', HeadingLevel.HEADING_2));
contentChildren.push(jp('Le hook useCollection fournit items, add, update, remove et reset. L\'identifiant est géré par un compteur persistant dans le localStorage, garantissant des IDs uniques à partir de 1.'));
contentChildren.push(hp('7.3 Framework CRUD', HeadingLevel.HEADING_2));
contentChildren.push(jp('CrudPage génère : en-tête avec bouton d\'ajout, barre d\'outils (recherche, filtres, exports), tableau paginé avec badges et références, modales d\'ajout/édition avec validation, confirmation de suppression et notifications.'));
contentChildren.push(hp('7.4 Design system', HeadingLevel.HEADING_2));
contentChildren.push(jp('Le design system utilise Tailwind CSS avec une palette personnalisée (primary, health, accent, warning, error), des polices Inter et Plus Jakarta Sans, un espacement de 8px, un mode sombre et des animations subtiles.'));

// CHAPITRE VIII
contentChildren.push(new Paragraph({ children: [new PageBreak()] }));
contentChildren.push(hp('CHAPITRE VIII — PRÉSENTATION DÉTAILLÉE DES MODULES', HeadingLevel.HEADING_1));
contentChildren.push(hp('8.1 Tableau de bord', HeadingLevel.HEADING_2));
contentChildren.push(jp('Le tableau de bord affiche huit cartes statistiques, des graphiques (courbe, camembert, barres) et la liste des RDV récents.'));
contentChildren.push(...imageFig('fig13_dashboard.png', 'Figure 13 — Tableau de bord'));
contentChildren.push(hp('8.2 Gestion des patients', HeadingLevel.HEADING_2));
contentChildren.push(...imageFig('fig14_patients.png', 'Figure 14 — Liste des patients'));
contentChildren.push(...imageFig('fig15_add_patient.png', 'Figure 15 — Ajout d\'un patient'));
contentChildren.push(hp('8.3 Gestion du personnel', HeadingLevel.HEADING_2));
contentChildren.push(jp('Trois modules : médecins, personnel administratif et infirmiers.'));
contentChildren.push(hp('8.4 Rendez-vous et consultations', HeadingLevel.HEADING_2));
contentChildren.push(...imageFig('fig16_rdv.png', 'Figure 16 — Calendrier des rendez-vous'));
contentChildren.push(...imageFig('fig17_consultations.png', 'Figure 17 — Gestion des consultations'));
contentChildren.push(hp('8.5 Hospitalisation', HeadingLevel.HEADING_2));
contentChildren.push(jp('Modules des hospitalisations, chambres et lits avec statuts.'));
contentChildren.push(hp('8.6 Laboratoire', HeadingLevel.HEADING_2));
contentChildren.push(jp('Modules des laboratoires, analyses et résultats.'));
contentChildren.push(hp('8.7 Pharmacie', HeadingLevel.HEADING_2));
contentChildren.push(...imageFig('fig18_medicaments.png', 'Figure 18 — Gestion des médicaments'));
contentChildren.push(hp('8.8 Facturation', HeadingLevel.HEADING_2));
contentChildren.push(jp('Modules des factures, paiements et assurances.'));
contentChildren.push(hp('8.9 Urgences et ambulances', HeadingLevel.HEADING_2));
contentChildren.push(jp('Modules des urgences et des ambulances.'));
contentChildren.push(hp('8.10 Sécurité et paramètres', HeadingLevel.HEADING_2));
contentChildren.push(...imageFig('fig19_reports.png', 'Figure 19 — Rapports'));
contentChildren.push(...imageFig('fig20_settings.png', 'Figure 20 — Paramètres et sauvegarde'));
contentChildren.push(...imageFig('fig21_mobile.png', 'Figure 21 — Version mobile'));

// CHAPITRE IX
contentChildren.push(new Paragraph({ children: [new PageBreak()] }));
contentChildren.push(hp('CHAPITRE IX — TESTS', HeadingLevel.HEADING_1));
contentChildren.push(hp('9.1 Stratégie de test', HeadingLevel.HEADING_2));
contentChildren.push(jp('Tests fonctionnels systématiques couvrant la création, la lecture, la mise à jour, la suppression, les exports, la navigation et la sauvegarde.'));
contentChildren.push(hp('9.2 Cas de tests fonctionnels', HeadingLevel.HEADING_2));
contentChildren.push(makeTable(['ID', 'Module', 'Cas de test', 'Statut'], [
  ['T-01', 'Patients', 'Ajouter un patient valide', 'OK'],
  ['T-04', 'Patients', 'Supprimer un patient', 'OK'],
  ['T-08', 'RDV', 'Créer un RDV via calendrier', 'OK'],
  ['T-11', 'Consultations', 'Créer une consultation', 'OK'],
  ['T-17', 'Rapports', 'Export PDF', 'OK'],
  ['T-19', 'Paramètres', 'Export sauvegarde JSON', 'OK'],
  ['T-22', 'Navigation', 'Mode sombre', 'OK'],
  ['T-23', 'Navigation', 'Responsive mobile', 'OK'],
]));

// CHAPITRE X
contentChildren.push(new Paragraph({ children: [new PageBreak()] }));
contentChildren.push(hp('CHAPITRE X — SÉCURITÉ', HeadingLevel.HEADING_1));
contentChildren.push(jp('Validation des données côté client, protection XSS via React, protection contre les injections SQL et CSRF, gestion des rôles et permissions, journalisation des activités et sauvegarde des données.'));

// CHAPITRE XI
contentChildren.push(new Paragraph({ children: [new PageBreak()] }));
contentChildren.push(hp('CHAPITRE XI — DÉPLOIEMENT', HeadingLevel.HEADING_1));
contentChildren.push(jp('Build de production avec Vite, déploiement statique sur Vercel/Netlify/Nginx, intégration continue avec GitHub Actions.'));
contentChildren.push(...imageFig('fig11_deployment.png', 'Figure 11 — Diagramme de déploiement'));

// CONCLUSION
contentChildren.push(new Paragraph({ children: [new PageBreak()] }));
contentChildren.push(hp('CONCLUSION GÉNÉRALE', HeadingLevel.HEADING_1));
contentChildren.push(jp('Ce mémoire a présenté la conception et la réalisation d\'une application web de gestion hospitalière pour la Clinique GODIE. Le projet couvre trente modules fonctionnels avec une architecture config-driven garantissant productivité et maintenabilité.'));
contentChildren.push(jp('Les technologies modernes — React, TypeScript, Vite, Tailwind CSS, Chart.js — ont permis de réaliser une application performante et professionnelle.'));
contentChildren.push(hp('Perspectives d\'évolution', HeadingLevel.HEADING_2));
['Backend Node.js/Express avec PostgreSQL', 'Authentification JWT', 'Application mobile (React Native)', 'Notifications SMS et push', 'Intelligence artificielle pour le diagnostic', 'Interconnexion IoT'].forEach(t => contentChildren.push(new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: `• ${t}`, font: 'Times New Roman', size: 24 })] })));

// BIBLIOGRAPHIE
contentChildren.push(new Paragraph({ children: [new PageBreak()] }));
contentChildren.push(hp('BIBLIOGRAPHIE', HeadingLevel.HEADING_1));
['BOOCH, G. (2005). The Unified Modeling Language User Guide. Addison-Wesley.', 'FLANAGAN, D. (2011). JavaScript: The Definitive Guide. O\'Reilly Media.', 'KROENKE, D. M. (2013). Database Processing. Pearson.', 'LARMAN, C. (2004). Applying UML and Patterns. Prentice Hall.', 'PRESSMAN, R. S. (2014). Software Engineering. McGraw-Hill.', 'SOMMERVILLE, I. (2015). Software Engineering. Pearson.'].forEach(t => contentChildren.push(new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: t, font: 'Times New Roman', size: 22 })] })));

// WEBOGRAPHIE
contentChildren.push(new Paragraph({ children: [new PageBreak()] }));
contentChildren.push(hp('WEBOGRAPHIE', HeadingLevel.HEADING_1));
['React — https://react.dev', 'TypeScript — https://www.typescriptlang.org', 'Vite — https://vitejs.dev', 'Tailwind CSS — https://tailwindcss.com', 'Chart.js — https://www.chartjs.org', 'MDN Web Docs — https://developer.mozilla.org', 'React Router — https://reactrouter.com', 'GitHub Actions — https://docs.github.com/en/actions'].forEach(t => contentChildren.push(new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: t, font: 'Times New Roman', size: 22 })] })));

// ANNEXES
contentChildren.push(new Paragraph({ children: [new PageBreak()] }));
contentChildren.push(hp('ANNEXES', HeadingLevel.HEADING_1));
contentChildren.push(hp('Annexe A — Liste complète des modules', HeadingLevel.HEADING_2));
contentChildren.push(makeTable(['N°', 'Module', 'Clé'], [
  ['1', 'Patients', 'godie_patients'], ['2', 'Médecins', 'godie_doctors'],
  ['3', 'Personnel', 'godie_staff'], ['4', 'Infirmiers', 'godie_nurses'],
  ['5', 'Rendez-vous', 'godie_appointments'], ['6', 'Consultations', 'godie_consultations'],
  ['7', 'Ordonnances', 'godie_prescriptions'], ['8', 'Hospitalisations', 'godie_hospitalizations'],
  ['9', 'Chambres', 'godie_rooms'], ['10', 'Lits', 'godie_beds'],
  ['11', 'Laboratoires', 'godie_laboratories'], ['12', 'Analyses', 'godie_analyses'],
  ['13', 'Résultats', 'godie_results'], ['14', 'Médicaments', 'godie_medications'],
  ['15', 'Fournisseurs', 'godie_suppliers'], ['16', 'Stock', 'godie_stock'],
  ['17', 'Factures', 'godie_invoices'], ['18', 'Paiements', 'godie_payments'],
  ['19', 'Assurances', 'godie_insurance'], ['20', 'Services', 'godie_services'],
  ['21', 'Spécialités', 'godie_specialties'], ['22', 'Urgences', 'godie_emergencies'],
  ['23', 'Ambulances', 'godie_ambulances'], ['24', 'Utilisateurs', 'godie_users'],
  ['25', 'Rôles', 'godie_roles'], ['26', 'Journal', 'godie_activity'],
]));
contentChildren.push(hp('Annexe B — Captures d\'écran supplémentaires', HeadingLevel.HEADING_2));
contentChildren.push(...imageFig('fig_doctors.png', 'Module des médecins'));
contentChildren.push(...imageFig('fig_hospitalizations.png', 'Module des hospitalisations'));
contentChildren.push(...imageFig('fig_invoices.png', 'Module des factures'));
contentChildren.push(...imageFig('fig_emergencies.png', 'Module des urgences'));
contentChildren.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 600 }, children: [new TextRun({ text: '— Fin du mémoire —', font: 'Times New Roman', size: 26, bold: true })] }));

sections.push({
  properties: {
    page: {
      margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
      pageNumbers: { start: 1, formatType: NumberFormat.DECIMAL },
    },
  },
  headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'JESE Andriamaniraka Davida — Mémoire de Licence — Clinique GODIE', font: 'Times New Roman', size: 16, color: '94A3B8' })] })] }) },
  footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: [PageNumber.CURRENT], font: 'Times New Roman', size: 16, color: '94A3B8' }), new TextRun({ text: ' / ', font: 'Times New Roman', size: 16, color: '94A3B8' }), new TextRun({ children: [PageNumber.TOTAL_PAGES], font: 'Times New Roman', size: 16, color: '94A3B8' })] })] }) },
  children: contentChildren,
});

const doc = new Document({ sections });
Packer.toBuffer(doc).then(buf => {
  const outPath = path.join(__dirname, '..', 'memoire', 'Memoire_Clinique_GODIE.docx');
  fs.writeFileSync(outPath, buf);
  console.log('DOCX generated: ' + outPath);
});
