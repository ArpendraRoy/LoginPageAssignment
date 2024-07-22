const { test, expect } = require('@playwright/test');

//test.use({ viewport: { width: 5000, height: 3000 } })

test.only('verify that after loading google and lavigate to production portal login page,login page should be loaded fine', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
 // await page.goto("https://google.in");
  await page.goto("https://production1.adbox.pro/App/Login");
  console.log(await page.viewportSize().width);
  console.log(await page.viewportSize().height);
  page.close();

});

test('verify that in usename and password textfield placeholder default text should be correctly displayed', async ({ page }) => {
  await page.goto("https://production1.adbox.pro/App/Login");
  var placeholder = await page.locator('[id="txtUsername"]').getAttribute("placeholder")
  console.log(placeholder)
  var placeholder = await page.locator('[id="txtPassword"]').getAttribute("placeholder")
  console.log(placeholder)
  expect(placeholder)
  page.close();


});

test('verify that if user clicking on login button by wrong username and password ,an warning message should be displayed', async ({ page }) => {
  await page.goto("https://production1.adbox.pro/App/Login");
  await page.locator("#txtUsername").fill("abc");
  await page.locator("#txtPassword").fill("abc");
  await page.locator("#btnLogin").click();
  //page.close();


});

test('alert message validation', async ({ page }) => {
  await page.goto("https://production1.adbox.pro/App/Login");
  await page.locator("#txtUsername").fill("abc");
  await page.locator("#txtPassword").fill("abc");
  await page.locator("#btnLogin").click();
  const abc = await page.getByRole("alert").textContent();
  console.log(abc);
  page.close();

});

test('verify that if user clicking on login button by enter valid username and password ,user should be redirect to the bp listing page', async ({ page }) => {
  await page.goto("https://production1.adbox.pro/App/Login");
  await page.locator("#txtUsername").fill("arpendra.roy+cb@deltax.com");
  await page.locator("#txtPassword").fill("ads4good");
  await page.locator("#btnLogin").click();
  page.pause();


});


test('verify that by clicking the forget password button,a new page should be open', async ({ page }) => {
  await page.goto("https://production1.adbox.pro/App/Login");
  await page.getByText("Forgot your password?").click();
  page.pause();


});

test('verify that by clicking the back button in forget password page, user should be navigate to the login page', async ({ page }) => {
  await page.goto("https://production1.adbox.pro/App/Login")
  await page.getByText("Forgot your password?").click()
  await page.getByRole('button', { name: 'Back to Login Page' }).click()
  page.pause();


});

test('verify that by clicking the google login button a new popup should be open ', async ({ page }) => {
  await page.goto("https://production1.adbox.pro/App/Login");
  const page1Promise = page.waitForEvent('popup');
  await page.locator('.g-signin-div').click();
  const page1 = await page1Promise;

});

test('verify that by clicking the microsoft login button a new popup should be open ', async ({ page }) => {
  await page.goto("https://production1.adbox.pro/App/Login");
  const page2Promise = page.waitForEvent('popup');
  await page.locator('.g-signin-button').click();
  const page2 = await page2Promise;

});


test('session persistance ', async ({ page }) => {
  const { chromium } = require('playwright');
  const browser = await chromium.launch();

  // Create a new browser context
  const context = await browser.newContext();


  try {
    // Create a new page within the context
    const page = await context.newPage();

    // Navigate to the login page
    await page.goto('https://production1.adbox.pro/App/Login');

    // Login with valid credentials
    await page.locator("#txtUsername").fill("arpendra.roy+cb@deltax.com");
    await page.locator("#txtPassword").fill("ads4good");
    await Promise.all([
      page.waitForNavigation(), // Wait for navigation after clicking
      page.click('button[type="submit"]'),
    ])

    // Open a new page in the same context
    const newPage = await context.newPage();

    // Navigate to the login page again
    await newPage.goto('https://production1.adbox.pro/App/Login');


    // Check if user is redirected to another page indicating logged-in state
    const isLoggedIn = await newPage.url() !== 'https://production1.adbox.pro/App/Login';


    if (isLoggedIn) {
      console.log('Session is persisted across tabs/pages: PASS');
    } else {
      console.log('Session is not persisted across tabs/pages: FAIL');
    }
  }
  catch (error) {
    console.error('Error occurred:', error);
  }
  finally {
    // Close the browser
    //await browser.close();
  }

});

