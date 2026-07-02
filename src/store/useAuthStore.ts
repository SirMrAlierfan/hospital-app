import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: string;
    fullName: string;
    email: string;
    role: 'patient' | 'doctor';
    nationalId?: number;
    licenseNumber?: number;
    specialty?: string,
    consultationFee?: number
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User) => void;
    logout: () => void;
    updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            login: (userData) => set({ user: userData, isAuthenticated: true }),

            logout: () => set({ user: null, isAuthenticated: false }),

            updateUser: (updatedData) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...updatedData } : null,
                })),
        }),
        {
            name: 'auth-storage',
        }
    )
);
