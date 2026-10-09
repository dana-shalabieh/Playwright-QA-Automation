import { Page, Locator } from '@playwright/test';

export class DynamicLoadingPage {
    readonly page: Page;
    readonly startButton: Locator;
    readonly finishText: Locator;

    constructor(page: Page) {
        this.page = page;

        this.startButton = page.getByRole('button', { name: 'Start' });
        this.finishText = page.getByText('Hello World!');
    }

    async startLoading() {
        await this.startButton.click();
    }

    async isFinished() {
        return await this.finishText.isVisible();
    }
}
