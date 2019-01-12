const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1680, height: 1050 })
  
  await page.tracing.start({path: 'trace.json',screenshots:true});
  
  await page.goto('https://www.google.com', {waitUntil: 'networkidle2'});
  await console.log('search page loaded');
  const searchTextbox = await page.$('input[type=text]');
  await searchTextbox.type('meeseek');
  await page.keyboard.press('Enter');

  const [response] = await Promise.all([
    page.waitForNavigation(),
    page.once('load', () => console.log('meeseek results page loaded'))
  ]);

  await page.screenshot({path: 'meeseek.png'});
  await page.pdf({path: 'meeseek.pdf'});

  await page.tracing.stop();

  await browser.close();
})();