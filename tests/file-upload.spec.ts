import { test, expect } from '@playwright/test';
import * as path from 'path';

test('User can upload a file using file chooser', async ({ page }) => {
    test.setTimeout(120000);

    await page.goto('https://the-internet.herokuapp.com/upload', {
        waitUntil: 'networkidle',  // تغيير من 'load' إلى 'networkidle'
        timeout: 90000
    });

    // انتظار إضافي للتأكد من تحميل الصفحة بالكامل (WebKit يحتاج هذا)
    await page.waitForTimeout(3000);

    const uploadInput = page.locator('#file-upload');

    // زيادة الـ timeout من 30000 إلى 60000
    await expect(uploadInput).toBeVisible({ timeout: 60000 });

    const testFilePath = path.join(process.cwd(), 'tests', 'test-file.txt');

    await uploadInput.setInputFiles(testFilePath);

    const uploadButton = page.getByRole('button', { name: 'Upload' });
    await expect(uploadButton).toBeVisible({ timeout: 10000 });
    await uploadButton.click();

    await page.waitForURL('**/upload', { timeout: 30000 });

    await expect(page.locator('h3')).toHaveText('File Uploaded!', {
        timeout: 30000
    });

    await expect(page.locator('#uploaded-files')).toContainText('test-file.txt', {
        timeout: 10000
    });
});