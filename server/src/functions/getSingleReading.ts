import puppeteer from "puppeteer"
const PuppeteerHar = require('puppeteer-har');

export const getSingleReading = async (url: string, saveDirectory: string) => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.setCacheEnabled(false)

  const har = new PuppeteerHar(page);
  await har.start({ path: `${saveDirectory}/${Date.now()}.har` });
 
  await page.goto(url, {
    waitUntil: 'networkidle0',
  });
 
  await har.stop();
  await browser.close();
};
