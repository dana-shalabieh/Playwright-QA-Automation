
import { Page, Locator } from '@playwright/test';

export class IFramePage {
    readonly page: Page;
    readonly editor: Locator;

    constructor(page: Page) {
        this.page = page;

        this.editor = page
            .frameLocator('#mce_0_ifr')
            .locator('body#tinymce');
    }

    async writeText(text: string) {
        await this.editor.click();
        await this.editor.clear();
        await this.editor.fill(text);
    }
}

