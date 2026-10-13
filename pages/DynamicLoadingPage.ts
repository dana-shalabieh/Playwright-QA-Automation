import { Page, Locator } from '@playwright/test';

export class DynamicLoadingPage {
    readonly page: Page;
    readonly startButton: Locator;
    readonly finishText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.startButton = page.locator('#start button');
        this.finishText = page.locator('#finish h4');
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/dynamic_loading/2', {
            waitUntil: 'networkidle',
            timeout: 60000
        });

        // انتظار إضافي للتأكد من تحميل الزر
        await this.page.waitForSelector('#start button', {
            state: 'visible',
            timeout: 10000
        });
    }

    async startLoading() {
        await this.startButton.click();
    }
}