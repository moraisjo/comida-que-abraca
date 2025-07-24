import { campaignRepository } from "../../../data/repository/campaing";
import { Campaign } from "../../../data/model/campaign";

export const useCampaignService = () => {
  const getActiveCampaigns = async (): Promise<Campaign[]> => {
    try {
      return await campaignRepository.getActiveCampaigns();
    } catch (error) {
      return [];
    }
  };

  const getCampaignById = async (id: number): Promise<Campaign | null> => {
    try {
      return await campaignRepository.getCampaignById(id);
    } catch (error) {
      return null;
    }
  };

  return {
    getActiveCampaigns,
    getCampaignById,
  };
};
