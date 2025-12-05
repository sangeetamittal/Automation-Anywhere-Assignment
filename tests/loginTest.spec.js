// tests/loginTest.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');

test('Login works correctly', async ({ page }) => {
  const login = new LoginPage(page);
  await login.login();
});
