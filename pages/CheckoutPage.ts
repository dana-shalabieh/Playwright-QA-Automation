import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly checkoutButton: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly successHeader: Locator;

    constructor(page: Page) {
        this.page = page;

        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.finishButton = page.getByRole('button', { name: 'Finish' });
        this.successHeader = page.getByRole('heading', { name: 'Thank you for your order!' });
    }

    async checkout(firstName: string, lastName: string, postalCode: string) {
        await this.checkoutButton.click();

        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);

        await this.continueButton.click();
    }

    async finishOrder() {
        await this.finishButton.click();
    }
}
