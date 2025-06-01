import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
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