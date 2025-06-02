import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
    this.shoppingCartLink = page.locator('a.shopping_cart_link');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
  }

  async addItemToCart() {
    await this.addToCartButton.first().click();
  }

  async addItemToCartByName(itemName: string) {
    const itemContainer = this.page.locator('.inventory_item').filter({ hasText: itemName });
    if (await itemContainer.count() === 0) {
      throw new Error(`Item with name "${itemName}" not found.`);
    }
    await itemContainer.getByRole('button', { name: 'Add to cart' }).click();
  }

  async goToCart() {
    await this.shoppingCartLink.click();
  }

  async getAllItemDetails(): Promise<{ name: string; description: string; price: string }[]> {
    const items = await this.page.locator('div.inventory_item').all();
    const details = [];
    for (const item of items) {
      const name = await item.locator('.inventory_item_name').textContent();
      const description = await item.locator('.inventory_item_desc').textContent();
      const price = await item.locator('.inventory_item_price').textContent();
      if (name && description && price) { // Ensure all details are found
        details.push({ name, description, price });
      }
    }
    return details;
  }

  async clickItemByName(itemName: string) {
    // First, check if the item exists to provide a better error message if not.
    const itemLinkLocator = this.page.locator('.inventory_item_name', { hasText: itemName });
    if (await itemLinkLocator.count() === 0) {
        throw new Error(`Item with name "${itemName}" not found for clicking.`);
    }
    await itemLinkLocator.click();
  }
}
