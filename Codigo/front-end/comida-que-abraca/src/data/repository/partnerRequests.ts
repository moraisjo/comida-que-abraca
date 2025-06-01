import api from "../../api/axios";

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
          console.error("Erro ao criar solicitação:", error);
          throw error;
        }
      }      

    async getAllRequests() {
        try {
            const response = await api.get(API_URL);
            return response.data;
        } catch (error) {
            console.error("Erro ao obter solicitações:", error);
            throw error;
        }
    }

    async getRequestsByUser(userId: number) {
        try {
            const response = await api.get(`${API_URL}/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao obter solicitações do usuário:", error);
            throw error;
        }
    }
}

export default new PartnerRequestsRepository();
