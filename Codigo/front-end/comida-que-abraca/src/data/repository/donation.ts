import axios from "axios";
import { DonationResponse, PendingDonationResponse } from "../model/donation";

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
        "http://localhost:8080/api/doacoes/pending-donations"
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar doações pendentes:", error);
      return [];
    }
  }
}

export default new DonationRepository();
