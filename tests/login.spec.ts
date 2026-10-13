import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Login to SauceDemo with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // 1. الانتقال إلى صفحة تسجيل الدخول
    await loginPage.goto();

    // 2. تنفيذ عملية تسجيل الدخول
    await loginPage.login('standard_user', 'secret_sauce');

    // 3. التحقق من نجاح الدخول (التحقق من الرابط)
    await expect(page).toHaveURL(/.*inventory/, { timeout: 15000 });

    // 4. التحقق الإضافي: التأكد من أن صفحة المنتجات تم تحميلها فعلياً
    await expect(page.locator('[data-test="title"]')).toContainText('Products', { timeout: 15000 });
});