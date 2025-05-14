import { campaignRepository } from "../../../data/repository/campaing";
import {
  CreateCampaignRequest,
  Campaign,
  PaginatedResponse,
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
};

export const useCampaignService = () => {
  const getActiveCampaigns = async (): Promise<PaginatedResponse<Campaign>> => {
    try {
      return await campaignRepository.getActiveCampaigns();
    } catch (error) {
      console.error("Erro ao buscar campanhas ativas:", error);
      return {
        content: [],
        pageable: {
          pageNumber: 0,
          pageSize: 0,
          offset: 0,
          paged: true,
          unpaged: false,
          sort: { empty: true, sorted: false, unsorted: true },
        },
        totalElements: 0,
        totalPages: 0,
        last: true,
        size: 0,
        number: 0,
        sort: { empty: true, sorted: false, unsorted: true },
        first: true,
        numberOfElements: 0,
        empty: true,
      };
    }
  };

  return {
    getActiveCampaigns,
  };
};
