import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';

puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

type ScrapingModule = {
  baseUrl: string;
  scrape: () => {};
  options?: any;
};

export default async (
  searchQuery: string,
  module: ScrapingModule
): Promise<any> => {
  const browser = await puppeteer.launch({
    headless: true,
  });
  let results;
  try {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto(module.baseUrl + searchQuery, module.options);
    results = await page.evaluate(module.scrape);
  } catch (err) {
    console.error(err);
  } finally {
    await browser.close();
  }
  return results;
};
