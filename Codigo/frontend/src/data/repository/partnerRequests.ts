import api from "../../api/axios";
import { PartnerRequest } from "../model/request";  // importar interface com chaves

const API_URL = "/requests";

class PartnerRequestsRepository {

  async createRequest(userId: number, requestData: { itemType: string; description: string }) {
    try {
      const response = await api.post(API_URL, {
        ...requestData,
        userId,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getAllRequests(): Promise<PartnerRequest[]> {
    try {
      const response = await api.get<PartnerRequest[]>(API_URL);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getRequestsByUser(userId: number): Promise<PartnerRequest[]> {
    try {
      const response = await api.get<PartnerRequest[]>(`${API_URL}/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new PartnerRequestsRepository();
