import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      isAdmin: false,
      adminEmail: null,
      
      login: (email, password) => {
        // كلمة المرور الخاصة بك (غيرها لاحقاً!)
        if (email === 'admin@streamhub.com' && password === 'StreamHub2024!') {
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