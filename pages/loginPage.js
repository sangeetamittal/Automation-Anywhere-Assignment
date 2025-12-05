// pages/loginPage.js
class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('input[name="username"]'); 
    this.passwordInput = page.locator('input[name="password"]'); 
    this.loginButton = page.locator('button[type="submit"]'); 
  }

  async goto() {
    await this.page.goto('/#/login?');
  }

  async login(username = process.env.AA_USERNAME, password = process.env.AA_PASSWORD) {
    await this.goto();
    await this.emailInput.waitFor({ state: 'visible', timeout: 45000 });
    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.getByLabel('Explore').waitFor({ state: 'visible', timeout: 60000 });
  }
}

module.exports = { LoginPage };