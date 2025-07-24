import { Partner } from '../data/model/partner';
import api from '../api/axios';

const API_URL = '/api/partners';

export const createPartner = async (partner: Partner) => {
  const response = await api.post(API_URL, partner);
  return response.data;
};