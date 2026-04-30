import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppContent } from '../_layout';

export default function MenuScreen() {
  const { theme, toggleTheme } = useAppContent();
  const isDark = theme === 'dark';
  const router = useRouter();

  // --- EASTER EGG LOGIK ---
  const [tapCount, setTapCount] = useState(0);

  const handleAvatarPress = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);
    
    if (newCount === 3) {
      Alert.alert(
        "✨ Entwickler-Team ✨",
        "SkinScan Mask Project\n\nProudly developed by:\nCansin Can Kurt & Rabia Kurt\n\nBBS Peine - Project Edition 2026",
        [{ text: "Stark!", onPress: () => setTapCount(0) }]
      );
    }
  };
  // -----------------------------

  // HIER FEHLTEN DIE FARBEN:
  const bgColor = isDark ? '#121212' : '#F5F7FA';
  const cardBg = isDark ? '#1E1E1E' : '#FFF';
  const textColor = isDark ? '#FFF' : '#000';

  return (
    <ScrollView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.profileHeader}>
        <TouchableOpacity activeOpacity={0.8} onPress={handleAvatarPress} style={styles.avatar}>
          <Text style={{fontSize: 35}}>😸</Text>
        </TouchableOpacity>
        <Text style={[styles.userName, { color: textColor }]}>Premium Nutzer</Text>
      </View>

      <Text style={styles.sectionLabel}>Mein SkinScan</Text>
      <View style={[styles.menuBlock, { backgroundColor: cardBg }]}>
        <MenuBtn icon="🧬" title="Mein Haut-Profil" onPress={() => router.push('/profile-details')} isDark={isDark} />
        <MenuBtn icon="⚙️" title="Einstellungen" onPress={() => router.push('/settings')} isDark={isDark} />
        <MenuBtn icon="🌙" title="Dark Mode" onPress={toggleTheme} isDark={isDark} />
      </View>

      <Text style={styles.sectionLabel}>Support</Text>
      <View style={[styles.menuBlock, { backgroundColor: cardBg }]}>
        <MenuBtn icon="🎧" title="Hilfe & Kontakt" onPress={() => router.push('/support')} isDark={isDark} />
        <MenuBtn icon="🛡️" title="Datenschutz" onPress={() => router.push('/privacy')} isDark={isDark} />
      </View>

      <TouchableOpacity onPress={() => router.replace('/Login')} style={styles.logoutBtn}>
        <Text style={styles.logoutText}>Abmelden</Text>
      </TouchableOpacity>

      {/* --- BBS PEINE BADGE --- */}
      <View style={{ alignItems: 'center', marginTop: 40, marginBottom: 30, opacity: 0.6 }}>
        <Text style={{ fontSize: 24, marginBottom: 5 }}>🎓</Text>
        <Text style={{ color: '#888', fontSize: 11, fontWeight: 'bold', letterSpacing: 2 }}>PROUDLY DEVELOPED AT</Text>
        <Text style={{ color: isDark ? '#FFF' : '#333', fontSize: 14, fontWeight: 'bold', marginTop: 2 }}>BBS Peine</Text>
        <Text style={{ color: '#A8D0C6', fontSize: 10, marginTop: 4, fontWeight: 'bold' }}>PROJECT EDITION 2026</Text>
      </View>

    </ScrollView>
  );
}

const MenuBtn = ({ icon, title, onPress, isDark }: any) => (
  <TouchableOpacity onPress={onPress} style={styles.menuBtn}>
    <Text style={{ fontSize: 20, marginRight: 15 }}>{icon}</Text>
    <Text style={{ color: isDark ? '#FFF' : '#000', fontWeight: '600', fontSize: 16 }}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, paddingTop: 60 },
  profileHeader: { alignItems: 'center', marginBottom: 40 },
  avatar: { width: 85, height: 85, borderRadius: 43, backgroundColor: '#DDD', justifyContent: 'center', alignItems: 'center' },
  userName: { fontSize: 22, fontWeight: 'bold', marginTop: 15 },
  sectionLabel: { color: '#888', fontSize: 12, marginLeft: 10, marginBottom: 10, fontWeight: 'bold', textTransform: 'uppercase' },
  menuBlock: { borderRadius: 25, padding: 5, marginBottom: 25, elevation: 1 },
  menuBtn: { flexDirection: 'row', padding: 20, alignItems: 'center' },
  logoutBtn: { padding: 20, alignItems: 'center', marginTop: 10 },
  logoutText: { color: '#FF5E5E', fontWeight: 'bold', fontSize: 16 }
});