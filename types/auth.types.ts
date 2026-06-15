/**
 * @file types/auth.types.ts
 * @description Frontend type definitions for authentication.
 */

export interface User {
  _id: string;
  name: string;
  email: string;
  isVerified: boolean;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginInput {
  email: string;
  password: string;
}
