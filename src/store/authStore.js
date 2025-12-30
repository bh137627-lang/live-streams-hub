import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      isAdmin: false,
      adminEmail: null,
      
      login: (email, password) => {
        // كلمة المرور الخاصة بك
        if (email === 'admin@streamhub.com' && password === 'admin123') {
          set({ isAdmin: true, adminEmail: email });
          return { success: true };
        }
        // كلمة مرور بديلة
        if (email === 'owner@streamhub.com' && password === '123456') {
          set({ isAdmin: true, adminEmail: email });
          return { success: true };
        }
        return { success: false, error: 'بيانات الدخول غير صحيحة' };
      },
      
      logout: () => {
        set({ isAdmin: false, adminEmail: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;