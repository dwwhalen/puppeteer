const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhonex = devices['iPhone X'];
puppeteer.launch({headless:false}).then(async browser => {
  const page = await browser.newPage();
  
  await page.emulate(iPhonex);
  
  await page.goto('https://msdn.com/');
  await page.screenshot({ path: 'msdn.png'});

  await browser.close();
});