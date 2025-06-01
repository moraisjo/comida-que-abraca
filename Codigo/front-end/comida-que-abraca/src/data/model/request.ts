export interface User {
  name: string;
  email: string;
  phone: string | null;
  addressId: number | null; 
  address?: string;         
}

export interface PartnerRequest {
  id: number;
  itemType: string;
  description: string;
  requestDate: string;
  user: User;
}

  
  
  