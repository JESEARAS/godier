const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const FIG = path.join(__dirname, '..', 'memoire', 'figures');
const svgs = fs.readdirSync(FIG).filter(f => f.endsWith('.svg'));

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    headless: true,
    noSandbox: true,
    disableSetuidSandbox: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--force-color-profile=srgb'],
  });

  for (const svg of svgs) {
    const page = await browser.newPage();
    const filePath = path.join(FIG, svg);
    const html = fs.readFileSync(filePath, 'utf-8');
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 500));
    const pngName = svg.replace('.svg', '.png');
    await page.screenshot({ path: path.join(FIG, pngName), fullPage: true, omitBackground: false });
    console.log(`Converted: ${svg} -> ${pngName}`);
    await page.close();
  }

  await browser.close();
  console.log('All SVGs converted to PNG.');
})();
