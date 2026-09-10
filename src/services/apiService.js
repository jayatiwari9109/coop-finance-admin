import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL 
  ? `${import.meta.env.VITE_API_BASE_URL}/api`
  : 'https://coop-finance-backend.vercel.app/api';

// Custom lightweight fetch client
const apiClient = {
  async get(url, config = {}) {
    const token = localStorage.getItem('coop_token') || localStorage.getItem('token');
    const res = await fetch(`${API_BASE_URL}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...config.headers,
      },
    });
    return { data: await res.json(), status: res.status, ok: res.ok };
  },

  async post(url, body, config = {}) {
    const token = localStorage.getItem('coop_token') || localStorage.getItem('token');
    const res = await fetch(`${API_BASE_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...config.headers,
      },
      body: JSON.stringify(body),
    });
    return { data: await res.json(), status: res.status, ok: res.ok };
  }
};

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