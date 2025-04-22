import DonationRepository from "../../../data/repository/donation";

export const UseDonationService = {
  getPendingDonations: async () => {
    try {
      return await DonationRepository.getPendingDonations();
    } catch (error) {
      throw new Error("Erro ao buscar doações pendentes.");
    }
  },
};
