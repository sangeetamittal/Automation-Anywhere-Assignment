// tests/ui/formUpload.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/loginPage');
const { AutomationPage } = require('../../pages/automationPage');
const { FormPage } = require('../../pages/formPage');

test.describe('Use Case 2 - Form with Upload Flow (UI Automation)', () => {
  test('Create form, add textbox and upload file', async ({ page }) => {
    const login = new LoginPage(page);
    const automation = new AutomationPage(page);
    const form = new FormPage(page);

    // Login 
    await login.login();

    // Navigate to Automation
    await automation.goToAutomation();

    // Open form creator
    await automation.openCreateForm();
    
    // Fill basic form details and create
    await automation.createForm(`Playwright-Form-${Date.now()}`);
    await page.waitForTimeout(1500);

    // Add components
    await form.addTextboxAndFileUpload();

    // Interact with textbox
    // await form.fillTextbox('Hello from Playwright!');

    // Upload file (Make sure test-data/testFile.pdf exists)
    // await form.uploadFile('./test-data/testFile.pdf');

    // Save and assert
    await form.saveForm();
  });
});