import { Page, Locator } from '@playwright/test';

export class ProductDetailPage {
  readonly page: Page;
  readonly itemName: Locator;
  readonly itemDescription: Locator;
  readonly itemPrice: Locator;
  readonly backToProductsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // For the name, description, and price, let's use more specific class-based locators first,
    // as their roles might not be unique or easily distinguishable on the page.
    this.itemName = page.locator('div.inventory_details_name');
    this.itemDescription = page.locator('div.inventory_details_desc');
    this.itemPrice = page.locator('div.inventory_details_price');
    this.backToProductsButton = page.getByRole('button', { name: 'Back to products' });
  }

  async getItemName(): Promise<string | null> {
    return await this.itemName.textContent();
  }

  async getItemDescription(): Promise<string | null> {
    return await this.itemDescription.textContent();
  }

  async getItemPrice(): Promise<string | null> {
    return await this.itemPrice.textContent();
  }

  async goBackToProducts(): Promise<void> {
    await this.backToProductsButton.click();
  }
}
