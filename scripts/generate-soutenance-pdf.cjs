const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const FIG = path.join(__dirname, '..', 'memoire', 'figures');

function imgSrc(filename) {
  const p = path.join(FIG, filename);
  if (!fs.existsSync(p)) return '';
  const data = fs.readFileSync(p);
  return 'data:image/png;base64,' + data.toString('base64');
}

const logo64 = imgSrc('fig01_logo.png');
const org64 = imgSrc('fig02_organigramme.png');
const arch64 = imgSrc('fig12_architecture.png');
const usecase64 = imgSrc('fig03_usecase_general.png');
const dash64 = imgSrc('fig13_dashboard.png');
const patients64 = imgSrc('fig14_patients.png');
const consultations64 = imgSrc('fig17_consultations.png');
const rdv64 = imgSrc('fig16_rdv.png');
const medicaments64 = imgSrc('fig18_medicaments.png');

const slides = [
// 1 - Cover
`<div class="slide cover">
  <div class="bar top"></div>
  <div class="bar bottom green"></div>
  ${logo64 ? `<img class="logo" src="${logo64}">` : ''}
  <p class="uni">RÉPUBLIQUE DE MADAGASCAR</p>
  <p class="uni2">Université d'Antsiranana — Faculté des Sciences</p>
  <p class="uni3">Département Informatique — Licence Professionnelle</p>
  <div class="title-box"><h1>Conception et Réalisation d'une Application Web de Gestion Hospitalière</h1><p class="subtitle">Cas de la Clinique GODIE à Antsiranana</p></div>
  <p class="author">Présenté par : JESE Andriamaniraka Davida</p>
  <p class="year">Année universitaire 2024–2025</p>
  <p class="year">Antsiranana, Madagascar</p>
</div>`,
// 2 - Clinique
`<div class="slide">
  <div class="accent-bar"></div>
  <div class="num-badge">1</div><h2>Présentation de la Clinique GODIE</h2><hr>
  <div class="two-col">
    <div><ul class="bullet-list">
      <li><strong>Établissement de santé privé fondé en 2010</strong></li>
      <li>Située à Ambondrona, Antsiranana (région Diana)</li>
      <li>Dirigée par M. JESE Andriamaniraka Davida</li>
      <li>6 services : consultations, hospitalisation, laboratoire, pharmacie, urgences, ambulance</li>
      <li>Spécialités : cardiologie, pédiatrie, neurologie, gynécologie, dermatologie, orthopédie</li>
    </ul></div>
    <div>${org64 ? `<img class="fig" src="${org64}">` : ''}</div>
  </div>
</div>`,
// 3 - Problématique
`<div class="slide">
  <div class="accent-bar"></div>
  <div class="num-badge">2</div><h2>Contexte et Problématique</h2><hr>
  <div class="grid2">
    <div class="card"><p class="card-title">📋 Registres papier</p><p class="card-desc">Recherche longue, doublons, perte de dossiers</p></div>
    <div class="card"><p class="card-title">📊 Fichiers Excel dispersés</p><p class="card-desc">Non interconnectés, pas de synchronisation</p></div>
    <div class="card"><p class="card-title">💬 Communications orales</p><p class="card-desc">Aucune traçabilité entre services</p></div>
    <div class="card"><p class="card-title">⚠️ Pas de sauvegarde</p><p class="card-desc">Risque de perte de données</p></div>
  </div>
  <div class="question-box">Comment concevoir une application web complète, sécurisée et évolutive pour gérer intégralement les activités de la Clinique GODIE ?</div>
</div>`,
// 4 - Objectifs
`<div class="slide">
  <div class="accent-bar"></div>
  <div class="num-badge">3</div><h2>Objectifs du Projet</h2><hr>
  <div class="obj-list">
    <div class="obj"><div class="check">✓</div><p>Architecture modulaire couvrant 30 modules fonctionnels</p></div>
    <div class="obj"><div class="check">✓</div><p>Interface moderne, responsive (PC, tablette, mobile)</p></div>
    <div class="obj"><div class="check">✓</div><p>Framework CRUD générique (approche config-driven)</p></div>
    <div class="obj"><div class="check">✓</div><p>Persistance des données avec auto-incrémentation des ID</p></div>
    <div class="obj"><div class="check">✓</div><p>Tableau de bord analytique avec graphiques interactifs</p></div>
    <div class="obj"><div class="check">✓</div><p>Exports PDF, Excel, impression + sauvegarde JSON</p></div>
    <div class="obj"><div class="check">✓</div><p>Code maintenable et typé (TypeScript strict)</p></div>
  </div>
</div>`,
// 5 - Besoins
`<div class="slide">
  <div class="accent-bar"></div>
  <div class="num-badge">4</div><h2>Analyse des Besoins</h2><hr>
  <div class="two-col">
    <div><h3 class="section-title">Acteurs du système</h3>
      <ul class="bullet-list">
        <li>▸ Administrateur — accès complet</li>
        <li>▸ Médecin — patients, consultations, ordonnances</li>
        <li>▸ Réceptionniste — patients, rendez-vous</li>
        <li>▸ Pharmacien — médicaments, stock, fournisseurs</li>
        <li>▸ Technicien de laboratoire — analyses, résultats</li>
        <li>▸ Comptable — factures, paiements, assurances</li>
      </ul>
    </div>
    <div><h3 class="section-title">Chiffres clés</h3>
      <div class="stat-row"><div class="stat-val">30</div><div class="stat-label">Modules fonctionnels</div></div>
      <div class="stat-row"><div class="stat-val">7</div><div class="stat-label">Acteurs identifiés</div></div>
      <div class="stat-row"><div class="stat-val">22</div><div class="stat-label">Besoins fonctionnels (BF)</div></div>
      <div class="stat-row"><div class="stat-val">10</div><div class="stat-label">Besoins non fonctionnels (BNF)</div></div>
      <div class="stat-row"><div class="stat-val">12</div><div class="stat-label">Règles de gestion (RG)</div></div>
    </div>
  </div>
</div>`,
// 6 - Architecture
`<div class="slide">
  <div class="accent-bar"></div>
  <div class="num-badge">5</div><h2>Architecture Générale</h2><hr>
  ${arch64 ? `<img class="fig-large" src="${arch64}">` : ''}
  <div class="three-layers">
    <div class="layer blue">Présentation</div>
    <div class="layer green">Logique Métier</div>
    <div class="layer teal">Persistance</div>
  </div>
</div>`,
// 7 - Technologies
`<div class="slide">
  <div class="accent-bar"></div>
  <div class="num-badge">6</div><h2>Technologies Utilisées</h2><hr>
  <div class="grid2">
    <div class="tech-card" style="border-left:4px solid #2563EB"><p class="tech-name">React 18</p><p class="tech-role">Bibliothèque UI</p></div>
    <div class="tech-card" style="border-left:4px solid #1E40AF"><p class="tech-name">TypeScript</p><p class="tech-role">Typage statique</p></div>
    <div class="tech-card" style="border-left:4px solid #059669"><p class="tech-name">Vite 5</p><p class="tech-role">Build tool rapide</p></div>
    <div class="tech-card" style="border-left:4px solid #0D9488"><p class="tech-name">Tailwind CSS 3</p><p class="tech-role">Design system</p></div>
    <div class="tech-card" style="border-left:4px solid #D97706"><p class="tech-name">Chart.js</p><p class="tech-role">Graphiques interactifs</p></div>
    <div class="tech-card" style="border-left:4px solid #DC2626"><p class="tech-name">jsPDF</p><p class="tech-role">Génération PDF</p></div>
  </div>
</div>`,
// 8 - UML
`<div class="slide">
  <div class="accent-bar"></div>
  <div class="num-badge">7</div><h2>Conception UML</h2><hr>
  <div class="two-col">
    <div>${usecase64 ? `<img class="fig" src="${usecase64}">` : ''}</div>
    <div><h3 class="section-title">Points clés</h3>
      <ul class="bullet-list">
        <li>▸ 7 acteurs identifiés</li>
        <li>▸ 30 modules fonctionnels</li>
        <li>▸ Opérations CRUD par module</li>
        <li>▸ Recherche et filtres</li>
        <li>▸ Exports PDF / Excel</li>
        <li>▸ Tableau de bord analytique</li>
      </ul>
    </div>
  </div>
</div>`,
// 9 - Dashboard
`<div class="slide">
  <div class="accent-bar"></div>
  <div class="num-badge">8</div><h2>Démonstration : Tableau de Bord</h2><hr>
  ${dash64 ? `<img class="fig-xlarge" src="${dash64}">` : ''}
  <p class="caption">8 cartes statistiques • Graphiques en temps réel • Alertes de stock • RDV récents</p>
</div>`,
// 10 - Modules
`<div class="slide">
  <div class="accent-bar"></div>
  <div class="num-badge">9</div><h2>Démonstration : Modules Principaux</h2><hr>
  <div class="grid2">
    <div class="shot-card">${patients64 ? `<img class="shot" src="${patients64}">` : ''}<p class="shot-label">Patients</p></div>
    <div class="shot-card">${consultations64 ? `<img class="shot" src="${consultations64}">` : ''}<p class="shot-label">Consultations</p></div>
    <div class="shot-card">${rdv64 ? `<img class="shot" src="${rdv64}">` : ''}<p class="shot-label">Rendez-vous</p></div>
    <div class="shot-card">${medicaments64 ? `<img class="shot" src="${medicaments64}">` : ''}<p class="shot-label">Médicaments</p></div>
  </div>
</div>`,
// 11 - Résultats
`<div class="slide">
  <div class="accent-bar"></div>
  <div class="num-badge">10</div><h2>Résultats et Améliorations</h2><hr>
  <div class="two-col">
    <div><h3 class="section-title green">Résultats obtenus</h3>
      <ul class="bullet-list">
        <li>✓ 30 modules fonctionnels opérationnels</li>
        <li>✓ Architecture config-driven validée</li>
        <li>✓ 26 cas de tests passés (100%)</li>
        <li>✓ Application responsive (PC, mobile)</li>
        <li>✓ Mode clair / sombre fonctionnel</li>
        <li>✓ Exports PDF, Excel, impression</li>
        <li>✓ Sauvegarde et restauration JSON</li>
      </ul>
    </div>
    <div><h3 class="section-title blue">Améliorations apportées</h3>
      <ul class="bullet-list">
        <li>▸ Élimination des registres papier</li>
        <li>▸ Centralisation des données</li>
        <li>▸ Traçabilité des actions (journal)</li>
        <li>▸ Statistiques en temps réel</li>
        <li>▸ Réduction des erreurs de saisie</li>
        <li>▸ Accessibilité multi-postes</li>
        <li>▸ Sauvegarde automatique des données</li>
      </ul>
    </div>
  </div>
</div>`,
// 12 - Conclusion
`<div class="slide">
  <div class="accent-bar"></div>
  <div class="num-badge">11</div><h2>Conclusion et Perspectives</h2><hr>
  <div class="conclusion-box">
    <h3 class="section-title blue">Conclusion</h3>
    <ul class="bullet-list">
      <li>Application web de gestion hospitalière complète et professionnelle</li>
      <li>30 modules couvrant l'ensemble du parcours de soins</li>
      <li>Architecture config-driven : productivité, cohérence, maintenabilité</li>
      <li>Technologies modernes : React, TypeScript, Vite, Tailwind CSS</li>
    </ul>
  </div>
  <div class="perspectives-box">
    <h3 class="section-title green">Perspectives d'évolution</h3>
    <div class="grid2">
      <ul class="bullet-list"><li>▸ Backend Node.js / Express avec PostgreSQL</li><li>▸ Authentification JWT et gestion des sessions</li><li>▸ Application mobile native (React Native)</li></ul>
      <ul class="bullet-list"><li>▸ Notifications SMS / push (rappels de RDV)</li><li>▸ Intelligence artificielle pour l'aide au diagnostic</li><li>▸ Interconnexion avec des dispositifs médicaux (IoT)</li></ul>
    </div>
  </div>
</div>`,
// 13 - Merci
`<div class="slide cover">
  <div class="bar top"></div>
  <div class="bar bottom green"></div>
  <h1 class="thanks">Merci de votre attention</h1>
  <p class="questions">Questions ?</p>
  ${logo64 ? `<img class="logo" src="${logo64}">` : ''}
  <p class="author">JESE Andriamaniraka Davida — Licence 3 Informatique — 2024–2025</p>
</div>`,
];

