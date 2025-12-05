// pages/learningInstancePage.js
class LearningInstancePage {
    constructor(page) {
        this.page = page;
        this.frame = page.frameLocator('iframe[src="/cognitive/iqbotui/#/navigations/iqbot/pages/learning-instances"]');
        this.createButton = this.frame.locator('button:visible', { hasText: 'Create Learning Instance' }).first();
        this.instanceNameInput = this.frame.getByRole('textbox', { name: 'Name' });
        this.nextButton = this.frame.getByRole('button', { name: 'Next' });
        this.submitCreate = this.frame.locator('button:visible', { hasText: 'Create' }).first();
        // this.submitCreate = this.frame.locator('button[aria-label="Create"]').first();
        // this.submitCreate = page.frameLocator('iframe[src="/cognitive/iqbotui/#/navigations/iqbot/pages/learning-instances"]').locator('button:visible', { hasText: 'Create' }).first();
        // this.submitCreate = page.frameLocator('iframe[src="/cognitive/iqbotui/#/navigations/iqbot/pages/learning-instances"]').getByRole('button', { name: 'Create' });
        // this.submitCreate = page.locator('button[aria-label="Create"]');
        this.instanceLabel = (name) => this.frame.locator(
            '.datatable-column-content >> span.rio-link__label',
            { hasText: name }
        );
    }

    async clickCreate() {
        await this.page.waitForTimeout(150);
        await this.createButton.waitFor({ state: 'visible', timeout: 60000 });
        await this.createButton.hover();
        // await this.frame.waitForTimeout(150);
        await this.page.waitForTimeout(150);
        try {
            await this.createButton.click({ timeout: 10000 });
        } catch (e) {
            console.warn('Regular click failed, trying DOM click', e);
            const handle = await this.createButton.elementHandle();
            await handle.evaluate(el => el.click());
        }
    }

    // async fillAndSubmitInstance(name) {
    //     await this.instanceNameInput.waitFor({ state: 'visible', timeout: 30000 });
    //     await this.instanceNameInput.fill(name);
    //     await this.nextButton.waitFor({ state: 'visible', timeout: 30000 });
    //     await this.nextButton.click();
    //     await this.submitCreate.waitFor({ state: 'visible', timeout: 60000 });
    //     // await this.frame.waitForTimeout(150);
    //     await this.submitCreate.click({ timeout: 30000 });
    //     // const handle = await this.submitCreate.elementHandle();
    //     // await handle.evaluate(el => el.click());
    //     // await this.submitCreate.hover();
    //     // await this.page.waitForTimeout(150);
    //     // await this.submitCreate.click({ force: true, timeout: 30000 });
    //     // try {
    //     //     await this.submitCreate.click({ timeout: 30000 });
    //     // } catch (e) {
    //     //     // If page got closed, throw clearer error
    //     //     if (this.page.isClosed && this.page.isClosed()) {
    //     //         throw new Error('Browser/page closed unexpectedly while clicking Create.');
    //     //     }
    //     //     // Fallback: force click inside the frame (bypasses pointer checks)
    //     //     await this.submitCreate.click({ force: true });

    //     //     // console.warn('Regular click failed, trying DOM click', e);
    //     //     // const handle = await this.submitCreate.elementHandle();
    //     //     // await handle.evaluate(el => el.click());
    //     // }
    // }

    // async fillAndSubmitInstance(name) {
    //     // fill name and go next
    //     await this.instanceNameInput.waitFor({ state: 'visible', timeout: 30000 });
    //     await this.instanceNameInput.fill(name);

    //     await this.nextButton.waitFor({ state: 'visible', timeout: 30000 });
    //     await this.nextButton.click();

    //     // wait for the Create button to appear, then force-click it to bypass overlays
    //     await this.submitCreate.waitFor({ state: 'visible', timeout: 60000 });
    //     await this.page.waitForTimeout(150);
    //     await this.submitCreate.click({ force: true});
    // }

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