const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    headless: true,
    noSandbox: true,
    disableSetuidSandbox: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--force-color-profile=srgb', '--print-to-pdf-no-header'],
  });
  const page = await browser.newPage();
  const htmlPath = 'file://' + path.join(__dirname, '..', 'memoire', 'Questions_Jury.html');
  await page.goto(htmlPath, { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise(r => setTimeout(r, 1000));
  const pdfPath = path.join(__dirname, '..', 'memoire', 'Questions_Jury.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '2.5cm', bottom: '2.5cm', left: '2cm', right: '2cm' },
  });
  console.log('Q&A PDF generated: ' + pdfPath);
  await browser.close();
})();
