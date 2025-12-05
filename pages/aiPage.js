// pages/aiPage.js
class AiPage {
  constructor(page) {
    this.page = page;
    this.aiTab = page.locator('button[aria-label="AI"]');
    this.documentAutomationMenu = page.locator('a[aria-label="Document Automation"]');
    this.frame = page.frameLocator('iframe[src="/cognitive/iqbotui/#/navigations/iqbot/pages/learning-instances"]');
    this.createButton = this.frame.locator('button:visible', { hasText: 'Create Learning Instance' }).first();
  }

  async openAiTab() {
    await this.aiTab.waitFor({ state: 'visible', timeout: 30000 });
    await this.aiTab.click();
  }

  async openDocumentAutomation() {
    await this.documentAutomationMenu.waitFor({ state: 'visible', timeout: 30000 });
    await this.documentAutomationMenu.click();
    await this.page.waitForSelector('iframe[src="/cognitive/iqbotui/#/navigations/iqbot/pages/learning-instances"]', { state: 'attached', timeout: 30000 });
    await this.createButton.waitFor({state: 'visible', timeout: 30000});
  }
}

module.exports = { AiPage };