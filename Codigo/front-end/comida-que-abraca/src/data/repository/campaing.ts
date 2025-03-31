import axios from "axios";

const API_URL = "http://localhost:8080/campaign-controller";

export const CampaignRepository = {
  createCampaign: async (campaignData: any) => {
    try {
      const response = await axios.post(`${API_URL}/createCampaign`, campaignData);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar campanha:", error);
      throw error;
    }
  },
};
