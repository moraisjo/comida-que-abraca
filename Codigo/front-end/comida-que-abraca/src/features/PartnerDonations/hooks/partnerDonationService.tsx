import { useState, useCallback } from "react";
import DonationRepository from "../../../data/repository/donation";
import { DonationResponse } from "../../../data/model/donation";

const useDonationService = () => {
  const [donations, setDonations] = useState<DonationResponse[]>([]);
  const [errorOnDonations, setErrorOnDonations] = useState<string | null>(null);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return {
    getAllDonations,
    beneficiaries,
  };
};

export default useDonationService;
