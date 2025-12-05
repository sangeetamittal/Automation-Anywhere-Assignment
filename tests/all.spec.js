// tests/all.spec.js
const { test } = require('@playwright/test');

test.describe.serial('Full test suite (sequential)', () => {
  require('./ui/messageBox.spec.js');
  require('./ui/formUpload.spec.js');
  require('./api/learningInstance.spec.js');
});