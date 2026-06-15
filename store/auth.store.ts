/**
 * @file store/auth.store.ts
 * @description Zustand store for auth UI state.
 *
 * IMPORTANT: Tokens are NEVER stored here.
 * The browser manages HTTP-only cookies automatically.
 * This store only holds the user object for UI rendering (name, role, etc.)
 */

import { create } from 'zustand';
import type { User } from '@/types/auth.types';

interface AuthState {
  /** The currently authenticated user, or null if not logged in */
  user: User | null;
  /** True while checking authentication status on app load */
  isLoading: boolean;

  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  clearAuth: () => set({ user: null, isLoading: false }),
}));
