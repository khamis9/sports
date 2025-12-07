import axios from 'axios';

// Use environment variable for API URL, fallback to relative path in production
const API_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
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

// Handle 401 errors (unauthorized) - only logout for protected endpoints
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const url = error.config?.url || '';
      // Only logout if hitting protected endpoints, not public ones
      const protectedEndpoints = ['/auth/profile', '/auth/logout', '/bookings', '/badges', '/challenges', '/matches', '/admin'];
      const isProtectedEndpoint = protectedEndpoints.some(endpoint => url.includes(endpoint));
      
      if (isProtectedEndpoint) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
};

// Courts API
export const courtsAPI = {
  getAll: () => api.get('/courts'),
  getById: (id) => api.get(`/courts/${id}`),
  create: (data) => api.post('/admin/courts', data),
  update: (id, data) => api.put(`/admin/courts/${id}`, data),
  delete: (id) => api.delete(`/admin/courts/${id}`),
};

// Bookings API
export const bookingsAPI = {
  create: (data) => api.post('/bookings', data),
  getMyBookings: () => api.get('/bookings/my'),
  getAllBookings: () => api.get('/admin/bookings'),
  approve: (id) => api.put(`/admin/bookings/${id}/approve`),
  reject: (id) => api.put(`/admin/bookings/${id}/reject`),
};

// Match Results API
export const matchesAPI = {
  create: (data) => api.post('/matches', data),
};

// Badges API
export const badgesAPI = {
  getMyBadges: () => api.get('/badges/my'),
};

// Challenges API
export const challengesAPI = {
  getAll: () => api.get('/challenges'),
  complete: (id) => api.post(`/challenges/${id}/complete`),
};

// Leaderboard API
export const leaderboardAPI = {
  getLeaderboard: () => api.get('/leaderboard'),
};

export default api;
