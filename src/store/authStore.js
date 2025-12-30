import { create } from 'zustand';

const useAuthStore = create((set, get) => ({
  isAdmin: false,
  adminEmail: null,
  
  // تحميل البيانات من localStorage عند البداية
  initialize: () => {
    try {
      const savedAuth = localStorage.getItem('streamhub-admin-auth');
      if (savedAuth) {
        const data = JSON.parse(savedAuth);
        set({ isAdmin: data.isAdmin, adminEmail: data.adminEmail });
      }
    } catch (error) {
      console.error('Error loading auth:', error);
    }
  },
  
  login: (email, password) => {
    // كلمة المرور الخاصة بك
    if (email === 'admin@streamhub.com' && password === 'admin123') {
      set({ isAdmin: true, adminEmail: email });
      // حفظ في localStorage
      localStorage.setItem('streamhub-admin-auth', JSON.stringify({
        isAdmin: true,
        adminEmail: email
      }));
      return { success: true };
    }
    // كلمة مرور بديلة
    if (email === 'owner@streamhub.com' && password === '123456') {
      set({ isAdmin: true, adminEmail: email });
      // حفظ في localStorage
      localStorage.setItem('streamhub-admin-auth', JSON.stringify({
        isAdmin: true,
        adminEmail: email
      }));
      return { success: true };
    }
    return { success: false, error: 'بيانات الدخول غير صحيحة' };
  },
  
  logout: () => {
    set({ isAdmin: false, adminEmail: null });
    localStorage.removeItem('streamhub-admin-auth');
  },
}));

// تحميل البيانات عند البداية
if (typeof window !== 'undefined') {
  useAuthStore.getState().initialize();
}

export default useAuthStore;