const puppeteer = require('puppeteer');

// puppeteer options
const opts = {
  headless: false
};

(async () => {
  const browser = await puppeteer.launch(opts);
  const page = await browser.newPage();
  await page.setViewport({ width: 1680, height: 1050 })
  
  await page.tracing.start({path: 'trace.json',screenshots:true});
  
  for (i = 0; i < 10; i++) { 
    await page.goto('https://www.google.com', {waitUntil: 'networkidle2'});

    await console.log('search page loaded');
    const searchTextbox = await page.$('input[type=text]');
    await searchTextbox.type('meeseek box');
    await page.keyboard.press('Enter');

    await Promise.all([
      page.once('load', () => console.log('meeseek results page loaded'))
    ]);

    await page.screenshot({path: 'meeseek.png'});
  }

  await page.tracing.stop();

  await browser.close();
})();