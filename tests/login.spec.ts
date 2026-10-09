import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Login to SauceDemo with valid credentials', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await page.goto('/');

    await loginPage.login('standard_user', 'secret_sauce');
 
    await expect(page).toHaveURL(/inventory/);
    await page.pause();
});
