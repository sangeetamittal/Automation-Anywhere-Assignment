// pages/formPage.js
// const {path} = require('path');

class FormPage {
  constructor(page) {
    this.page = page;
    this.iframeSelector = 'iframe[src^="/modules/attended/#/file/form/"]';
    this.frame = page.frameLocator(this.iframeSelector);
    this.toolboxScroller = this.frame.locator('div.editor-palette-section__scroller');
    // this.toolboxScroller = this.frame.locator(`div.editor-palette-section > div.editor-palette-section__scroller > div.editor-palette-section__list`);
    this.toolboxTextbox = this.frame.locator('button:has(span[data-text="Text box"].editor-palette-item__child-label)');
    this.toolboxFileUpload = this.frame.locator('button:has(span[data-text="Select File"].editor-palette-item__child-label)');
    this.canvas = this.frame.locator(`div.formcanvas-container > div.formcanvas-content > div.formcanvas__leftpane`);
    this.saveButton = this.frame.locator('button[aria-label="save"], button[name="save"]');
    this.toast = page.locator('.toast-message')
    // this.fileInputHidden = page.locator('input[type="file"]'); // file input inside the form
  }

  async addTextboxAndFileUpload() {

    await this.canvas.waitFor({ state: 'visible', timeout: 30000 });

    // --- FILE UPLOAD ---
    await this.toolboxFileUpload.waitFor({ state: 'attached', timeout: 30000 });
    await this.toolboxFileUpload.waitFor({ state: 'visible', timeout: 30000 });
    await this.toolboxFileUpload.dragTo(this.canvas, { timeout: 30000, force: true });

    // --- TEXTBOX ---
    // await this.toolboxScroller.scrollIntoViewIfNeeded(); 
    // await this.toolboxTextbox.waitFor({ state: 'attached', timeout: 30000 });
    // await this.toolboxTextbox.waitFor({ state: 'visible', timeout: 30000 });
    // await this.toolboxTextbox.dragTo(this.canvas, { timeout: 30000, force: true });
  }

  // async fillTextbox(text = 'Sample input from automation') {
  //   const textbox = this.frame.locator('input[aria-label="TextBox"]');
  //   await textbox.fill(text);
  // }

  // async uploadFile(relativeFilePath = './test-data/testFile.pdf') {
  //   const filePath = path.resolve(process.cwd(), relativeFilePath);
  //   try {
  //     await this.fileInputHidden.setInputFiles(filePath);
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  async saveForm() {
    await this.saveButton.waitFor({ state: 'visible', timeout: 30000 });
    await this.saveButton.click({ timeout: 30000 });
    await this.toast.waitFor({ state: 'visible', timeout: 30000 })
  }
}

module.exports = { FormPage };