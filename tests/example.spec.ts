import { test, expect } from '@playwright/test';

test.describe('Desc1', () => {

  test.skip('has title', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await page.locator('div').filter({ hasText: 'qweasdasda123123sd' }).nth(3).click(); //driver.findElements(By./css(#qwe)).click();

    expect(await page.getByRole('option').allTextContents()).toEqual(["qwe", 'asd', 'zxc']);


    await page.locator('//*[text()="MY tetx"]').fill('qwe') // selenium -> setValue()
    await page.locator('//*[text()="MY tetx"]').hover() // selenium -> actions().hover(element).perform()
    await page.locator('loader').waitFor({ state: 'detached' }); // selenium -> explicit wait
    await page.locator('loader').inputValue() // selenium -> getValue() // getAttrbute('value')
    await page.locator('loader').textContent() // selenium -> getText()
    // Expect a title "to contain" a substring.
    await expect(page.locator('loader')).toBeVisible();
    await expect(page.locator('loader')).toHaveText("qwe");
  });

  test('get started link', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();
    await page.getByRole('link', { name: 'API', exact: true }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });
});
