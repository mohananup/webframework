
import { expect } from "@playwright/test";
import { chromium } from "playwright";

describe('google search', () => {
  test('Google Search', async () => {
    const browser = await chromium.launch({
      headless: false
    });
    const context = await browser.newContext();
    // Open new page
    const page = await context.newPage();
    // Go to https://www.google.com/
    await page.goto('https://www.google.com/');
    // Click [aria-label="Search"]
    await page.locator('[aria-label="Search"]').click();
    // Fill [aria-label="Search"]
    await page.locator('[aria-label="Search"]').fill('Selenium');
    // Click text=Google Search >> nth=0
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://www.google.com/search?q=Selenium&source=hp&ei=2cgLYsL9AsyZr7wP0OOS2AI&iflsig=AHkkrS4AAAAAYgvW6b6m1bsEkt7BrxDh_ZdZflg0vfbZ&ved=0ahUKEwiCzseLhYL2AhXMzIsBHdCxBCsQ4dUDCAc&oq=Selenium&gs_lcp=Cgdnd3Mtd2l6EAwyCAgAEIAEELEDMgsIABCABBCxAxCDATIFCAAQgAQyCwgAEIAEELEDEIMBMggIABCABBCxAzIICAAQgAQQsQMyCAgAEIAEELEDMggIABCABBCxAzILCAAQgAQQsQMQgwEyBQgAEIAEOg4ILhCPARDqAhCMAxDlAjoOCAAQjwEQ6gIQjAMQ5QI6EAgAEI8BEOoCEAoQjAMQ5QI6EQguEIAEELEDEIMBEMcBENEDOgsILhCABBDHARDRAzoICC4QgAQQ1AI6CAgAELEDEIMBOggILhCxAxCDAToICC4QgAQQsQM6BQguEIAEOgsILhCABBCxAxCDAToLCC4QsQMQxwEQrwFQtgZY_SRg_DVoAXAAeACAAV6IAYYFkgEBOJgBAKABAbABCg&sclient=gws-wiz' }*/),
      page.locator('text=Google Search').first().click()
    ]);
    // ---------------------
    await context.close();
    await browser.close();
  },30000);

});



