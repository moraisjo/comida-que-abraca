import axios from "axios";
import { Campaign, CreateCampaignRequest, PaginatedResponse} from "../model/campaign";
import { Response } from "../model/response";

const API_URL = "http://localhost:8080/campaign";

class CampaignRepository {
  async createCampaign(campaignData: CreateCampaignRequest): Promise<Response> {
    const response = await axios.post<Response>(`${API_URL}/create-campaign`, campaignData);
    return response.data;
  }

  async getActiveCampaigns(): Promise<PaginatedResponse<Campaign>> {
    try {
      const response = await axios.get<PaginatedResponse<Campaign>>(`${API_URL}/active-campaigns`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar campanhas ativas:", error);
      throw error;
    }
  }  
}

export const campaignRepository = new CampaignRepository();
