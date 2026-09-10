import axios from 'axios';

// Vercel Environment Variable detect karega, otherwise deployed backend URL ko fallback banayega
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL 
  ? `${import.meta.env.VITE_API_BASE_URL}/api`
  : 'https://coop-finance-backend.vercel.app/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Auth token inject karne ke liye
apiClient.interceptors.request.use((config) => {
  // Check both common token keys for safety
  const token = localStorage.getItem('coop_token') || localStorage.getItem('token');
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