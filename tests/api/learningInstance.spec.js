// tests/ui/learningInstance.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/loginPage');
const { AiPage } = require('../../pages/aiPage');
const { LearningInstancePage } = require('../../pages/learningInstancePage');
const ApiValidator = require('../../helpers/apiValidator');

test.describe('Use Case 3 - Learning Instance API flow (API Automation)', () => {
  test('Create a Learning Instance and Validate it', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const aiPage = new AiPage(page);
    const liPage = new LearningInstancePage(page);

    // 1. login
    await loginPage.login();

    // 2. Open AI tab and Document Automation submenu
    await aiPage.openAiTab();
    await aiPage.openDocumentAutomation();

    // 3. Click create, fill name, go next and finalize creation
    await liPage.clickCreate();
    const instanceName = `auto-instance-${Date.now()}`;
    await liPage.fillInstanceName(instanceName);

    const apiWait = ApiValidator.validateLearningInstancesList(page, instanceName, 60000);
    await liPage.submitInstance();

    // 4. API Validation
    const apiResult = await apiWait;
    console.log('API validation:', apiResult);

    console.log("API Validation Result:", apiResult);

    // 5. Assert the instance is present in the table
    const createdLocator = await liPage.assertInstanceCreated(instanceName, 30000);
    await expect(createdLocator).toBeVisible();

  });
});