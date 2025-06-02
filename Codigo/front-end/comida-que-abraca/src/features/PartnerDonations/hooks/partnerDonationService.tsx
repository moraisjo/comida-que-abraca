import { useState, useCallback } from "react";
import DonationRepository from "../../../data/repository/donation";
import { DonationResponse } from "../../../data/model/donation";

const useDonationService = () => {
  const [donations, setDonations] = useState<DonationResponse[]>([]);
  const [errorOnDonations, setErrorOnDonations] = useState<string | null>(null);
  const [beneficiaries, setBeneficiaries] = useState<any[]>([]); // Replace 'any' with the correct type if available

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

  return {
    getAllDonations,
    donations,
    errorOnDonations,
    beneficiaries,
    setBeneficiaries, // Only return this if you need to update beneficiaries from outside
  };
};

export default useDonationService;