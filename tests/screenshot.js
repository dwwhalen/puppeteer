const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.setViewport({ width: 1680, height: 1050 })
  await page.goto('http://leadingedje.com', {waitUntil: 'networkidle2'});
  await page.screenshot({path: 'le-screenshot.png', fullPage: true});

  await browser.close();
})();