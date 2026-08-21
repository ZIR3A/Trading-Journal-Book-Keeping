const STORAGE_KEY = 'trading_journal_settings';

const DEFAULT_SETTINGS = {
  profileName: 'Trader',
  profileEmail: 'trader@example.com',
  accountBalance: 10000,
  defaultRisk: 1,
  defaultRR: 2,
  defaultMarket: 'Forex'
};

export const settingsStore = {
  getSettings: async () => {
    if (typeof window === 'undefined') return DEFAULT_SETTINGS;
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS));
      return DEFAULT_SETTINGS;
    }
    
    return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
  },

  saveSettings: async (updates) => {
    if (typeof window === 'undefined') return;
    
    const currentSettings = await settingsStore.getSettings();
    const newSettings = { ...currentSettings, ...updates };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    return newSettings;
  }
};
