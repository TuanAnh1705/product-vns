export interface ContactDTO {
  name: string;
  email: string;
  companyName?: string;
  website?: string;
  country?: string;
  message?: string;
}

export interface HubSpotField {
  name: string;
  value: string;
}
