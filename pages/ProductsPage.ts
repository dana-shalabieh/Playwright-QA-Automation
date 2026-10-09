import { Page, Locator } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly products: Locator;
    readonly sortDropdown: Locator;
    readonly addToCartButton: Locator;
    readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;

        this.products = page.locator('.inventory_item');
        this.sortDropdown = page.locator('.product_sort_container');
        this.addToCartButton = page.locator('.inventory_item').first().getByRole('button', { name: /Add to cart/i });
        this.cartLink = page.locator('.shopping_cart_link');
    }

    async getProductCount() {
        return await this.products.count();
    }

    async sortProducts(option: string) {
        await this.sortDropdown.selectOption(option);
    }
    async getProductPrices() {
        return await this.products.locator('.inventory_item_price').allTextContents();
    }
    async addFirstProductToCart() {
        await this.addToCartButton.click();
    }

    async openCart() {
        await this.cartLink.click();
    }
}
