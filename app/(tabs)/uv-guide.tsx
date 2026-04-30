import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppContent } from './_layout';

export default function UvGuideScreen() {
  const { theme } = useAppContent();
  const isDark = theme === 'dark';
  const router = useRouter();

  const bgColor = isDark ? '#121212' : '#F5F7FA';
  const textColor = isDark ? '#FFFFFF' : '#1A1A1A';
  const cardBg = isDark ? '#1E1E1E' : '#FFFFFF';

  return (
    <ScrollView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>‹ Zurück</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: textColor }]}>UV-Guide</Text>
        <View style={{ width: 60 }} />
      </View>

      <View style={[styles.infoCard, { backgroundColor: cardBg }]}>
        <Text style={styles.emoji}>☀️</Text>
        <Text style={[styles.cardTitle, { color: textColor }]}>Sonnenschutz ist wichtig</Text>
        <Text style={styles.cardText}>UV-Strahlung ist für 80% der Hautalterung verantwortlich. Schütze dich täglich!</Text>
      </View>

      <Text style={[styles.sectionTitle, { color: textColor }]}>Tipps für heute</Text>
      <View style={[styles.tipRow, { backgroundColor: cardBg }]}>
        <Text style={styles.tipText}>• Trage LSF 30 oder 50 auf.</Text>
        <Text style={styles.tipText}>• Meide die Mittagssonne (11-15 Uhr).</Text>
        <Text style={styles.tipText}>• Schütze deine Augen mit einer Sonnenbrille.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 60 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 30 },
  backBtn: { padding: 5 },
  backText: { color: '#A8D0C6', fontWeight: 'bold', fontSize: 16 },
  title: { fontSize: 20, fontWeight: 'bold' },
  infoCard: { padding: 25, borderRadius: 20, alignItems: 'center', marginBottom: 20 },
  emoji: { fontSize: 40, marginBottom: 10 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  cardText: { textAlign: 'center', color: '#888', lineHeight: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 15, marginTop: 10 },
  tipRow: { padding: 20, borderRadius: 20 },
  tipText: { fontSize: 15, color: '#888', marginBottom: 8 }
});