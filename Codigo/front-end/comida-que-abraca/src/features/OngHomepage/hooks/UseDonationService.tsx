import axios from "axios";

import DonationRepository from "../../../data/repository/donation";
import { Response } from "../../../data/model/response";

export const UseDonationService = {
  getPendingDonations: async () => {
    try {
      return await DonationRepository.getPendingDonations();
    } catch (error) {
      throw new Error("Erro ao buscar doações pendentes.");
    }
  },

  updateDonationStatus: async (
    donationId: number,
    status: string
  ): Promise<Response> => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/donation/update-status/${donationId}/${status}`
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar status da doação:", error);
      throw new Error("Erro ao atualizar o status da doação.");
    }
  },
};
