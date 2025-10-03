import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getCurrentUser: () => api.get('/auth/me')
};

// Market API
export const marketAPI = {
  getAllPrices: () => api.get('/market/prices'),
  getPrice: (symbol) => api.get(`/market/prices/${symbol}`),
  getHistoricalData: (symbol, days = 7) => 
    api.get(`/market/history/${symbol}`, { params: { days } }),
  getSupportedCryptos: () => api.get('/market/supported')
};

// Trading API
export const tradingAPI = {
  buy: (data) => api.post('/trading/buy', data),
  sell: (data) => api.post('/trading/sell', data),
  getTransactions: (params) => api.get('/trading/transactions', { params })
};

export default api;