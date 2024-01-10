import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type ThemeState = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

const useThemeStore = create(
  persist<ThemeState>(
    set => ({
      theme: window.matchMedia('(prefers-color-scheme: dark)')
        ? 'dark'
        : 'light',
      toggleTheme: () =>
        set(state => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useThemeStore;
