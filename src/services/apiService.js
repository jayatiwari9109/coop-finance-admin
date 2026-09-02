import axios from 'axios';

const API_BASE_URL = 'https://api.coopfinance.com/v1'; // Client server endpoint

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Auth token inject karne ke liye
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('coop_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Auth & Core Endpoints
export const authAPI = {
  login: (credentials) => apiClient.post('/auth/login', credentials),
  logout: () => apiClient.post('/auth/logout'),
};

export const customerAPI = {
  getAll: () => apiClient.get('/customers'),
  create: (data) => apiClient.post('/customers', data),
};

export const agentAPI = {
  getAll: () => apiClient.get('/agents'),
  create: (data) => apiClient.post('/agents', data),
};

export const loanAPI = {
  getAll: () => apiClient.get('/loans'),
  create: (data) => apiClient.post('/loans', data),
};

export default apiClient;