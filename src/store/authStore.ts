/**
 * SafeRoute App - Auth Store
 * Maneja el estado de autenticación
 */
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  token?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  
  // Actions
  setAuth: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  restoreAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: true,

  setAuth: async (user: User, token: string) => {
    await AsyncStorage.setItem('user', JSON.stringify(user));
    await AsyncStorage.setItem('token', token);
    set({ user, token });
  },

  logout: async () => {
    await AsyncStorage.multiRemove(['user', 'token']);
    set({ user: null, token: null });
  },

  restoreAuth: async () => {
    try {
      const [userJson, token] = await AsyncStorage.multiGet(['user', 'token']);
      const user = userJson[1] ? JSON.parse(userJson[1]) : null;
      set({ user, token, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },
}));