/**
 * @file services/auth.service.ts
 * @description Auth API calls. Tokens are managed via HTTP-only cookies automatically.
 */

import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/types/api.types';
import type { User } from '@/types/auth.types';

const AuthService = {
  async register(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<{ message: string }> {
    const { data: res } = await apiClient.post<ApiResponse<{ message: string }>>(
      '/auth/register',
      data,
    );
    return res.data;
  },

  async login(data: { email: string; password: string }): Promise<User> {
    const { data: res } = await apiClient.post<ApiResponse<User>>(
      '/auth/login',
      data,
    );
    // Cookies (accessToken + refreshToken) are set by the backend automatically
    return res.data;
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  },

  async getMe(): Promise<User> {
    const { data: res } = await apiClient.get<ApiResponse<User>>('/auth/me');
    return res.data;
  },

  async refresh(): Promise<void> {
    await apiClient.post('/auth/refresh');
  },
};

export default AuthService;
