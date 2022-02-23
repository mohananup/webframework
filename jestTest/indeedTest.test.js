import { expect } from "@playwright/test";
import { chromium } from "playwright";

describe('Indded job search', () => {

  test('Login Page', async() => { 
      const browser = await chromium.launch({
        headless: false
      });
      const context = await browser.newContext();
      
      const page = await context.newPage();
    
      await page.goto('https://www.amazon.com/');
    
      await page.locator('[aria-label="Search"]').click();
    
      await page.locator('[aria-label="Search"]').fill('toys');
     
      await Promise.all([
        page.waitForNavigation(/*{ url: 'https://www.amazon.com/s?k=toys&crid=2Y729Z8MPN0LH&sprefix=toys%2Caps%2C265&ref=nb_sb_noss_1' }*/),
        page.locator('[aria-label="Search"]').press('Enter')
      ]);
      
      await Promise.all([
        page.waitForNavigation(/*{ url: 'https://www.amazon.com/s?k=toys&rh=n%3A165793011%2Cn%3A166164011&dc&crid=2Y729Z8MPN0LH&qid=1644934458&rnid=2941120011&sprefix=toys%2Caps%2C265&ref=sr_nr_n_3' }*/),
        page.locator('text=Kids\' Electronics').click()
      ]);
      
      await Promise.all([
        page.waitForNavigation(/*{ url: 'https://www.amazon.com/Microphone-Karaoke-Girls-Birthday-Gifts/dp/B082PHHRJQ/ref=sr_1_2?crid=2Y729Z8MPN0LH&keywords=toys&qid=1644934469&rnid=2941120011&s=toys-and-games&smid=A1B80TSA8UAQFM&sprefix=toys%2Caps%2C265&sr=1-2' }*/),
        page.locator('text=Keyian Bluetooth Karaoke Wireless Microphone for Kids Singing').click()
      ]);
    
      await Promise.all([
        page.waitForNavigation(/*{ url: 'https://www.amazon.com/s?k=Keyian&ref=bl_dp_s_web_0' }*/),
        page.locator('text=Brand: Keyian').click()
      ]);
      
      await Promise.all([
        page.waitForNavigation(/*{ url: 'https://www.amazon.com/s?k=Keyian&rh=n%3A172282%2Cp_89%3ALogitech&dc&qid=1644934519&rnid=2528832011&ref=sr_nr_p_89_1' }*/),
        page.locator('[aria-label="Logitech"] i').click()
      ]);
      await Promise.all([
        page.waitForNavigation(/*{ url: 'https://www.amazon.com/Logitech-Wireless-Keyboard-Touchpad-PC-connected/dp/B014EUQOGK/ref=sr_1_1?keywords=Keyian&qid=1644934528&refinements=p_89%3ALogitech&rnid=2528832011&s=electronics&sr=1-1' }*/),
        page.locator('img[alt="Logitech\\ K400\\ Plus\\ Wireless\\ Touch\\ TV\\ Keyboard\\ With\\ Easy\\ Media\\ Control\\ and\\ Built-in\\ Touchpad\\,\\ HTPC\\ Keyboard\\ for\\ PC-connecte\\.\\.\\."]').click()
      ]);

      await page.locator('#productTitle').click();
  
    
      await context.storageState({ path: 'auth.json' });
      await context.close();
      await browser.close();
    });
})
