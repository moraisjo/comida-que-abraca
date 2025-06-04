import { useState, useCallback } from "react";
import DonationRepository from "../../../data/repository/donation";
import { DonationResponse, CreateDonationResponse } from "../../../data/model/donation";


const useDonationService = () => {
  const [donations, setDonations] = useState<DonationResponse[]>([]);
  const [errorOnDonations, setErrorOnDonations] = useState<string | null>(null);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);



  const createDonation = async (data: CreateDonationResponse) => {
    try {
      const response = await DonationRepository.createDonation(data);
      console.log(data);
      return response;
    } catch (error) {
      throw new Error("Erro ao criar doação.");
    }
  };

  const getAllDonations = useCallback(async (): Promise<DonationResponse[]> => {
    setErrorOnDonations(null);
    try {
      const data = await DonationRepository.getAllDonations();
      setDonations(data);
      return data;
    } catch {
      setErrorOnDonations("Erro ao buscar todas as doações.");
      return [];
    }
  }, []);

  const fetchAllDonations = async () => {
    setErrorOnDonations(null);
    try {
      const data = await DonationRepository.getAllDonations();
      setDonations(data);
    } catch {
      setErrorOnDonations("Ocorreu um erro ao buscar as doações.");
    }
  };

  const getDonationsStock = async () => {
    try {
      return await DonationRepository.getDonationsStock();
    } catch {
      throw new Error("Erro ao buscar doações em estoque.");
    }
  };

  const getPendingDonations = async () => {
    try {
      return await DonationRepository.getPendingDonations();
    } catch {
      throw new Error("Erro ao buscar doações pendentes.");
    }
  };

  const getPendingDelivery = async () => {
    try {
      return await DonationRepository.getPendingDelivery();
    } catch {
      throw new Error("Erro ao buscar doações pendentes de entrega.");
    }
  };

  const updateDonationStatus = async (donationId: number, status: string) => {
    try {
      return await DonationRepository.updateDonationStatus(donationId, status);
    } catch {
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
    } catch {
      throw new Error("Erro ao atualizar o status da doação para o estoque.");
    }
  };


  return {
    donations,
    errorOnDonations,
    loading,
    error,
    getAllDonations,
    getDonationsStock,
    getPendingDonations,
    getPendingDelivery,
    updateDonationStatus,
    updateDonationStatusStock,
    fetchAllDonations,
    beneficiaries,
    createDonation
  };
};

export default useDonationService;
