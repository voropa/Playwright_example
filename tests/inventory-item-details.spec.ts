import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';

test.describe('Inventory Item Details Verification', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let productDetailPage: ProductDetailPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    productDetailPage = new ProductDetailPage(page); // Instantiated here for convenience, page context is dynamic

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page.locator('div.inventory_list')).toBeVisible(); // Wait for inventory to load
  });

  test('should verify item details on individual product pages', async ({ page }) => {
    const itemsFromInventory = await inventoryPage.getAllItemDetails();
    expect(itemsFromInventory.length).toBeGreaterThan(0); // Ensure we have items to test

    for (const itemInv of itemsFromInventory) {
      console.log(`Verifying item: ${itemInv.name}`); // Optional: for logging progress

      await inventoryPage.clickItemByName(itemInv.name);

      // Re-initialize ProductDetailPage with the current page context if its state depends on URL/navigation
      // For this POM structure, it's okay as locators are re-evaluated on method calls.
      // However, if ProductDetailPage had complex constructor logic tied to a specific page state,
      // one might re-instantiate: productDetailPage = new ProductDetailPage(page);

      const detailName = await productDetailPage.getItemName();
      const detailDescription = await productDetailPage.getItemDescription();
      const detailPrice = await productDetailPage.getItemPrice();

      expect(detailName, `Name mismatch for ${itemInv.name}`).toBe(itemInv.name);
      expect(detailDescription, `Description mismatch for ${itemInv.name}`).toBe(itemInv.description);
      expect(detailPrice, `Price mismatch for ${itemInv.name}`).toBe(itemInv.price);

      await productDetailPage.goBackToProducts();
      // Ensure we are back on the inventory page before the next iteration
      await expect(page.locator('div.inventory_list')).toBeVisible();
    }
  });
});
