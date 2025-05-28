import { campaignRepository } from "../../../data/repository/campaing";
import {
  CreateCampaignRequest,
  EditCampaignRequest,
  Campaign,
} from "../../../data/model/campaign";
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

  editCampaign: async (
    id: number,
    campaignData: EditCampaignRequest
  ): Promise<Response> => {
    try {
      return await campaignRepository.editCampaign(id, campaignData);
    } catch (error) {
      throw new Error("Erro ao editar campanha. Tente novamente.");
    }
  },

  cancelCampaign: async (id: number): Promise<Response> => {
    try {
      return await campaignRepository.cancelCampaign(id);
    } catch (error) {
      throw new Error("Erro ao cancelar campanha. Tente novamente.");
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

  const getInactiveCampaigns = async (): Promise<Campaign[]> => {
    try {
      return await campaignRepository.getInactiveCampaigns();
    } catch (error) {
      console.error("Erro ao buscar campanhas inativas:", error);
      return [];
    }
  };

  return {
    getActiveCampaigns,
    getInactiveCampaigns,
  };
};
