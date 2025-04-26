import { campaignRepository } from "../../../data/repository/campaing";
import { CreateCampaignRequest, Campaign } from "../../../data/model/campaign";
import { Response } from "../../../data/model/response";

export const CampaignService = {
  createCampaign: async (
    campaignData: CreateCampaignRequest
  ): Promise<Response> => {
    try {
      return await campaignRepository.createCampaign(campaignData);
    } catch (error) {
      throw new Error("Erro ao criar campanha. Tente novamente.");
    }
  },
};

export const useCampaignService = () => {
  const getActiveCampaigns = async (): Promise<Campaign[]> => {
    try {
      return await campaignRepository.getActiveCampaigns();
    } catch (error) {
      console.error("Erro ao buscar campanhas ativas:", error);
      return [];
    }
  };

  return {
    getActiveCampaigns,
  };
};
