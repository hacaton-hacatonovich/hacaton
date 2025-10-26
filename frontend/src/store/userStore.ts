import { create } from 'zustand';

interface UserState {
  userData: string | null;
  setUserData: (userData: string) => void;
  clearUserData: () => void;
  initializeUserData: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  userData: null,
  
  // Инициализация данных при загрузке приложения
  initializeUserData: () => {
    if (typeof window !== 'undefined') {
      const storedUserData = localStorage.getItem('user');
      set({ userData: storedUserData });
    }
  },
  
  setUserData: (userData: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', userData);
      set({ userData });
    }
  },
  
  clearUserData: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      set({ userData: null });
    }
  }
}));