import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme as useDeviceScheme } from '@/hooks/use-color-scheme';
import { Tabs } from 'expo-router';
import React, { createContext, useContext, useState } from 'react';

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
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContent = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContent must be used within Provider");
  return context;
};

export default function TabLayout() {
  const deviceScheme = useDeviceScheme();
  const [theme, setTheme] = useState<'light' | 'dark'>(deviceScheme === 'dark' ? 'dark' : 'light');
  const [history, setHistory] = useState<ScanEntry[]>([]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const activeTheme = theme === 'dark' ? 'dark' : 'light';

  return (
    <AppContext.Provider value={{ history, setHistory, theme, toggleTheme }}>
      <Tabs screenOptions={{
          tabBarActiveTintColor: Colors[activeTheme]?.tint || '#C9956C',
          headerShown: false,
          tabBarStyle: { backgroundColor: activeTheme === 'dark' ? '#121212' : '#FFF', borderTopWidth: 0 },
        }}>
        <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} /> }} />
        <Tabs.Screen name="history" options={{ title: 'Verlauf', tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? 'time' : 'time-outline'} color={color} /> }} />
        <Tabs.Screen name="menu" options={{ title: 'Profil', tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} /> }} />
        
        {/* Diese Seiten sind Teil der App, aber werden NICHT in der Tab-Leiste angezeigt */}
        <Tabs.Screen name="uv-guide" options={{ href: null }} />
        <Tabs.Screen name="pflege-finder" options={{ href: null }} />
        <Tabs.Screen name="routine" options={{ href: null }} />
        <Tabs.Screen name="settings" options={{ href: null }} />
        <Tabs.Screen name="profile-details" options={{ href: null }} />
        <Tabs.Screen name="notifications" options={{ href: null }} />
        <Tabs.Screen name="privacy" options={{ href: null }} />
        <Tabs.Screen name="support" options={{ href: null }} />
        <Tabs.Screen name="scan" options={{ href: null }} />
        <Tabs.Screen name="explore" options={{ href: null }} />
        <Tabs.Screen name="Login" options={{ href: null }} />
        <Tabs.Screen name="products" options={{ href: null }} />
      </Tabs>
    </AppContext.Provider>
  );
}