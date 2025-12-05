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

// 🔵 API RESPONSE URL: https://community.cloud.automationanywhere.digital/cognitive/v3/learninginstances/checkavailability/auto-instance-1764865130024
// Status: 200                                                                    
// Body: {"available":true,"code":"","details":"","message":""}

// 🔵 API RESPONSE URL: https://community.cloud.automationanywhere.digital/cognitive/v3/learninginstances/list
// Status: 200                                                                    
// Body: {"page":{"offset":0,"total":3,"totalFilter":3},"list":[{"id":"C897F316-7E2B-4114-A732-508B7538082A","name":"auto-instance-1764861452119","description":"","providerId":"B4DBACBA-5C86-4E32-A522-F668D48CC74B","providerName":"Automation Anywhere (Pre-trained)","processStatus":"PRIVATE","metricsUploadCount":0,"metricsValidationCount":0,"providerConfig":{"maxFileSizeName":"50MB","maxFileSizeBytes":52428800,"maxPages":100,"maxPagesAsync":100,"fileTypes":["JPEG","PNG","PDF","TIFF"],"note":"true"},"learningInstanceProcesses":{"processes":[{"fileId":32060088,"path":"repository:///Automation%20Anywhere/Bots/Document%20Workspace%20Processes/auto-instance-1764861452119/auto-instance-1764861452119","status":"PRIVATE","isTestModeEnabled":false},{"fileId":32060093,"path":"repository:///Automation%20Anywhere/Bots/Document%20Workspace%20Processes/auto-instance-1764861452119/Test%20Mode-auto-instance-1764861452119/Test%20Mode-auto-instance-1764861452119","status":"PRIVATE","isTestModeEnabled":true}]},"cr