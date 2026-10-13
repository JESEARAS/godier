const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    headless: true,
    noSandbox: true,
    disableSetuidSandbox: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--force-color-profile=srgb', '--print-to-pdf-no-header'],
  });

  const page = await browser.newPage();
  const htmlPath = 'file://' + path.join(__dirname, '..', 'memoire', 'memoire.html');
  await page.goto(htmlPath, { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise(r => setTimeout(r, 2000));

  const pdfPath = path.join(__dirname, '..', 'memoire', 'Memoire_Clinique_GODIE.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '2.5cm', bottom: '2.5cm', left: '2cm', right: '2cm' },
    displayHeaderFooter: true,
    headerTemplate: '<div style="font-size:8px; width:100%; text-align:center; color:#94a3b8; padding:0 2cm;">JESE Andriamaniraka Davida — Mémoire de Licence — Clinique GODIE</div>',
    footerTemplate: '<div style="font-size:8px; width:100%; text-align:center; color:#94a3b8;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',
  });

  console.log('PDF generated: ' + pdfPath);
  await browser.close();
})();
