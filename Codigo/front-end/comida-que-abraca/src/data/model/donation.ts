import { Campaign } from "./campaign";
import { Partner } from "./partner";

interface DonationResponse {
    id: number;
    name: string;
    arrivingDate: string;
    delivery: string;
    status: string;
    donor: Partner;
    beneficiary?: Partner;
    campaign?: Campaign
}

export type { DonationResponse }