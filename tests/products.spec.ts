import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('Complete SauceDemo shopping workflow', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const checkoutPage = new CheckoutPage(page);

    // 1. Open SauceDemo
    await page.goto('/');

    // 2. Login
    await loginPage.login('standard_user', 'secret_sauce');

    // 3. Verify Products page
    await expect(page).toHaveURL(/inventory/);

    // 4. Verify products are loaded
    const productCount = await productsPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);

    // 5. Sort products by price high to low
    await productsPage.sortProducts('hilo');

    // 6. Verify sorting option
    await expect(productsPage.sortDropdown).toHaveValue('hilo');

    // 7. Add first product to cart
    await productsPage.addFirstProductToCart();

    // 8. Open cart
    await productsPage.openCart();

    // 9. Verify Cart page
    await expect(page).toHaveURL(/cart/);
    await checkoutPage.checkout('Dana', 'Test', '12345');

    await checkoutPage.finishOrder();

    await expect(checkoutPage.successHeader).toBeVisible();

    await page.pause();
});