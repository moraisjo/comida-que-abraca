// src/services/donorsService.tsx

import axios from 'axios';
import { User } from '../model/user';

const API_URL = 'http://localhost:8080';

export const getAllUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(`${API_URL}/user/all`);
  return response.data;
};
