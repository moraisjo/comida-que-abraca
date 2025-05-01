import axios from "axios";
import { DonationResponse, PendingDonationResponse, DonationDeliveryPendingResponse } from "../model/donation";
import { Response } from "../model/response";

class DonationRepository {
  async getAllDonations(): Promise<DonationResponse[]> {
    try {
      const response = await axios.get<DonationResponse[]>(`http://localhost:8080/api/doacoes`);
      if (Array.isArray(response.data)) {
        return response.data;
      } else {
        throw new Error("Resposta da API em formato inválido");
      }
    } catch (error) {
      console.error("Erro ao buscar as doações:", error);
      throw error;
    }
  }

  async getPendingDonations(): Promise<PendingDonationResponse[]> {
    try {
      const response = await axios.get<PendingDonationResponse[]>(
        "http://localhost:8080/api/donation/pending-donations"
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar doações pendentes:", error);
      return [];
    }
  }

  async getPendingDelivery(): Promise<DonationDeliveryPendingResponse[]> {
    try {
      const response = await axios.get<DonationDeliveryPendingResponse[]>(
        "http://localhost:8080/api/donation/pending-deliveries"
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar doações pendentes de entrega:", error);
      return [];
    }
  }

  async updateDonationStatus(
    donationId: number,
    status: string
  ): Promise<Response> {
    try {
      const response = await axios.put<Response>(
        `http://localhost:8080/api/donation/update-status/${donationId}/${status}`
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar status da doação:", error);
      throw error;
    }
  }

  async updateDonationStatusStock(donationId: number,
    status: string): Promise<Response> {
      try {
        const response = await axios.put<Response>(
          `http://localhost:8080/api/donation/update-stock/${donationId}/${status}`
        );
        return response.data;
      } catch (error) {
        console.error("Erro ao atualizar status da doação:", error);
        throw error;
      }
    }

  async getStockDonations(): Promise<DonationResponse[]> {
    try {
      const response = await axios.get<DonationResponse[]>(
        "http://localhost:8080/api/doacoes/stock-donations"
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar doações em estoque:", error);
      return [];
    }
  }
}

export default new DonationRepository();
