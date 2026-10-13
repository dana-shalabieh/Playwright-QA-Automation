import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 90000,
    expect: {
        timeout: 20000,
    },
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: 1,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',

    use: {
        baseURL: 'https://the-internet.herokuapp.com',
        trace: 'on-first-retry',
        actionTimeout: 20000,
        navigationTimeout: 30000,
        // توحيد حجم الشاشة لجميع المتصفحات
        viewport: { width: 1280, height: 720 },
        // تجاهل أخطاء HTTPS
        ignoreHTTPSErrors: true,
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],
});