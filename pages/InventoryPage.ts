import { Page, expect } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  sortDropdown = '.product_sort_container';
  inventoryItems = '.inventory_item';
  itemPrice = '.inventory_item_price';
  addToCartButton = 'button[id^="add-to-cart"]';
  cartIcon = '.shopping_cart_link';

  async sortByLowestPrice() {
    await this.page.selectOption(this.sortDropdown, 'lohi');
  }

  async addCheapestItemsToCart(count: number) {
    const items = this.page.locator(this.inventoryItems);
    for (let i = 0; i < count; i++) {
      await items.nth(i).locator(this.addToCartButton).click();
    }
  }

  async goToCart() {
    await this.page.click(this.cartIcon);
  }
}
