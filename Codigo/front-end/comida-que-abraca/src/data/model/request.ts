export interface User {
    name: string;
    email: string;
    phone: string;
    address: string;
  }
  
  export interface PartnerRequest {
    id: number;
    itemType: string;
    description: string;
    requestDate: string; 
    user: User;
  }
  