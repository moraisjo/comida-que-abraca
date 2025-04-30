import DonationRepository from "../../../data/repository/donation";

export const UseDonationService = {
  getPendingDonations: async () => {
    try {
      return await DonationRepository.getPendingDonations();
    } catch (error) {
      throw new Error("Erro ao buscar doações pendentes.");
    }
  },

  getPendingDelivery: async () => {
    try {
      return await DonationRepository.getPendingDelivery();
    } catch (error) {
      throw new Error("Erro ao buscar doações pendentes de entrega.");
    }
  },

  updateDonationStatus: async (donationId: number, status: string) => {
    try {
      return await DonationRepository.updateDonationStatus(donationId, status);
    } catch (error) {
      throw new Error("Erro ao atualizar o status da doação.");
    }
  },

  updateDonationStatusStock: async (donationId: number, status: string) => {
    try {
      return await DonationRepository.updateDonationStatusStock(
        donationId,
        status
      );
    } catch (error) {
      throw new Error("Erro ao atualizar o status da doação para o estoque.");
    }
  },
};