const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
@page { size: 297mm 167mm landscape; margin: 0; }
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Inter', 'Segoe UI', sans-serif; }
.slide { width: 297mm; height: 167mm; padding: 15mm 20mm; background: #fff; page-break-after: always; position: relative; overflow: hidden; }
.slide.cover { background: #0F172A; color: #fff; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.bar { position: absolute; left: 0; right: 0; height: 6px; background: #2563EB; }
.bar.top { top: 0; } .bar.bottom { bottom: 0; background: #059669; }
.accent-bar { position: absolute; left: 0; top: 0; width: 5px; height: 100%; background: #2563EB; }
.num-badge { position: absolute; left: 15mm; top: 10mm; width: 28px; height: 28px; background: #2563EB; border-radius: 8px; color: #fff; font-size: 18px; font-weight: bold; display: flex; align-items: center; justify-content: center; }
h2 { font-size: 26px; color: #1E293B; margin-left: 40px; margin-top: 10mm; font-family: 'Plus Jakarta Sans', sans-serif; }
hr { border: none; border-top: 1.5px solid #E2E8F0; margin: 5mm 0; }
h3.section-title { font-size: 15px; font-weight: bold; margin-bottom: 3mm; font-family: 'Plus Jakarta Sans', sans-serif; }
h3.section-title.green { color: #059669; } h3.section-title.blue { color: #2563EB; }
.two-col { display: flex; gap: 10mm; }
.two-col > div { flex: 1; }
ul.bullet-list { list-style: none; padding: 0; }
ul.bullet-list li { font-size: 12px; color: #1E293B; margin-bottom: 4mm; line-height: 1.4; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 5mm; }
.card { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 4mm 5mm; }
.card-title { font-size: 14px; font-weight: bold; color: #2563EB; }
.card-desc { font-size: 11px; color: #64748B; margin-top: 2mm; }
.question-box { background: #1E40AF; border-radius: 8px; padding: 4mm 6mm; margin-top: 5mm; color: #fff; font-size: 13px; font-style: italic; }
.obj-list { display: flex; flex-direction: column; gap: 3mm; }
.obj { display: flex; align-items: center; gap: 4mm; }
.obj .check { width: 20px; height: 20px; background: #059669; border-radius: 6px; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
.obj p { font-size: 13px; color: #1E293B; }
.stat-row { display: flex; align-items: center; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 6px; padding: 2mm 4mm; margin-bottom: 2mm; }
.stat-val { font-size: 22px; font-weight: bold; color: #2563EB; width: 30px; text-align: center; }
.stat-label { font-size: 12px; color: #1E293B; margin-left: 4mm; }
.fig { max-width: 100%; max-height: 100mm; border: 1px solid #E2E8F0; border-radius: 4px; }
.fig-large { max-width: 80%; max-height: 80mm; display: block; margin: 0 auto; border: 1px solid #E2E8F0; border-radius: 4px; }
.fig-xlarge { max-width: 90%; max-height: 100mm; display: block; margin: 0 auto; border: 1px solid #E2E8F0; border-radius: 4px; }
.three-layers { display: flex; gap: 5mm; margin-top: 5mm; }
.layer { flex: 1; padding: 4mm; border-radius: 8px; color: #fff; font-size: 13px; font-weight: bold; text-align: center; }
.layer.blue { background: #2563EB; } .layer.green { background: #059669; } .layer.teal { background: #0D9488; }
.tech-card { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 4mm 5mm; }
.tech-name { font-size: 15px; font-weight: bold; color: #1E293B; }
.tech-role { font-size: 11px; color: #64748B; margin-top: 2mm; }
.shot-card { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 2mm; text-align: center; }
.shot { max-width: 100%; max-height: 35mm; border-radius: 4px; }
.shot-label { font-size: 12px; font-weight: bold; color: #2563EB; margin-top: 2mm; }
.caption { text-align: center; font-size: 12px; color: #64748B; font-style: italic; margin-top: 3mm; }
.conclusion-box { background: #F8FAFC; border: 2px solid #2563EB; border-radius: 8px; padding: 5mm; margin-bottom: 5mm; }
.perspectives-box { background: #F8FAFC; border: 2px solid #059669; border-radius: 8px; padding: 5mm; }
.logo { width: 60px; height: 60px; margin: 5mm auto; }
.cover .uni { font-size: 11px; color: #64748B; }
.cover .uni2 { font-size: 12px; color: #F1F5F9; }
.cover .uni3 { font-size: 11px; color: #64748B; }
.title-box { background: #1E40AF; border-radius: 12px; padding: 8mm; margin: 5mm 15mm; }
.title-box h1 { font-size: 22px; color: #fff; text-align: center; font-family: 'Plus Jakarta Sans', sans-serif; }
.subtitle { font-size: 14px; color: #F1F5F9; text-align: center; font-style: italic; margin-top: 3mm; }
.cover .author { font-size: 13px; color: #F1F5F9; font-weight: bold; margin-top: 5mm; }
.cover .year { font-size: 12px; color: #64748B; }
.thanks { font-size: 36px; color: #fff; font-family: 'Plus Jakarta Sans', sans-serif; }
.questions { font-size: 28px; color: #2563EB; font-style: italic; margin-top: 5mm; font-family: 'Plus Jakarta Sans', sans-serif; }
</style></head><body>
${slides.join('\n')}
</body></html>`;

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    headless: true,
    noSandbox: true,
    disableSetuidSandbox: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--force-color-profile=srgb', '--print-to-pdf-no-header'],
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise(r => setTimeout(r, 2000));
  const pdfPath = path.join(__dirname, '..', 'memoire', 'Soutenance_Clinique_GODIE.pdf');
  await page.pdf({
    path: pdfPath,
    width: '297mm',
    height: '167mm',
    printBackground: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
  });
  console.log('PDF generated: ' + pdfPath);
  await browser.close();
})();
