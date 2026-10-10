import { test, expect } from '@playwright/test';
import path from 'path';

test('Verify file upload', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/upload');

    const filePath = path.resolve('test-file.txt');

    await page.locator('#file-upload').setInputFiles(filePath);

    await page.locator('#file-submit').click();

    await expect(page.locator('#uploaded-files')).toContainText('test-file.txt');

    await page.pause();
});