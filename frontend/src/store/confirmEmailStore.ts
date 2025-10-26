import { create } from 'zustand';

interface AuthState {
  email: string;
  setEmail: (email: string) => void;
  clearEmail: () => void;
}

const useConfirmEmailStore = create<AuthState>((set) => ({
  email: 'mail@mail.ru',
  setEmail: (email: string) => set({ email }),
  clearEmail: () => set({ email: '' }),
}));

export default useConfirmEmailStore;