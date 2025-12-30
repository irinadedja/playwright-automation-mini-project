import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { userData } from '../../utils/testData';

test('Purchase cheapest items flow', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await page.goto('/');

  await loginPage.login(userData.username, userData.password);
  await loginPage.verifyLoginSuccess();

  await inventoryPage.sortByLowestPrice();
  await inventoryPage.addCheapestItemsToCart(2);
  await inventoryPage.goToCart();

  await cartPage.verifyItemsInCart(2);
  await cartPage.checkout();

  await checkoutPage.fillCheckoutInfo(
    userData.firstName,
    userData.lastName,
    userData.zipCode
  );

  await checkoutPage.finishOrder();
  await checkoutPage.verifyOrderSuccess();
});
