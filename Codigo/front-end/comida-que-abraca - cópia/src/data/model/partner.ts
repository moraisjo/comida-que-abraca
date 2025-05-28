
 interface Partner {
     id: number;
     name: string;
     email: string;
     password: string;
     phone: string;
     address: string;
     wantsToDonate: boolean;
     wantsToReceiveDonations: boolean;
     registrationDate: string;
     legalEntityType: string;
 }
 
 export type { Partner }