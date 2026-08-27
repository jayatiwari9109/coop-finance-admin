import { initialCustomers, initialTransactions, initialDashboardStats } from './mockData';

// Simulated Server Delay (800ms)
const delay = (ms = 800) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiService = {
  // Fetch Dashboard Stats
  getDashboardStats: async () => {
    await delay(500);
    return { success: true, data: initialDashboardStats };
  },

  // Customer Management APIs
  getCustomers: async () => {
    await delay();
    return { success: true, data: [...initialCustomers] };
  },

  addCustomer: async (newCustomer) => {
    await delay();
    const created = { id: Date.now(), ...newCustomer, status: 'Active' };
    initialCustomers.push(created);
    return { success: true, data: created };
  },

  deleteCustomer: async (id) => {
    await delay();
    const index = initialCustomers.findIndex((c) => c.id === id);
    if (index !== -1) initialCustomers.splice(index, 1);
    return { success: true, id };
  },

  // Transaction Log APIs
  getTransactions: async () => {
    await delay();
    return { success: true, data: [...initialTransactions] };
  },
};