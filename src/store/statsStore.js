import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useStatsStore = create(
  persist(
    (set, get) => ({
      totalInstalls: 0,
      totalVisits: 0,
      currentViewers: 0,
      visitHistory: [],
      
      // تسجيل زيارة جديدة
      recordVisit: () => {
        const now = new Date().toISOString();
        set((state) => ({
          totalVisits: state.totalVisits + 1,
          currentViewers: state.currentViewers + 1,
          visitHistory: [...state.visitHistory, now].slice(-1000), // Keep last 1000 visits
        }));
      },
      
      // تسجيل تحميل التطبيق
      recordInstall: () => {
        set((state) => ({
          totalInstalls: state.totalInstalls + 1,
        }));
      },
      
      // تقليل عدد المشاهدين (عند مغادرة الصفحة)
      decrementViewers: () => {
        set((state) => ({
          currentViewers: Math.max(0, state.currentViewers - 1),
        }));
      },
      
      // الحصول على الزوار اليوم
      getTodayVisits: () => {
        const today = new Date().toDateString();
        const state = get();
        return state.visitHistory.filter(visit => {
          return new Date(visit).toDateString() === today;
        }).length;
      },
      
      // الحصول على الزوار هذا الأسبوع
      getWeekVisits: () => {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const state = get();
        return state.visitHistory.filter(visit => {
          return new Date(visit) >= weekAgo;
        }).length;
      },
    }),
    {
      name: 'streamhub-stats-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useStatsStore;