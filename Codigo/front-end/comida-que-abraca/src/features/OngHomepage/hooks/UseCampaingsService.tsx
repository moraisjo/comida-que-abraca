import { CampaignRepository } from "../../../data/repository/campaing";

export const CampaignService = {
  createCampaign: async (campaignData: any) => {
    try {
      return await CampaignRepository.createCampaign(campaignData);
    } catch (error) {
      throw new Error("Erro ao criar campanha. Tente novamente.");
    }
  },
};
