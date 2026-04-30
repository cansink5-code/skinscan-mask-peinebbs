import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppContent } from './_layout';

export default function NotificationsScreen() {
  const { theme } = useAppContent();
  const isDark = theme === 'dark';
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#F5F7FA' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}><Text style={styles.backText}>‹ Zurück</Text></TouchableOpacity>
        <Text style={[styles.title, { color: isDark ? '#FFF' : '#000' }]}>Benachrichtigungen</Text>
        <View style={{ width: 60 }} />
      </View>
      <Text style={{ color: '#888', textAlign: 'center', marginTop: 50 }}>Keine neuen Benachrichtigungen.</Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20, paddingTop: 60 }, header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }, backBtn: { padding: 5 }, backText: { color: '#A8D0C6', fontWeight: 'bold', fontSize: 16 }, title: { fontSize: 20, fontWeight: 'bold' } });