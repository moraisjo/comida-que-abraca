import { useCallback } from "react";
import DonationRepository from "../../../data/repository/donation";
import { PartnerDonationResponse } from "../../../data/model/donation";

const useDonationService = () => {
  const getDonationsByPartnerUserId = useCallback(
    async (partnerUserId: number): Promise<PartnerDonationResponse[]> => {
      try {
        const data = await DonationRepository.getDonationsByPartnerUserId(
          partnerUserId
        );
        return data;
      } catch {
        throw new Error("Erro ao buscar doações do parceiro.");
      }
    },
    []
  );

  return { getDonationsByPartnerUserId };
};

export default useDonationService;
