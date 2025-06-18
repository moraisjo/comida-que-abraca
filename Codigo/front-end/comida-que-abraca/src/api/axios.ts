import axios from 'axios';
import { API_URL } from '../shared/utils/apiUrl';

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const storedToken = localStorage.getItem('token');
    if (
      storedToken &&
      config.url &&
      !config.url.endsWith('/login')
    ) {
      // Set the Authorization header directly
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${storedToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;