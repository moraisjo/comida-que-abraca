import api from "../../api/axios";
import { DonationResponse, PendingDonationResponse, DonationDeliveryPendingResponse, PartnerDonationResponse } from "../model/donation";
import { Response } from "../model/response";

const API_URL = "/api/donation";

class DonationRepository {
  async createDonation(data: any): Promise<Response> {
    try {
      const response = await api.post<Response>(`${API_URL}/request`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getDonationsByPartnerUserId(partnerUserId: number): Promise<PartnerDonationResponse[]> {
    try {
      const response = await api.get<PartnerDonationResponse[]>(`${API_URL}/partner/${partnerUserId}`);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async getAllDonations(): Promise<DonationResponse[]> {
    try {
      const response = await api.get<DonationResponse[]>(`${API_URL}`);
      if (Array.isArray(response.data)) {
        return response.data;
      } else {
        throw new Error("Resposta da API em formato inválido");
      }
    } catch (error) {
      throw error;
    }
  }

  async getDonationsStock(): Promise<DonationResponse[]> {
    try {
      const response = await api.get<DonationResponse[]>(
        `${API_URL}/stock`
      );
      return response.data;
    } catch (error) {
      return [];
    }
  }


  async getPendingDonations(): Promise<PendingDonationResponse[]> {
    try {
      const response = await api.get<PendingDonationResponse[]>(
        `${API_URL}/pending-donations`
      );
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async getPendingDelivery(): Promise<DonationDeliveryPendingResponse[]> {
    try {
      const response = await api.get<DonationDeliveryPendingResponse[]>(
        `${API_URL}/pending-deliveries`
      );
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async updateDonationStatus(
    donationId: number,
    status: string
  ): Promise<Response> {
    try {
      const response = await api.put<Response>(
        `${API_URL}/update-status/${donationId}/${status}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateDonationStatusStock(donationId: number,
    status: string): Promise<Response> {
      try {
        const response = await api.put<Response>(
          `${API_URL}/update-stock/${donationId}/${status}`
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    }

  async getStockDonations(): Promise<DonationResponse[]> {
    try {
      const response = await api.get<DonationResponse[]>(
        `${API_URL}/stock-donations`
      );
      return response.data;
    } catch (error) {
      return [];
    }
  }
}

export default new DonationRepository();