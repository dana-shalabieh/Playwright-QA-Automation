import { Page, Locator } from '@playwright/test';

export class IFramePage {
    readonly page: Page;
    readonly editor: Locator;

    constructor(page: Page) {
        this.page = page;

        // استخدام محدد مرن: يبحث عن أي iframe يبدأ الـ ID الخاص به بـ "mce_"
        // هذا يمنع فشل الاختبار إذا تغير الرقم (mce_0, mce_1, إلخ)
        this.editor = page
            .frameLocator('iframe[id^="mce_"]')
            .locator('body#tinymce');
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/iframe', {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        });

        // انتظار قصير جداً لضمان أن محرر TinyMCE انتهى من التحميل الداخلي
        await this.page.waitForTimeout(1000);
    }

    async writeText(text: string) {
        await this.editor.click();
        await this.editor.fill(text);
    }
}