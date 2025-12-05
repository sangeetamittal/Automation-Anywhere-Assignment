// tests/ui/messageBox.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/loginPage');
const { AutomationPage } = require('../../pages/automationPage');
const { MessageBoxPage } = require('../../pages/messageBoxPage');

test.describe('Use Case 1 — Message Box Task (UI Automation)', () => {
  test('Create a Task Bot and add Message Box action', async ({ page }) => {
    const login = new LoginPage(page);
    const automation = new AutomationPage(page);
    const messageBox = new MessageBoxPage(page);

    // 1) Login
    await login.login();

    // 2) Navigate to Automation
    await automation.goToAutomation();

    // 3) Open Create -> Task Bot
    await automation.openCreateTaskBot();

    // 4) Create a bot with unique name and wait for editor
    const botName = `Playwright-MessageBox-${Date.now()}`;
    await automation.createBot(botName);

    // 5) Add Message Box action on the editor
    await messageBox.addMessageBoxAction();

    // 6) Configure the Message Box fields on the right panel
    await messageBox.verifyRightPanelAndConfigure();

    // 7) Save the action/configuration
    await messageBox.saveConfiguration();

  });
});
