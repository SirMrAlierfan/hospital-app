import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            theme: 'light',
            toggleTheme: () => set((state) => {
                console.log("a");
                
                const nextTheme = state.theme === 'light' ? 'dark' : 'light';
                const root = window.document.documentElement;
                if (nextTheme === 'dark') {
                    root.classList.add('dark');
                } else {
                    root.classList.remove('dark');
                }

                return { theme: nextTheme };
            }),
        }),
        {
            name: 'theme-storage',
        }
    )
);