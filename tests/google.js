const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.setViewport({ width: 1680, height: 1050 })
  await page.tracing.start({path: '../out/trace.json',screenshots:true});
  await page.goto('https://www.google.com', {waitUntil: 'networkidle2'});
  
  const searchBox = await page.$('input[type=text]');
  await searchBox.type('cookies');
  await page.keyboard.press('Enter');
  // const inputElement = await page.$('input[value="Google Search"]');
  // await inputElement.click();

  const [response] = await Promise.all([
    page.waitForNavigation(),
    page.once('load', () => console.log('cookies loaded!'))
  ]);

  await page.screenshot({path: '../out/cookies.png' });
  await page.tracing.stop();
  await browser.close();
})();