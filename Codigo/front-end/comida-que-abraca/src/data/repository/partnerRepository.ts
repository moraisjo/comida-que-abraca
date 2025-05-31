import api from '../../api/axios';
import { Partner } from '../model/partner';

const API_URL = '/partners';

export const createPartner = async (partner: Partner) => {
  const response = await api.post(`${API_URL}/create`, partner);
  return response.data;
};