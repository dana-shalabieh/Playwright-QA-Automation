import { test, expect } from '@playwright/test';
import { IFramePage } from '../pages/IFramePage';

test('Verify iframe editor is read-only', async ({ page }) => {
    const iframePage = new IFramePage(page);

    // استخدام دالة goto المنظمة
    await iframePage.goto();

    // التحقق من أن المحرر غير قابل للتعديل (read-only) مع مهلة انتظار 15 ثانية
    await expect(iframePage.editor).toHaveAttribute('contenteditable', 'false', {
        timeout: 15000
    });
});