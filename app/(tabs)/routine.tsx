import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppContent } from './_layout';

export default function RoutineScreen() {
  const { theme } = useAppContent();
  const isDark = theme === 'dark';
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#F5F7FA' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}><Text style={styles.backText}>‹ Zurück</Text></TouchableOpacity>
        <Text style={[styles.title, { color: isDark ? '#FFF' : '#000' }]}>Pflegeroutine</Text>
        <View style={{ width: 60 }} />
      </View>
      <View style={[styles.card, { backgroundColor: isDark ? '#1E1E1E' : '#FFF' }]}>
        <Text style={{ color: isDark ? '#FFF' : '#000', fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Morgenroutine</Text>
        <Text style={{ color: '#888', marginBottom: 5 }}>1. Sanfte Reinigung (z.B. Reinigungsmilch)</Text>
        <Text style={{ color: '#888', marginBottom: 5 }}>2. Antioxidans-Serum (Vitamin C)</Text>
        <Text style={{ color: '#888', marginBottom: 5 }}>3. Feuchtigkeitspflege</Text>
        <Text style={{ color: '#888', marginBottom: 20 }}>4. Sonnencreme (Mindestens LSF 30)</Text>

        <Text style={{ color: isDark ? '#FFF' : '#000', fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Abendroutine</Text>
        <Text style={{ color: '#888', marginBottom: 5 }}>1. Double Cleansing (Öl + Waschgel)</Text>
        <Text style={{ color: '#888', marginBottom: 5 }}>2. Aktive Wirkstoffe (BHA oder Retinol)</Text>
        <Text style={{ color: '#888' }}>3. Reichhaltige Nachtcreme</Text>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20, paddingTop: 60 }, header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }, backBtn: { padding: 5 }, backText: { color: '#A8D0C6', fontWeight: 'bold', fontSize: 16 }, title: { fontSize: 20, fontWeight: 'bold' }, card: { padding: 20, borderRadius: 15, borderWidth: 1, borderColor: '#333' } });