import api from "../../api/axios";
import { Campaign, CreateCampaignRequest, EditCampaignRequest} from "../model/campaign";
import { Response } from "../model/response";

const API_URL = "/campaign";

class CampaignRepository {
  async createCampaign(campaignData: CreateCampaignRequest): Promise<Response> {
    const response = await api.post<Response>(`${API_URL}/create-campaign`, campaignData);
    return response.data;
  }

  async editCampaign(id: number, campaignData: EditCampaignRequest): Promise<Response> {
    const response = await api.put<Response>(`${API_URL}/edit-campaign/${id}`, campaignData);
    return response.data;
  }

  async cancelCampaign(id: number): Promise<Response> {
    const response = await api.put<Response>(`${API_URL}/cancel-campaign/${id}`);
    return response.data;
  }

  async getCampaigns(): Promise<Campaign[]> {
    try {
      const response = await api.get<Campaign[]>(`${API_URL}/campaigns`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getActiveCampaigns(): Promise<Campaign[]> {
    try {
      const response = await api.get<Campaign[]>(`${API_URL}/active-campaigns`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getInactiveCampaigns(): Promise<Campaign[]> { 
    try {
      const response = await api.get<Campaign[]>(`${API_URL}/inactive-campaigns`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getCampaignById(id: number): Promise<Campaign> {
    try {
      const response = await api.get<Campaign>(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const campaignRepository = new CampaignRepository();
