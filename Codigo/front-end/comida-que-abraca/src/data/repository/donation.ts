import axios from "axios";
import { DonationResponse } from "../model/donation";

class DonationRepository {

    // Método para buscar agendamentos pelo ID do fisioterapeuta
    async getAllDonations(): Promise<DonationResponse[]> {
        try {
            const response = await axios.get<DonationResponse[]>(`http://localhost:8080/api/doacoes`);
            // Verificar se a resposta está no formato correto
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
}


export default DonationRepository;