import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  firstName = '#first-name';
  lastName = '#last-name';
  zipCode = '#postal-code';
  continueButton = '#continue';
  finishButton = '#finish';
  successMessage = '.complete-header';

  async fillCheckoutInfo(fn: string, ln: string, zip: string) {
    await this.page.fill(this.firstName, fn);
    await this.page.fill(this.lastName, ln);
    await this.page.fill(this.zipCode, zip);
    await this.page.click(this.continueButton);
  }

  async finishOrder() {
    await this.page.click(this.finishButton);
  }

  async verifyOrderSuccess() {
    await expect(this.page.locator(this.successMessage))
      .toHaveText('Thank you for your order!');
  }
}
