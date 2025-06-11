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

interface PartnerDonationResponse {
    id: number;
    name: string;
    requestDate: string;
    delivery: string;
    status: string;
    photoUrl: string;
    donorName: string;
    campaignName?: string;
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
export interface CreateDonationResponse {
  name: string;
  arriving_date: string;
  delivery: 'PICKUP' | 'DELIVERY';
  photo_url: string;
  campaign_id: number;
  status: 'PENDING';
  donor_id: number;
}
  
export type { DonationResponse, PendingDonationResponse, DonationDeliveryPendingResponse, PartnerDonationResponse }