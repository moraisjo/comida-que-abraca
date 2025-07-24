import { useState, useCallback } from "react";
import DonationRepository from "../../../data/repository/donation";
import { Response } from "../../../data/model/response";

interface UseDonationServiceReturn {
  loading: boolean;
  error: Error | null;
  createDonation: (data: any) => Promise<Response | undefined>;
  // aqui você pode adicionar outros métodos (ex: getAllDonations)
}

export function useDonationService(): UseDonationServiceReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createDonation = useCallback(async (data: any) => {
    setLoading(true);
    setError(null);

    try {
      const response = await DonationRepository.createDonation(data);
      return response;
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    createDonation,
  };
}
