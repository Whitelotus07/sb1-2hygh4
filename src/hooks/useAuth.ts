import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';

type User = {
  id: string;
  name: string;
  email: string;
  accountType: 'individual' | 'corporate';
  subscriptionStatus: 'active' | 'inactive';
  subscriptionPlan: 'Basic' | 'Pro' | 'Enterprise';
};

type AuthStore = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, accountType: 'individual' | 'corporate') => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
};

const API_URL = 'https://api.beekeeper.ai/v1';

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { user, token } = response.data;
      localStorage.setItem('token', token);
      set({ user });
      toast.success('Logged in successfully');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      throw error;
    }
  },
  register: async (email, password, name, accountType) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, { email, password, name, accountType });
      const { message } = response.data;
      toast.success(message);
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      throw error;
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null });
    toast.info('Logged out successfully');
  },
  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        set({ user: response.data, isLoading: false });
      } catch (error) {
        localStorage.removeItem('token');
        set({ user: null, isLoading: false });
      }
    } else {
      set({ isLoading: false });
    }
  },
  forgotPassword: async (email) => {
    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
      const { message } = response.data;
      toast.success(message);
    } catch (error) {
      toast.error('Failed to send password reset email. Please try again.');
      throw error;
    }
  },
  resetPassword: async (token, newPassword) => {
    try {
      const response = await axios.post(`${API_URL}/auth/reset-password`, { token, newPassword });
      const { message } = response.data;
      toast.success(message);
    } catch (error) {
      toast.error('Failed to reset password. Please try again.');
      throw error;
    }
  },
}));