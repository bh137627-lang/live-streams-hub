import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      isAdmin: false,
      adminEmail: null,
      rememberMe: true,
      
      login: (email, password) => {
        // كلمة المرور الخاصة بك
        if (email === 'admin@streamhub.com' && password === 'admin123') {
          set({ isAdmin: true, adminEmail: email, rememberMe: true });
          return { success: true };
        }
        // كلمة مرور بديلة
        if (email === 'owner@streamhub.com' && password === '123456') {
          set({ isAdmin: true, adminEmail: email, rememberMe: true });
          return { success: true };
        }
        return { success: false, error: 'بيانات الدخول غير صحيحة' };
      },
      
      logout: () => {
        set({ isAdmin: false, adminEmail: null, rememberMe: false });
      },
    }),
    {
      name: 'streamhub-auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        isAdmin: state.isAdmin, 
        adminEmail: state.adminEmail,
        rememberMe: state.rememberMe 
      }),
    }
  )
);

export default useAuthStore;