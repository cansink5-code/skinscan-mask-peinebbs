import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useAppContent } from './_layout';

export default function ProfileDetailsScreen() {
  const { theme, history } = useAppContent();
  const isDark = theme === 'dark';
  const router = useRouter();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: isDark ? '#121212' : '#F5F7FA', padding: 25, paddingTop: 60 }}>
      <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 20 }}>
        <Text style={{ color: '#A8D0C6', fontSize: 18, fontWeight: 'bold' }}>‹ Zurück</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 25, color: isDark ? '#FFF' : '#000' }}>Mein Haut-Profil</Text>

      <View style={{ padding: 25, backgroundColor: isDark ? '#1E1E1E' : '#FFF', borderRadius: 25 }}>
        <ProfileInfo label="Hauttyp" value="Mischhaut" isDark={isDark} />
        <ProfileInfo label="Letzter Health Score" value={history.length > 0 ? history[0].score.toString() : "--"} isDark={isDark} />
        <ProfileInfo label="Hauptziel" value="Unreinheiten reduzieren" isDark={isDark} />
      </View>
    </ScrollView>
  );
}

const ProfileInfo = ({ label, value, isDark }: any) => (
  <View style={{ marginBottom: 20 }}>
    <Text style={{ color: '#888', fontSize: 12, textTransform: 'uppercase', marginBottom: 4 }}>{label}</Text>
    <Text style={{ color: isDark ? '#FFF' : '#000', fontSize: 18, fontWeight: 'bold' }}>{value}</Text>
  </View>
);