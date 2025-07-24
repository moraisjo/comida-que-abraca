// src/services/donorsService.tsx

import api from '../../api/axios';
import { User } from '../model/user';

const API_URL = '/user';

export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>(`${API_URL}/all`);
  return response.data;
};
