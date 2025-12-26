import axios from 'axios';
import { UserManager } from 'oidc-client-ts';
import { authConfig } from '../config/auth';

const userManager = new UserManager(authConfig);

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth tokens, etc.
apiClient.interceptors.request.use(
  async (config) => {
    const user = await userManager.getUser();
    if (user?.access_token) {
      config.headers.Authorization = `Bearer ${user.access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await userManager.signinRedirect();
    }
    return Promise.reject(error);
  }
);

export default apiClient;