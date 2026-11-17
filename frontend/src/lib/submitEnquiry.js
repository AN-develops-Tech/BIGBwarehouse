let hasWarnedMissingEndpoint = false;

/**
 * Submits an enquiry to the configured endpoint (Formspree or Web3Forms compatible)
 * before handing off to WhatsApp.
 *
 * @param {Object} formData
 * @param {string} formData.full_name
 * @param {string} [formData.company_name]
 * @param {string} formData.phone
 * @param {string} formData.email
 * @param {string} formData.requirement
 * @param {string} [formData.message]
 * @param {string} [formData.website] - Hidden honeypot field
 * @returns {Promise<{ success: boolean, fallback?: boolean, bot?: boolean, status?: number, error?: any }>}
 */
export async function submitEnquiry(formData) {
    // 1. Bot check: if honeypot is filled, silently succeed without making the HTTP POST
    if (formData.website && formData.website.trim() !== '') {
        return { success: true, bot: true };
    }

    const endpoint = import.meta.env?.VITE_ENQUIRY_ENDPOINT;

    // 2. If endpoint is undefined or empty, warn once and fall back to WhatsApp-only
    if (!endpoint || !endpoint.trim()) {
        if (!hasWarnedMissingEndpoint) {
            console.warn('[submitEnquiry] VITE_ENQUIRY_ENDPOINT is not defined. Falling back to WhatsApp-only dispatch.');
            hasWarnedMissingEndpoint = true;
        }
        return { success: true, fallback: true };
    }

    // 3. Prepare payload and timeout controller (8 seconds)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const payload = {
        full_name: formData.full_name,
        company_name: formData.company_name || 'N/A',
        phone: formData.phone,
        email: formData.email,
        requirement: formData.requirement,
        message: formData.message || 'None',
        page_url: typeof window !== 'undefined' ? window.location.href : '',
        submitted_at: new Date().toISOString(),
        website: formData.website || ''
    };

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'omit',
            signal: controller.signal,
            body: JSON.stringify(payload)
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            console.error(`[submitEnquiry] Endpoint responded with status ${response.status}`);
            return { success: false, status: response.status };
        }

        return { success: true, status: response.status };
    } catch (err) {
        clearTimeout(timeoutId);
        console.error('[submitEnquiry] Network error or timeout during enquiry submission:', err);
        return { success: false, error: err };
    }
}
