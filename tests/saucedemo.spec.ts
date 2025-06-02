import { test, expect } from '@playwright/test';

test.describe('SauceDemo E2E Test', () => {
  test('should complete the full checkout flow', async ({ page }) => {
    // Navigate to the SauceDemo website
    await page.goto('https://www.saucedemo.com/');

    // Log in with valid credentials
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Verify successful login by checking the URL
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Add a product to the cart
    await page.click('.btn_inventory'); // Clicks the first "Add to cart" button
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // Navigate to the cart page
    await page.click('.shopping_cart_link');

    // Verify that the correct page is loaded
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

    // Proceed to checkout
    await page.click('#checkout');

    // Verify that the checkout information page is loaded
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');

    // Fill in shipping information
    await page.fill('#first-name', 'John');
    await page.fill('#last-name', 'Doe');
    await page.fill('#postal-code', '12345');

    // Continue to the next step
    await page.click('#continue');

    // Verify that the checkout overview page is loaded
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

    // Finish the purchase
    await page.click('#finish');

    // Verify that the order confirmation page is loaded
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');

    // Check for the "THANK YOU FOR YOUR ORDER" message
    const thankYouMessage = await page.locator('.complete-header').textContent();
    expect(thankYouMessage).toBe('Thank you for your order!');
  });
});
