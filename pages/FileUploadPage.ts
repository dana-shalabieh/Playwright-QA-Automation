import { Page, Locator } from '@playwright/test';

export class JavaScriptAlertsPage {
    readonly page: Page;
    readonly alertButton: Locator;
    readonly confirmButton: Locator;
    readonly promptButton: Locator;
    readonly result: Locator;

    constructor(page: Page) {
        this.page = page;

        this.alertButton = page.getByRole('button', { name: 'Click for JS Alert' });
        this.confirmButton = page.getByRole('button', { name: 'Click for JS Confirm' });
        this.promptButton = page.getByRole('button', { name: 'Click for JS Prompt' });
        this.result = page.locator('#result');
    }

    async handleAlert() {
        this.page.once('dialog', dialog => {
            dialog.accept();
        });

        await this.alertButton.click();
    }

    async handleConfirm() {
        this.page.once('dialog', dialog => {
            dialog.accept();
        });

        await this.confirmButton.click();
    }

    async handlePrompt(text: string) {
        this.page.once('dialog', dialog => {
            dialog.accept(text);
        });

        await this.promptButton.click();
    }
}