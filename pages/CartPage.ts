import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  cartItem = '.cart_item';
  checkoutButton = '#checkout';

  async verifyItemsInCart(expectedCount: number) {
    await expect(this.page.locator(this.cartItem)).toHaveCount(expectedCount);
  }

  async checkout() {
    await this.page.click(this.checkoutButton);
  }
}
