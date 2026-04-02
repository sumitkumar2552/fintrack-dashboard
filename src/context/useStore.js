import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initialTransactions } from '../data/transactions';


const useStore = create(
  persist(
    (set, get) => ({
      transactions: initialTransactions,

      role: 'admin',
      setRole: (role) => set({ role }),

      darkMode: false,
      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),

      filters: { search: '', type: '', category: '', sortBy: 'date-desc' },
      setFilter: (key, value) =>
        set((s) => ({ filters: { ...s.filters, [key]: value } })),
      resetFilters: () =>
        set({ filters: { search: '', type: '', category: '', sortBy: 'date-desc' } }),

      addTransaction: (txn) =>
        set((s) => ({
          transactions: [{ ...txn, id: Date.now() }, ...s.transactions],
        })),

      updateTransaction: (id, data) =>
        set((s) => ({
          transactions: s.transactions.map((t) => (t.id === id ? { ...t, ...data } : t)),
        })),

      deleteTransaction: (id) =>
        set((s) => ({
          transactions: s.transactions.filter((t) => t.id !== id),
        })),

      getSummary: () => {
        const { transactions } = get();
        const income  = transactions.filter((t) => t.type === 'income').reduce((a, t) => a + t.amount, 0);
        const expense = transactions.filter((t) => t.type === 'expense').reduce((a, t) => a + t.amount, 0);
        return { income, expense, balance: income - expense };
      },

      getFiltered: () => {
        const { transactions, filters } = get();
        const { search, type, category, sortBy } = filters;
        let arr = transactions.filter((t) => {
          if (type && t.type !== type) return false;
          if (category && t.cat !== category) return false;
          if (search) {
            const q = search.toLowerCase();
            if (!t.desc.toLowerCase().includes(q) && !t.cat.toLowerCase().includes(q)) return false;
          }
          return true;
        });
        arr.sort((a, b) => {
          if (sortBy === 'date-desc')   return new Date(b.date) - new Date(a.date);
          if (sortBy === 'date-asc')    return new Date(a.date) - new Date(b.date);
          if (sortBy === 'amount-desc') return b.amount - a.amount;
          return a.amount - b.amount;
        });
        return arr;
      },

      getMonthlyData: () => {
        const { transactions } = get();
        const keys   = ['2025-10','2025-11','2025-12','2026-01','2026-02','2026-03'];
        const labels = ['Oct','Nov','Dec','Jan','Feb','Mar'];
        const income  = keys.map((k) => transactions.filter((t) => t.type === 'income'  && t.date.startsWith(k)).reduce((a, t) => a + t.amount, 0));
        const expense = keys.map((k) => transactions.filter((t) => t.type === 'expense' && t.date.startsWith(k)).reduce((a, t) => a + t.amount, 0));
        return { labels, income, expense };
      },

      getCategoryBreakdown: () => {
        const { transactions } = get();
        const map = {};
        transactions.filter((t) => t.type === 'expense').forEach((t) => {
          map[t.cat] = (map[t.cat] || 0) + t.amount;
        });
        return Object.entries(map).sort((a, b) => b[1] - a[1]);
      },
    }),
    { name: 'fintrack-storage' }
  )
);

export default useStore;