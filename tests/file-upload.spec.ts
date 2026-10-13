import { test, expect } from '@playwright/test';
import { FileUploadPage } from '../pages/FileUploadPage';

test('Verify file upload works on all browsers', async ({ page }) => {
    const fileUploadPage = new FileUploadPage(page);

    await fileUploadPage.goto();
    await fileUploadPage.uploadFile();
    await fileUploadPage.verifyUploadSuccess('test-file.txt');
});