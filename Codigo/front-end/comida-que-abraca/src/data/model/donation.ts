import { Campaign } from "./campaign";
import { Partner } from "./partner";

export enum Category {
  FOOD = "Alimento não perecível",
  PERISHABLE_FOOD = "Alimento perecível",
  BED_BATH = "Cama e banho",
  CLEANING = "Limpeza",
  PERSONAL_CARE = "Cuidados pessoais",
  ELECTRONICS = "Eletrônicos",
  FURNITURE = "Móveis",
  HYGIENE = "Higiene",
  CLOTHING = "Vestuário",
  APPLIANCES = "Eletrodomésticos"
}

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
    description: string;
    category: Category;
    quantity: number;
    contactInfo: string;
    deliveryDescription: string;
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