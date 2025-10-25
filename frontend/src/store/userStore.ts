import { create } from 'zustand';
import { extractCookieValue } from '../lib/extractCookies';

interface UserState {
  userCookie: string | null;
  setUserCookie: (setCookieHeaders: string | string[] | null) => void;
  clearUserCookie: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  userCookie: null,
  
  setUserCookie: (setCookieHeaders: string | string[] | null) => {
    const userCookieValue = extractCookieValue(setCookieHeaders, 'user');
    set({ userCookie: userCookieValue });
  },
  
  clearUserCookie: () => {
    set({ userCookie: null });
  }
}));