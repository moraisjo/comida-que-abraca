import axios from 'axios';
import { Partner } from '../model/Partner';

const API_URL = 'http://localhost:8080/partners';

export const createPartner = async (partner: Partner) => {
  const response = await axios.post(`${API_URL}/create`, partner);
  return response.data;
};