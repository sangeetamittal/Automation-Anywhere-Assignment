// pages/automationPage.js
class AutomationPage {
  constructor(page) {
    this.page = page;
    this.automationNav = page.locator('a[name="automations"], a[aria-label="Automation"], a[title="Automation"]').first(); // example
    this.createDropdown = page.getByLabel('Create');
    this.taskBotOption = page.getByText(/Task\s*Bot(?:\u2026|\.\.\.)?/i).first();
    this.formOption = page.getByText(/Form(?:\u2026|\.\.\.)?/i).first();
  }
 
  async goToAutomation() {
    await this.automationNav.waitFor({ state: 'visible', timeout: 60000 });
    await this.automationNav.scrollIntoViewIfNeeded();
    await this.automationNav.click();
    await this.createDropdown.waitFor({ state: 'visible', timeout: 30000 });
  }

  async openCreateTaskBot() {
    await this.createDropdown.click();
    await this.taskBotOption.click();
    await this.page.locator('input[name="name"]').waitFor({ state: 'visible', timeout: 30000 });
  }

  async createBot(taskName = 'Playwright - Task Bot') {
    const nameInput = this.page.locator('input[name="name"]');
    await nameInput.waitFor({ state: 'visible', timeout: 15000 });
    await nameInput.fill(taskName);

    const createBtn = this.page.locator('button[aria-label="Create & edit"]');
    await createBtn.waitFor({ state: 'visible', timeout: 10000 });
    await createBtn.click();

    const editorReady = this.page.locator(
      'input[placeholder="Search actions"]'
    );
    await this.page.waitForTimeout(400);

    // wait for any of the editor-ready selectors to become visible
    await editorReady.first().waitFor({ state: 'visible', timeout: 40000 });
  }

  async openCreateForm() {
    await this.createDropdown.click();
    await this.formOption.click();
    await this.page.locator('input[name="name"]').waitFor({ state: 'visible', timeout: 30000 });
  }

  async createForm(formName) {
    const nameInput = this.page.locator('input[name="name"]');
    await nameInput.waitFor({ state: 'visible', timeout: 30000 });
    await nameInput.fill(formName);

    const createBtn = this.page.locator('button[aria-label="Create & edit"]');
    await createBtn.waitFor({ state: 'visible', timeout: 10000 });
    await createBtn.click({timeout: 20000});
  }
}

module.exports = { AutomationPage };