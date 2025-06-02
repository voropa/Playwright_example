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
}
