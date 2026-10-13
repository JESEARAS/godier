const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, 'memoire', 'figures');
fs.mkdirSync(OUT, { recursive: true });

const CHROME = '/usr/bin/chromium';
const BASE = 'http://localhost:4173';

const shots = [
  { name: 'fig13_dashboard.png', path: '/', viewport: { width: 1440, height: 900 } },
  { name: 'fig14_patients.png', path: '/m/godie_patients', viewport: { width: 1440, height: 900 } },
  { name: 'fig15_add_patient.png', path: '/m/godie_patients', viewport: { width: 1440, height: 900 }, action: 'add' },
  { name: 'fig16_rdv.png', path: '/rendez-vous', viewport: { width: 1440, height: 900 } },
  { name: 'fig17_consultations.png', path: '/m/godie_consultations', viewport: { width: 1440, height: 900 } },
  { name: 'fig18_medicaments.png', path: '/m/godie_medications', viewport: { width: 1440, height: 900 } },
  { name: 'fig19_reports.png', path: '/rapports', viewport: { width: 1440, height: 900 } },
  { name: 'fig20_settings.png', path: '/parametres', viewport: { width: 1440, height: 900 } },
  { name: 'fig21_mobile.png', path: '/', viewport: { width: 390, height: 844 } },
  { name: 'fig22_listes.png', path: '/listes', viewport: { width: 1440, height: 900 } },
  { name: 'fig23_morgue.png', path: '/m/godie_morgue', viewport: { width: 1440, height: 900 } },
  { name: 'fig24_suivi.png', path: '/m/godie_followups', viewport: { width: 1440, height: 900 } },
  { name: 'fig25_prix.png', path: '/m/godie_prices', viewport: { width: 1440, height: 900 } },
  { name: 'fig_doctors.png', path: '/m/godie_doctors', viewport: { width: 1440, height: 900 } },
  { name: 'fig_nurses.png', path: '/m/godie_nurses', viewport: { width: 1440, height: 900 } },
  { name: 'fig_hospitalizations.png', path: '/m/godie_hospitalizations', viewport: { width: 1440, height: 900 } },
  { name: 'fig_rooms.png', path: '/m/godie_rooms', viewport: { width: 1440, height: 900 } },
  { name: 'fig_beds.png', path: '/m/godie_beds', viewport: { width: 1440, height: 900 } },
  { name: 'fig_laboratories.png', path: '/m/godie_laboratories', viewport: { width: 1440, height: 900 } },
  { name: 'fig_analyses.png', path: '/m/godie_analyses', viewport: { width: 1440, height: 900 } },
  { name: 'fig_results.png', path: '/m/godie_results', viewport: { width: 1440, height: 900 } },
  { name: 'fig_suppliers.png', path: '/m/godie_suppliers', viewport: { width: 1440, height: 900 } },
  { name: 'fig_stock.png', path: '/m/godie_stock', viewport: { width: 1440, height: 900 } },
  { name: 'fig_invoices.png', path: '/m/godie_invoices', viewport: { width: 1440, height: 900 } },
  { name: 'fig_payments.png', path: '/m/godie_payments', viewport: { width: 1440, height: 900 } },
  { name: 'fig_insurance.png', path: '/m/godie_insurance', viewport: { width: 1440, height: 900 } },
  { name: 'fig_emergencies.png', path: '/m/godie_emergencies', viewport: { width: 1440, height: 900 } },
  { name: 'fig_ambulances.png', path: '/m/godie_ambulances', viewport: { width: 1440, height: 900 } },
  { name: 'fig_users.png', path: '/m/godie_users', viewport: { width: 1440, height: 900 } },
  { name: 'fig_roles.png', path: '/m/godie_roles', viewport: { width: 1440, height: 900 } },
  { name: 'fig_activity.png', path: '/m/godie_activity', viewport: { width: 1440, height: 900 } },
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    noSandbox: true,
    disableSetuidSandbox: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--force-color-profile=srgb'],
  });

  for (const s of shots) {
    const page = await browser.newPage();
    await page.setViewport(s.viewport);
    await page.goto(`${BASE}${s.path}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2500));

    if (s.action === 'add') {
      try {
        // click the "Ajouter" button
        const btn = await page.$('button');
        const buttons = await page.$$('button');
        for (const b of buttons) {
          const text = await page.evaluate(el => el.textContent, b);
          if (text && text.includes('Ajouter')) { await b.click(); break; }
        }
        await new Promise(r => setTimeout(r, 1000));
      } catch (e) {}
    }

    const fp = path.join(OUT, s.name);
    await page.screenshot({ path: fp, fullPage: false });
    console.log(`Captured: ${s.name}`);
    await page.close();
  }

  await browser.close();
  console.log('All screenshots done.');
})();
