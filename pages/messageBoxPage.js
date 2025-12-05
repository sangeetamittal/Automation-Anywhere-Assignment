// pages/messageBoxPage.js
const { expect } = require('@playwright/test');

class MessageBoxPage {
  constructor(page) {
    this.page = page;
    this.actionsPanelSearch = page.locator('input[placeholder="Search actions"]');
    this.messageBoxAction = page.locator('button:has(span[data-text="Message box"].editor-palette-item__child-label)').first();
    this.addActionDoubleClickTarget = page.locator('button[name="taskbot-node-quick-add"]');
    this.messageTitleInput = page.locator('div[data-name="title"][contenteditable="true"], div[role="textbox"][name="title"][contenteditable="true"]').first();
    this.messageBodyTextarea = page.locator('div[data-name="content"][contenteditable="true"], div[role="textbox"][name="content"]').first();
    this.saveButton = page.locator('button[name="save"]');
    this.messageNode = page.locator(`div[data-label^="Message box"]`).first();
  }

  async addMessageBoxAction() {
    await this.actionsPanelSearch.waitFor({ state: 'visible', timeout: 30000 });
    await this.actionsPanelSearch.fill('Message Box');
    await this.page.waitForTimeout(300);

    await this.messageBoxAction.waitFor({ state: 'visible', timeout: 30000 });
    await this.messageBoxAction.scrollIntoViewIfNeeded();
    try {
      await this.messageBoxAction.dblclick();
    } catch (err) {
      await this.messageBoxAction.dragTo(this.addActionDoubleClickTarget);
    }
    await this.messageTitleInput.waitFor({ state: 'visible', timeout: 30000 });
  }

  async verifyRightPanelAndConfigure(title = 'Hello from automation', body = 'This is an automated message box created by Playwright.') {
    await this.messageTitleInput.waitFor({ state: 'visible', timeout: 30000 });
    try {
      await this.messageTitleInput.fill(title);
    } catch (e) {
      await this.messageTitleInput.click();
      const modifier = process.platform === 'darwin' ? 'Meta' : 'Control';
      await this.page.keyboard.press(`${modifier}+A`);
      await this.page.keyboard.type(title);
    }

    await this.messageBodyTextarea.waitFor({ state: 'visible', timeout: 15000 });
    try {
      await this.messageBodyTextarea.fill(body);
    } catch (e) {
      await this.messageBodyTextarea.click();
      const modifier = process.platform === 'darwin' ? 'Meta' : 'Control';
      await this.page.keyboard.press(`${modifier}+A`);
      await this.page.keyboard.type(body);
    }
  }

  async saveConfiguration() {
    await this.saveButton.waitFor({ state: 'visible', timeout: 30000 });
    await this.saveButton.click();
    const message = 'This is an automated message box created by Playwright';
    await expect(this.messageNode).toHaveAttribute(
      'data-label',
      new RegExp(`Message box.*${message}`)
    );
  }
}

module.exports = { MessageBoxPage };