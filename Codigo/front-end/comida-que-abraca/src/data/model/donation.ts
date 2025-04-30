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

interface PendingDonationResponse {
    id: number;
    name: string;
    requestDate: string;
    delivery: string;
    status: string;
    photoUrl: string;
    donorName: string;
    campaignName?: string;
  }

  interface DonationDeliveryPendingResponse {
    id: number;
    name: string;
    requestDate: string;
    delivery: string;
    status: string;
    photoUrl: string;
    donorName: string;
    campaignName?: string;
}
  
export type { DonationResponse, PendingDonationResponse, DonationDeliveryPendingResponse  }