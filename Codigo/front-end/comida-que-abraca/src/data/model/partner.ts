import { Address } from "./Address";

interface Partner {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: Address;
    wantsToDonate: boolean;
    wantsToReceiveDonations: boolean;
    registrationDate: string;
    legalEntityType: string;
}

export type { Partner }

