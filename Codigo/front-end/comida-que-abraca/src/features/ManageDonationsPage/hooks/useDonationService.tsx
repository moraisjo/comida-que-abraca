import { useState } from "react";
import DonationRepository from "../../../data/repository/donation";
import { DonationResponse } from "../../../data/model/donation";

const useDonationService = () => {
  const [donations, setDonations] = useState<DonationResponse[]>([]);
  const [errorOnDonations, setErrorOnDonations] = useState<string | null>(null);

  const fetchAllDonations = async () => {
    setErrorOnDonations(null);
    try {
      const data = await DonationRepository.getAllDonations(); // Sem "new" aqui
      setDonations(data);
    } catch (err: any) {
      setErrorOnDonations("Ocorreu um erro ao buscar as doações.");
    }
  };

  return { donations, errorOnDonations, fetchAllDonations };
};

export default useDonationService;