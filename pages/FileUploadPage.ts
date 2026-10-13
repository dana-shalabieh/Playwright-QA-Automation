import { Page, Locator, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

export class FileUploadPage {
    readonly page: Page;
    readonly fileInput: Locator;
    readonly submitButton: Locator;
    readonly uploadedFilesText: Locator;
    readonly testFilePath: string;

    constructor(page: Page) {
        this.page = page;
        this.fileInput = page.locator('#file-upload');
        this.submitButton = page.locator('#file-submit');
        this.uploadedFilesText = page.locator('#uploaded-files');

        this.testFilePath = path.join(process.cwd(), 'test-file.txt');

        if (!fs.existsSync(this.testFilePath)) {
            fs.writeFileSync(this.testFilePath, 'محتوى تجريبي');
        }
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/upload', {
            waitUntil: 'domcontentloaded',
            timeout: 90000
        });
    }

    async uploadFile() {
        await this.fileInput.setInputFiles(this.testFilePath);
        await this.submitButton.click();

        // انتظار حتى تظهر صفحة النجاح
        await expect(this.uploadedFilesText).toBeVisible({ timeout: 20000 });
    }

    async verifyUploadSuccess(fileName: string = 'test-file.txt') {
        await expect(this.uploadedFilesText).toContainText(fileName, { timeout: 10000 });
    }
}