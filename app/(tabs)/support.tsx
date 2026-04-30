import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppContent } from './_layout';

export default function SupportScreen() {
  const { theme } = useAppContent();
  const isDark = theme === 'dark';
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#F5F7FA' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}><Text style={styles.backText}>‹ Zurück</Text></TouchableOpacity>
        <Text style={[styles.title, { color: isDark ? '#FFF' : '#000' }]}>Support</Text>
        <View style={{ width: 60 }} />
      </View>
      <Text style={{ color: isDark ? '#FFF' : '#000', fontSize: 16, marginBottom: 20 }}>Hast du Probleme mit deiner SkinScan Mask oder der App?</Text>
      <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Support kontaktieren</Text></TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20, paddingTop: 60 }, header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }, backBtn: { padding: 5 }, backText: { color: '#A8D0C6', fontWeight: 'bold', fontSize: 16 }, title: { fontSize: 20, fontWeight: 'bold' }, button: { backgroundColor: '#A8D0C6', padding: 15, borderRadius: 10, alignItems: 'center' }, buttonText: { color: '#FFF', fontWeight: 'bold' } });