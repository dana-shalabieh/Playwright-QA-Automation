import { test, expect } from '@playwright/test';
import { DynamicLoadingPage } from '../pages/DynamicLoadingPage';

test('Verify dynamic loading', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

    const dynamicLoadingPage = new DynamicLoadingPage(page);

    await dynamicLoadingPage.startLoading();

    await page.pause();

    await expect(dynamicLoadingPage.finishText).toBeVisible();

});