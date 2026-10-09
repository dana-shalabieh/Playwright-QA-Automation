// JavaScript source code

import { Page, Locator } from '@playwright/test';

export class FramesPage {
    readonly page: Page;
    readonly leftFrame: Locator;
    readonly middleFrame: Locator;
    readonly rightFrame: Locator;
    readonly bottomFrame: Locator;

    constructor(page: Page) {
        this.page = page;

        this.leftFrame = page
            .frameLocator('frame[name="frame-top"]')
            .frameLocator('frame[name="frame-left"]')
            .locator('body');

        this.middleFrame = page
            .frameLocator('frame[name="frame-top"]')
            .frameLocator('frame[name="frame-middle"]')
            .locator('body');

        this.rightFrame = page
            .frameLocator('frame[name="frame-top"]')
            .frameLocator('frame[name="frame-right"]')
            .locator('body');

        this.bottomFrame = page
            .frameLocator('frame[name="frame-bottom"]')
            .locator('body');
    }
}
