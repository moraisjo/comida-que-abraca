import { campaignRepository } from "../../../data/repository/campaing";
import { Campaign } from "../../../data/model/campaign";

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
