// pages/learningInstancePage.js
class LearningInstancePage {
    constructor(page) {
        this.page = page;
        this.frame = page.frameLocator('iframe[src="/cognitive/iqbotui/#/navigations/iqbot/pages/learning-instances"]');
        this.createButton = this.frame.locator('button:visible', { hasText: 'Create Learning Instance' }).first();
        this.instanceNameInput = this.frame.getByRole('textbox', { name: 'Name' });
        this.nextButton = this.frame.getByRole('button', { name: 'Next' });
        this.submitCreate = this.frame.locator('button:visible', { hasText: 'Create' }).first();
        this.instanceLabel = (name) => this.frame.locator(
            '.datatable-column-content >> span.rio-link__label',
            { hasText: name }
        );
    }

    async clickCreate() {
        await this.page.waitForTimeout(150);
        await this.createButton.waitFor({ state: 'visible', timeout: 60000 });
        await this.createButton.hover();
        await this.page.waitForTimeout(150);
        try {
            await this.createButton.click({ timeout: 10000 });
        } catch (e) {
            console.warn('Regular click failed, trying DOM click', e);
            const handle = await this.createButton.elementHandle();
            await handle.evaluate(el => el.click());
        }
    }

    async fillInstanceName(name) {
        // only fill the name (this will trigger availability checks)
        await this.instanceNameInput.waitFor({ state: 'visible', timeout: 30000 });
        await this.instanceNameInput.fill(name);
        // small pause to allow availability requests to fire (optional)
        await this.page.waitForTimeout(150);
        await this.nextButton.waitFor({ state: 'visible', timeout: 30000 });
        await this.nextButton.click();
    }

    async submitInstance() {
        await this.submitCreate.waitFor({ state: 'visible', timeout: 60000 });
        await this.page.waitForTimeout(150);
        // use force click for reliability (you already used this)
        await this.submitCreate.click({ force: true, timeout: 30000 });
    }


    async assertInstanceCreated(name) {
        const locator = this.instanceLabel(name);
        await locator.waitFor({ state: 'visible', timeout: 30000 });
        return locator;
    }
}

module.exports = { LearningInstancePage };