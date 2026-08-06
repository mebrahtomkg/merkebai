import { DEFAULT_THEME } from '@/constants';
import { Theme } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  theme: Theme;
}

const useThemeStore = create<ThemeState>()(
  persist(
    () => ({
      theme: DEFAULT_THEME,
    }),
    {
      name: 'app-theme', // Key used in localStorage
    },
  ),
);

export const toggleTheme = () => {
  useThemeStore.setState(
    (prevValue) => ({ theme: prevValue.theme === 'light' ? 'dark' : 'light' }),
    true,
  );
};

export default useThemeStore;
