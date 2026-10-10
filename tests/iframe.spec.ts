
import { test, expect } from '@playwright/test';
import { IFramePage } from '../pages/IFramePage';

test('Verify iframe editor is read-only', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/iframe');

    const iframePage = new IFramePage(page);

    await expect(iframePage.editor).toHaveAttribute(
        'contenteditable',
        'false'
    );

    await page.pause();
});

