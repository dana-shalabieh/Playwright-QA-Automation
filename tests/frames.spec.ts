import { test, expect } from '@playwright/test';
import { FramesPage } from '../pages/FramesPage';

test('Verify Nested Frames content on all browsers', async ({ page }) => {
    const framesPage = new FramesPage(page);

    await framesPage.goto();

    // التحقق من الـ frame الأيسر
    const leftText = await framesPage.getLeftFrameText();
    expect(leftText.trim()).toContain('LEFT');

    // التحقق من الـ frame الأوسط
    const middleText = await framesPage.getMiddleFrameText();
    expect(middleText.trim()).toContain('MIDDLE');

    // التحقق من الـ frame الأيمن
    const rightText = await framesPage.getRightFrameText();
    expect(rightText.trim()).toContain('RIGHT');

    // التحقق من الـ frame السفلي
    const bottomText = await framesPage.getBottomFrameText();
    expect(bottomText.trim()).toContain('BOTTOM');
});