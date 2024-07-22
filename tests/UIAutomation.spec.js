const {test, expect }= require('@playwright/test');



test('First Playwright test', async ({browser})=>
{
    //playwright code--
    //chrome-plugin/cookies
   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto("https://playwright.dev/");
});

test('page Playwright test', async ({page})=>
    {
        //playwright code--
        //chrome-plugin/cookies
       //const context = await browser.newContext();
      // const page = await context.newPage();
       await page.goto("https://google.in");
    });