import { ContactDTO, HubSpotField } from "../dto/contact.dto";
import { HubSpotRepository } from "../repositories/hubspot.repository";

export class ContactService {
  private repo = new HubSpotRepository();

  async saveInquiry(data: ContactDTO, pageUri: string): Promise<void> {
    const fields: HubSpotField[] = [
      { name: "firstname", value: data.name },
      { name: "email", value: data.email },
      ...(data.companyName ? [{ name: "company", value: data.companyName }] : []),
      ...(data.website ? [{ name: "website", value: data.website }] : []),
      ...(data.country ? [{ name: "country", value: data.country }] : []),
      ...(data.message ? [{ name: "message", value: data.message }] : []),
    ];

    await this.repo.submit(fields, pageUri);
  }
}
