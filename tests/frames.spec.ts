
import { test, expect } from '@playwright/test';
import { FramesPage } from '../pages/FramesPage';

test('Verify Nested Frames', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/nested_frames');

    const framesPage = new FramesPage(page);

    // Verify Left Frame
    await expect(framesPage.leftFrame)
        .toHaveText('LEFT');

    // Verify Middle Frame
    await expect(framesPage.middleFrame)
        .toHaveText('MIDDLE');

    // Verify Right Frame
    await expect(framesPage.rightFrame)
        .toHaveText('RIGHT');

    // Verify Bottom Frame
    await expect(framesPage.bottomFrame)
        .toHaveText('BOTTOM');

    await page.pause();

});

