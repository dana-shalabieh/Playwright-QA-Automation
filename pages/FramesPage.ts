import { Page, Frame, Locator } from '@playwright/test';

export class FramesPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/nested_frames', {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        });

        // انتظار حتى تصبح جميع الـ frames متاحة
        await this.page.waitForTimeout(2000);
    }

    // البحث عن frame بالاسم
    private findFrame(parentFrame: Frame | Page, frameName: string): Frame | null {
        if (parentFrame instanceof Page) {
            return parentFrame.frames().find(f => f.name() === frameName) || null;
        } else {
            return parentFrame.childFrames().find(f => f.name() === frameName) || null;
        }
    }

    // الحصول على محتوى الـ frame الأيسر
    async getLeftFrameText(): Promise<string> {
        const topFrame = this.findFrame(this.page, 'frame-top');
        if (!topFrame) throw new Error('frame-top not found');

        const leftFrame = this.findFrame(topFrame, 'frame-left');
        if (!leftFrame) throw new Error('frame-left not found');

        return await leftFrame.locator('body').textContent() || '';
    }

    // الحصول على محتوى الـ frame الأوسط
    async getMiddleFrameText(): Promise<string> {
        const topFrame = this.findFrame(this.page, 'frame-top');
        if (!topFrame) throw new Error('frame-top not found');

        const middleFrame = this.findFrame(topFrame, 'frame-middle');
        if (!middleFrame) throw new Error('frame-middle not found');

        return await middleFrame.locator('body').textContent() || '';
    }

    // الحصول على محتوى الـ frame الأيمن
    async getRightFrameText(): Promise<string> {
        const topFrame = this.findFrame(this.page, 'frame-top');
        if (!topFrame) throw new Error('frame-top not found');

        const rightFrame = this.findFrame(topFrame, 'frame-right');
        if (!rightFrame) throw new Error('frame-right not found');

        return await rightFrame.locator('body').textContent() || '';
    }

    // الحصول على محتوى الـ frame السفلي
    async getBottomFrameText(): Promise<string> {
        const bottomFrame = this.findFrame(this.page, 'frame-bottom');
        if (!bottomFrame) throw new Error('frame-bottom not found');

        return await bottomFrame.locator('body').textContent() || '';
    }
}