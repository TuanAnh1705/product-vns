import { HubSpotField } from "../dto/contact.dto";

export class HubSpotRepository {
  private readonly apiUrl: string;

  constructor() {
    const portalId = process.env.HUBSPOT_PORTAL_ID;
    const formId = process.env.HUBSPOT_FORM_ID;

    if (!portalId || !formId) {
      throw new Error("Missing HUBSPOT_PORTAL_ID or HUBSPOT_FORM_ID env vars");
    }

    this.apiUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;
  }

  async submit(fields: HubSpotField[], pageUri: string): Promise<void> {
    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields,
        context: {
          pageUri,
          pageName: "Vietnam Sourcing Kit",
        },
      }),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      console.error("[HubSpot] submission failed", response.status, body);
      throw new Error(body?.message ?? `HubSpot error ${response.status}`);
    }
  }
}
