interface Campaign {
  id: number;
  name: string;
  description: string;
  address: string;
  startDate: string; 
  endDate: string;
  photoUrl: string;
  status: "ACTIVE" | "CANCELED" | "FINISHED";
}

interface CreateCampaignRequest {
  name: string;
  description: string;
  address: string;
  startDate: string;
  endDate: string;
  photoUrl: string;  
  status: "ACTIVE"; 
}

export type { Campaign, CreateCampaignRequest };
