/**
 * @file lib/axios.ts
 * @description Configured Axios instance for all API requests.
 * All services should import from this file — never create raw axios instances.
 */

import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// ---------------------------------------------------------------------------
// Request Interceptor — attach JWT token if available
// ---------------------------------------------------------------------------
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ---------------------------------------------------------------------------
// Response Interceptor — handle 401 globally
// ---------------------------------------------------------------------------
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        // Will be replaced with router redirect once auth is wired up
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
