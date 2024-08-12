
export interface User {
    firstName: string;
    lastName: string;
    documentType: DocumentType;
    documentNumber: string;
    email: string;
    phoneNumber: string;
    billingInfo: BillingInfo;
    images: string[];
  }
  
  export interface BillingInfo {
    firstName: string;
    lastName: string;
    documentType: DocumentType;
    documentNumber: string;
    email: string;
    phoneNumber: string;
  }
  
  export type DocumentType = 'cedula' | 'ruc' | 'passport';
  