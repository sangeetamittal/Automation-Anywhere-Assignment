class ApiValidator {

    /**
     * Validates the GET /learninginstances response after creation.
     * Includes:
     *  - HTTP status
     *  - Response time
     *  - Instance exists in body
     *  - Correct name & fields
     */
    static async validateLearningInstancesList(page, expectedName, timeout = 60000) {

        const start = Date.now(); // measure response time manually

        const response = await page.waitForResponse(resp => {
            const url = resp.url().toLowerCase();
            try {
                const url = resp.url().toLowerCase();
                return url.includes('/learninginstances/list') && resp.status() === 200;
            } catch {
                return false;
            }
        }, { timeout });

        const responseTime = Date.now() - start;

        // Status check
        if (response.status() !== 200) {
            throw new Error(`GET /learninginstances/list returned ${response.status()} instead of 200`);
        }

        // Parse body
        let body;
        try {
            body = await response.json();
        } catch (e) {
            const raw = await response.text().catch(() => '');
            throw new Error(`Failed to parse JSON from /learninginstances/list. Raw: ${raw.slice(0, 1000)}`);
        }

        if (!body || !Array.isArray(body.list)) {
            const preview = JSON.stringify(body).slice(0, 1000);
            throw new Error(`GET /learninginstances/list response has no 'list' array. Preview: ${preview}`);
        }

        // Find your instance
        const match = body.list.find(item => {
            if (!item || typeof item !== 'object') return false;
            if (typeof item.name === 'string' && item.name === expectedName) return true;
            if (typeof item.instanceName === 'string' && item.instanceName === expectedName) return true;
            if (typeof item.displayName === 'string' && item.displayName === expectedName) return true;
            return false;
        });

        if (!match) {
            const sample = body.list.slice(0, 10).map(i => (i && (i.name || i.displayName || i.instanceName)) || JSON.stringify(i)).join(', ');
            throw new Error(`Learning instance "${expectedName}" not found in /learninginstances/list. Sample names: ${sample}`);
        }

        if (!match.id) {
            throw new Error(`Instance "${expectedName}" found but missing 'id'`);
        }
        // You can extend with other field checks here (status, id, createdOn, etc.)

        return {
            status: response.status(),
            timeMs: responseTime,
            instance: match,
            fullResponse: body
        };
    }
}

module.exports = ApiValidator;