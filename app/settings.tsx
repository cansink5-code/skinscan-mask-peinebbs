import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useAppContent } from './_layout';

export default function SettingsScreen() {
  const { theme, toggleTheme, clearHistory } = useAppContent();
  const isDark = theme === 'dark';
  const router = useRouter();

  // Alle States für die verschiedenen Optionen
  const [notifications, setNotifications] = useState(true);
  const [faceId, setFaceId] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [highContrast, setHighContrast] = useState(false);

  const handleClear = () => {
    if (confirm("Gefahrenzone: Möchtest du wirklich deinen gesamten Verlauf unwiderruflich löschen?")) {
      clearHistory();
      alert("Verlauf wurde erfolgreich geleert.");
      router.back();
    }
  };

  const bgColor = isDark ? '#121212' : '#F5F7FA';
  const cardBg = isDark ? '#1E1E1E' : '#FFF';
  const textColor = isDark ? '#FFF' : '#000';

  return (
    <ScrollView style={{ flex: 1, backgroundColor: bgColor, padding: 25, paddingTop: 60 }} showsVerticalScrollIndicator={false}>
      <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 20 }}>
        <Text style={{ color: '#A8D0C6', fontSize: 18, fontWeight: 'bold' }}>‹ Zurück</Text>
      </TouchableOpacity>
      
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 30, color: textColor }}>Einstellungen</Text>

      {/* BLOCK 1: Darstellung & App */}
      <Text style={styles.sectionHeader}>DARSTELLUNG & VERHALTEN</Text>
      <View style={[styles.settingBlock, { backgroundColor: cardBg }]}>
        <SettingToggle title="Dark Mode" description="Dunkles Design aktivieren" value={isDark} onValueChange={toggleTheme} isDark={isDark} />
        <View style={[styles.divider, { backgroundColor: isDark ? '#333' : '#EEE' }]} />
        <SettingToggle title="Hoher Kontrast" description="Bessere Lesbarkeit für Texte" value={highContrast} onValueChange={setHighContrast} isDark={isDark} />
      </View>

      {/* BLOCK 2: SkinScan Maske & Sync */}
      <Text style={styles.sectionHeader}>SKINSCAN MASKE</Text>
      <View style={[styles.settingBlock, { backgroundColor: cardBg }]}>
        <SettingToggle title="Auto-Sync" description="Scans automatisch übertragen" value={autoSync} onValueChange={setAutoSync} isDark={isDark} />
        <View style={[styles.divider, { backgroundColor: isDark ? '#333' : '#EEE' }]} />
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={[styles.actionBtnText, { color: textColor }]}>Bluetooth-Verbindung trennen</Text>
        </TouchableOpacity>
        <View style={[styles.divider, { backgroundColor: isDark ? '#333' : '#EEE' }]} />
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={[styles.actionBtnText, { color: textColor }]}>Maske kalibrieren</Text>
        </TouchableOpacity>
      </View>

      {/* BLOCK 3: Sicherheit & Benachrichtigungen */}
      <Text style={styles.sectionHeader}>SICHERHEIT & ALARME</Text>
      <View style={[styles.settingBlock, { backgroundColor: cardBg }]}>
        <SettingToggle title="Push-Benachrichtigungen" description="Erinnerungen für deine Routine" value={notifications} onValueChange={setNotifications} isDark={isDark} />
        <View style={[styles.divider, { backgroundColor: isDark ? '#333' : '#EEE' }]} />
        <SettingToggle title="Face ID / Touch ID" description="App beim Start biometrisch sperren" value={faceId} onValueChange={setFaceId} isDark={isDark} />
      </View>

      {/* BLOCK 4: Daten & Privatsphäre */}
      <Text style={styles.sectionHeader}>DATENSCHUTZ & SPEICHER</Text>
      <View style={[styles.settingBlock, { backgroundColor: cardBg, marginBottom: 50 }]}>
        <SettingToggle title="Anonyme Analysen teilen" description="Hilf uns, die KI zu verbessern" value={analytics} onValueChange={setAnalytics} isDark={isDark} />
        <View style={[styles.divider, { backgroundColor: isDark ? '#333' : '#EEE' }]} />
        
        <TouchableOpacity onPress={handleClear} style={styles.dangerBtn}>
          <Text style={styles.dangerText}>Scan-Verlauf unwiderruflich löschen</Text>
        </TouchableOpacity>
        <Text style={{ color: '#888', fontSize: 11, marginTop: 15, textAlign: 'center', paddingHorizontal: 10, paddingBottom: 15 }}>
          Alle lokal gespeicherten Analysen deines Tagebuchs werden permanent entfernt.
        </Text>
      </View>

    </ScrollView>
  );
}

// Hilfskomponenten
const SettingToggle = ({ title, description, value, onValueChange, isDark }: any) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 18 }}>
    <View style={{ flex: 1, paddingRight: 15 }}>
      <Text style={{ color: isDark ? '#FFF' : '#000', fontSize: 16, fontWeight: '600' }}>{title}</Text>
      <Text style={{ color: '#888', fontSize: 12, marginTop: 4 }}>{description}</Text>
    </View>
    <Switch 
      value={value} 
      onValueChange={onValueChange} 
      trackColor={{ false: isDark ? '#444' : '#E0E0E0', true: '#A8D0C6' }}
      thumbColor={'#FFF'}
    />
  </View>
);

const styles = StyleSheet.create({
  sectionHeader: { color: '#888', fontSize: 12, marginBottom: 10, fontWeight: 'bold', marginLeft: 15, letterSpacing: 1 },
  settingBlock: { borderRadius: 25, marginBottom: 30, overflow: 'hidden' },
  divider: { height: 1, marginHorizontal: 15 },
  actionBtn: { padding: 18, justifyContent: 'center' },
  actionBtnText: { fontSize: 16, fontWeight: '500' },
  dangerBtn: { backgroundColor: 'rgba(255,0,0,0.05)', padding: 18, margin: 15, borderRadius: 15, borderWidth: 1, borderColor: '#FF5E5E' },
  dangerText: { color: '#FF5E5E', textAlign: 'center', fontWeight: 'bold' }
});