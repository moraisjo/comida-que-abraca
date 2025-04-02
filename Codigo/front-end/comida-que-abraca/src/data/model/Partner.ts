export interface Partner {
    name: string;
    email: string;
    phone: string;
    wantsToDonate: boolean;
    wantsToReceiveDonations: boolean;
    legalEntityType: 'COMPANY' | 'GOVERNMENT' | 'ONG'; // baseado no enum do banco
  }