const puppeteer = require('puppeteer');
const { expect } = require('chai');

// puppeteer options
const opts = {
  headless: false,
  slowMo: 100,
  timeout: 10000
};

(async () => {
  const browser = await puppeteer.launch(opts);
  const page = await browser.newPage();
  await page.setViewport({ width: 1680, height: 1050 })
  await page.goto('https://www.google.com', {waitUntil: 'networkidle2'});
  await console.log('search page loaded');

  const searchTextbox = await page.waitFor('input[name=q]');
  
  await searchTextbox.type('meeseek');
  await page.keyboard.press('Enter');

  const [response] = await Promise.all([
    page.waitForNavigation(),
    page.once('load', () => console.log('meeseek results page loaded'))
  ]);

  expect(await page.title()).to.contain('Google Search');

  await page.screenshot({path: 'meeseek.png'});

  await browser.close();
})();