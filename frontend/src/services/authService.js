import api from './api';

/**
 * Authentication Service
 * Uses the API instance to communicate with the real backend.
 */
export const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data; // Expects { _id, name, email, token }
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data; // Expects { _id, name, email, token }
  },

  getProfile: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.put('/users/profile', profileData);
    return response.data;
  },

  changePassword: async (passwordData) => {
    const response = await api.put('/auth/change-password', passwordData);
    return response.data;
  },

  deleteAccount: async () => {
    const response = await api.delete('/users/account');
    return response.data;
  },
};

export default authService;
