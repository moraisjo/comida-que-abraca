import { Partner } from '../data/model/partner';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/partners';

export const createPartner = async (partner: Partner) => {
  const response = await axios.post(API_URL, partner);
  return response.data;
};