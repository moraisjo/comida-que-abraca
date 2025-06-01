import { useState, useCallback } from "react";
import PartnerRequestsRepository from "../../../data/repository/partnerRequests"; // Ajuste o path
import { PartnerRequest } from "../../../data/model/request";

export function useRequestPartner() {
  const [requests, setRequests] = useState<PartnerRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllRequests = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await PartnerRequestsRepository.getAllRequests();
      setRequests(data);
    } catch (err) {
      setError("Erro ao carregar solicitações");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    requests,
    loading,
    error,
    getAllRequests,
  };
}
