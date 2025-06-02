import { Page, Locator } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.completeHeader = this.page.getByRole('heading', { name: 'Thank you for your order!' });
  }

  async getCompleteHeaderText() {
    return await this.completeHeader.textContent();
  }
}
