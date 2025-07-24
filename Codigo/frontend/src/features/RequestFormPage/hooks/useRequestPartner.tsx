import { useState } from "react";
import PartnerRequestsRepository from "../../../data/repository/partnerRequests";
import { PartnerRequest } from "../../../data/model/request";

export function useRequestPartner() {
  const [requests, setRequests] = useState<PartnerRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const getAllRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await PartnerRequestsRepository.getAllRequests();
      setRequests(response);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao buscar todas as solicitações."
      );
    } finally {
      setLoading(false);
    }
  };

  const getRequestsByUser = async (userId: number) => {
    setLoading(true);
    setError(null);
    try {
      const requests = await PartnerRequestsRepository.getRequestsByUser(
        userId
      );

      setRequests(requests);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao buscar solicitações do usuário."
      );
    } finally {
      setLoading(false);
    }
  };

  const createRequest = async (
    userId: number,
    requestData: { itemType: string; description: string }
  ) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const response = await PartnerRequestsRepository.createRequest(
        userId,
        requestData
      );
      setRequests((prev) => [...prev, response.request]);
      setMessage(response.message);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao criar solicitação."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    requests,
    loading,
    error,
    message,
    getAllRequests,
    getRequestsByUser,
    createRequest,
  };
}
