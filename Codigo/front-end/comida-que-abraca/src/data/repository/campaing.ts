import axios from "axios";
import { Campaign, CreateCampaignRequest } from "../model/campaign";
import { Response } from "../model/response";

const API_URL = "http://localhost:8080/campaign";

class CampaignRepository {
  async createCampaign(campaignData: CreateCampaignRequest): Promise<Response> {
    const response = await axios.post<Response>(`${API_URL}/create-campaign`, campaignData);
    return response.data;
  }

  async getActiveCampaigns(): Promise<Campaign[]> {
    try {
      const response = await axios.get<Campaign[]>(`${API_URL}/active-campaigns`);
      if (Array.isArray(response.data)) {
        return response.data;
      } else {
        throw new Error("Erro ao realizar conexao com a api");
      }
    } catch (error) {
      console.error("Erro ao buscar campanhas ativas:", error);
      throw error;
    }
  }
}

export const campaignRepository = new CampaignRepository();
