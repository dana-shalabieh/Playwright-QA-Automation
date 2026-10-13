import { test, expect } from '@playwright/test';
import { DynamicLoadingPage } from '../pages/DynamicLoadingPage';

test('Verify dynamic loading works on all browsers', async ({ page }) => {
    const dynamicLoadingPage = new DynamicLoadingPage(page);

    await dynamicLoadingPage.goto();

    await expect(dynamicLoadingPage.startButton).toBeVisible({ timeout: 15000 });

    await dynamicLoadingPage.startLoading();

    await expect(dynamicLoadingPage.finishText).toBeVisible({ timeout: 20000 });

    await expect(dynamicLoadingPage.finishText).toContainText('Hello World!');
});