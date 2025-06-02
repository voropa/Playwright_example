import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';
import { CartPage } from './pages/CartPage';
import { CheckoutStepOnePage } from './pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from './pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from './pages/CheckoutCompletePage';

test.describe('SauceDemo E2E Test with POM', () => {
  test('should complete the full checkout flow', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    // Navigate to the SauceDemo website and log in
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // Verify successful login by checking the URL
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Add a product to the cart
    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    await expect(inventoryPage.shoppingCartBadge).toHaveText('1');

    // Navigate to the cart page
    await inventoryPage.goToCart();

    // Verify that the correct page is loaded
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

    // Proceed to checkout
    await cartPage.goToCheckout();

    // Verify that the checkout information page is loaded
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');

    // Fill in shipping information
    await checkoutStepOnePage.fillShippingInformation('John', 'Doe', '12345');

    // Continue to the next step
    await checkoutStepOnePage.continueToNextStep();

    // Verify that the checkout overview page is loaded
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

    // Finish the purchase
    await checkoutStepTwoPage.finishCheckout();

    // Verify that the order confirmation page is loaded
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');

    // Check for the "THANK YOU FOR YOUR ORDER" message
    const thankYouMessage = await checkoutCompletePage.getCompleteHeaderText();
    expect(thankYouMessage).toBe('Thank you for your order!');
  });
});
