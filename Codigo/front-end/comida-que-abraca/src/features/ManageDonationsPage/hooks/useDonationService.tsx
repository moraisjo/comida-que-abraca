import { useState, useCallback } from "react";
import DonationRepository from "../../../data/repository/donation";
import { DonationResponse } from "../../../data/model/donation";

const useDonationService = () => {
  const [donations, setDonations] = useState<DonationResponse[]>([]);
  const [errorOnDonations, setErrorOnDonations] = useState<string | null>(null);

  const getAllDonations = useCallback(async (): Promise<DonationResponse[]> => {
    setErrorOnDonations(null);
    try {
      const data = await DonationRepository.getAllDonations();
      setDonations(data);
      return data;
    } catch (error) {
      setErrorOnDonations("Erro ao buscar todas as doações.");
      return [];
    }
  }, []);

  const getDonationsStock = async () => {
    try {
      return await DonationRepository.getDonationsStock();
    } catch (error) {
      throw new Error("Erro ao buscar doações pendentes.");
    }
  };

  const getPendingDonations = async () => {
    try {
      return await DonationRepository.getPendingDonations();
    } catch (error) {
      throw new Error("Erro ao buscar doações pendentes.");
    }
  };

  const getPendingDelivery = async () => {
    try {
      return await DonationRepository.getPendingDelivery();
    } catch (error) {
      throw new Error("Erro ao buscar doações pendentes de entrega.");
    }
  };

  const updateDonationStatus = async (donationId: number, status: string) => {
    try {
      return await DonationRepository.updateDonationStatus(donationId, status);
    } catch (error) {
      throw new Error("Erro ao atualizar o status da doação.");
    }
  };

  const updateDonationStatusStock = async (
    donationId: number,
    status: string
  ) => {
    try {
      return await DonationRepository.updateDonationStatusStock(
        donationId,
        status
      );
    } catch (error) {
      throw new Error("Erro ao atualizar o status da doação para o estoque.");
    }
  };

  return {
    donations,
    errorOnDonations,
    getAllDonations,
    getDonationsStock,
    getPendingDonations,
    getPendingDelivery,
    updateDonationStatus,
    updateDonationStatusStock,
  };
};

export default useDonationService;
