
import { test, expect } from '@playwright/test';
import { IFramePage } from '../pages/IFramePage';

test('Verify iFrame Text Editing', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/iframe');

    const iframePage = new IFramePage(page);
    
    await iframePage.writeText('Hello Dana - Playwright iFrame Test');

    await expect(iframePage.editor)
        .toHaveText('Hello Dana - Playwright iFrame Test');

    await page.pause();

});

