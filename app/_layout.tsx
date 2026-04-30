import { Stack } from 'expo-router';
import React, { createContext, useContext, useState } from 'react';

// 1. WICHTIG: export davor schreiben!
export type ScanEntry = {
  id: string;
  date: string;
  score: number;
  details: { nase: string; wangen: string; augen: string; stirn: string; mund: string; };
  analysis: { moisture: number; oil: number; pores: number; firmness: number; redness: number; acne: number; };
  solution: string; 
};

interface AppContextType {
  history: ScanEntry[];
  setHistory: React.Dispatch<React.SetStateAction<ScanEntry[]>>;
  clearHistory: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// 2. WICHTIG: export davor schreiben!
export const useAppContent = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContent muss im Provider liegen");
  return context;
};

export default function RootLayout() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [history, setHistory] = useState<ScanEntry[]>([]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const clearHistory = () => setHistory([]);

  return (
    <AppContext.Provider value={{ history, setHistory, clearHistory, theme, toggleTheme }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </AppContext.Provider>
  );
}