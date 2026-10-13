import { test, expect } from '@playwright/test';

test('User can interact with frames and iframes', async ({ page }) => {
    test.setTimeout(120000);

    // Nested Frames
    await page.goto('https://the-internet.herokuapp.com/nested_frames', {
        waitUntil: 'domcontentloaded',
        timeout: 90000
    });

    // انتظار إضافي لتحميل الـ frames
    await page.waitForTimeout(5000);

    const topFrame = page.frameLocator('frame[name="frame-top"]');

    // استخدام textContent() مع trim() بدلاً من toContainText
    const leftText = await topFrame.frameLocator('frame[name="frame-left"]').locator('body').textContent();
    expect(leftText?.trim()).toBe('LEFT');

    const middleText = await topFrame.frameLocator('frame[name="frame-middle"]').locator('body').textContent();
    expect(middleText?.trim()).toBe('MIDDLE');

    const rightText = await topFrame.frameLocator('frame[name="frame-right"]').locator('body').textContent();
    expect(rightText?.trim()).toBe('RIGHT');

    // Bottom Frame
    const bottomFrame = page.frameLocator('frame[name="frame-bottom"]');
    const bottomText = await bottomFrame.locator('body').textContent();
    expect(bottomText?.trim()).toBe('BOTTOM');

    // iFrame
    await page.goto('https://the-internet.herokuapp.com/iframe', {
        waitUntil: 'domcontentloaded',
        timeout: 90000
    });

    // انتظار تحميل الـ iframe
    await page.waitForTimeout(2000);

    const editor = page.frameLocator('iframe[id^="mce_"]').locator('body#tinymce');

    await expect(editor).toBeVisible({ timeout: 30000 });
    await expect(editor).toContainText('Your content goes here.', {
        timeout: 30000
    });
});