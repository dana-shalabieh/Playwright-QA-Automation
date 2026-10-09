import { test, expect } from '@playwright/test';
import { JavaScriptAlertsPage } from '../pages/JavaScriptAlertsPage';

test('Verify JavaScript Alerts', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    const alertsPage = new JavaScriptAlertsPage(page);

    // Alert
    await alertsPage.handleAlert();

    await expect(alertsPage.result)
        .toHaveText('You successfully clicked an alert');


    // Confirm
    await alertsPage.handleConfirm();

    await expect(alertsPage.result)
        .toHaveText('You clicked: Ok');


    // Prompt
    await alertsPage.handlePrompt('Dana');

    await expect(alertsPage.result)
        .toHaveText('You entered: Dana');

  

});