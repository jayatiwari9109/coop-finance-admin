const API_BASE_URL = import.meta.env.VITE_API_BASE_URL 
  ? `${import.meta.env.VITE_API_BASE_URL}/api`
  : 'https://coop-finance-backend.vercel.app/api';

// Custom lightweight fetch handler without external npm packages
const apiClient = {
  async get(url, config = {}) {
    const token = localStorage.getItem('coop_token') || localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...config.headers,
      },
    });
    const data = await response.json();
    return { data, status: response.status, ok: response.ok };
  },

  async post(url, body, config = {}) {
    const token = localStorage.getItem('coop_token') || localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...config.headers,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return { data, status: response.status, ok: response.ok };
  }
};

export const authAPI = {
  login: (credentials) => apiClient.post('/auth/login', credentials),
  logout: () => apiClient.post('/auth/logout'),
};

export default apiClient;