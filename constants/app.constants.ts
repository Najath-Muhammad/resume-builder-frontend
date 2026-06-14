/**
 * @file constants/app.constants.ts
 * @description Application-wide constants. Import from here, never hardcode values.
 */

export const APP_NAME = 'AI Resume Builder';
export const APP_VERSION = '1.0.0';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
} as const;

export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  USER: 'user',
} as const;

export const API_ENDPOINTS = {
  HEALTH: '/health',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  RESUME: {
    BASE: '/resumes',
    BY_ID: (id: string) => `/resumes/${id}`,
  },
} as const;
