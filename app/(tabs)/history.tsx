import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { LayoutAnimation, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScanEntry, useAppContent } from '../_layout';

export default function HistoryScreen() {
  const { history, theme } = useAppContent();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const isDark = theme === 'dark';
  const router = useRouter();

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  const bgColor = isDark ? '#121212' : '#F5F7FA';
  const cardBg = isDark ? '#1E1E1E' : '#FFF';
  const textColor = isDark ? '#FFF' : '#000';

  return (
    <ScrollView style={[styles.container, { backgroundColor: bgColor }]} showsVerticalScrollIndicator={false}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.navigate('/')} style={styles.backBtn}>
          <Text style={styles.backText}>‹ Zum Dashboard</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.title, { color: textColor }]}>Mein Tagebuch</Text>
      
      {history.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={{ fontSize: 60, marginBottom: 20 }}>📔</Text>
          <Text style={{ color: '#888', fontSize: 16, textAlign: 'center', paddingHorizontal: 20 }}>
            Hier werden deine zukünftigen Haut-Analysen sicher gespeichert.
          </Text>
        </View>
      ) : (
        history.map((entry: ScanEntry) => (
          <View key={entry.id} style={[styles.card, { backgroundColor: cardBg }]}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={{ color: textColor, fontWeight: 'bold', fontSize: 16 }}>Scan-Ergebnis</Text>
                <Text style={{ color: '#888', fontSize: 12, marginTop: 4 }}>{entry.date}</Text>
              </View>
              <View style={styles.scoreCircle}>
                 <Text style={styles.scoreText}>{entry.score}</Text>
              </View>
            </View>
            
            <TouchableOpacity onPress={() => toggleExpand(entry.id)} style={styles.expandBtn}>
              <Text style={{ color: '#C9956C', fontWeight: 'bold' }}>
                {expandedId === entry.id ? '↑ Matrix einklappen' : '↓ Vollständige Matrix ansehen'}
              </Text>
            </TouchableOpacity>

            {expandedId === entry.id && (
              <View style={styles.details}>
                <View style={styles.aiBox}>
                  <Text style={{ color: '#C9956C', fontWeight: 'bold', fontSize: 12, marginBottom: 5 }}>KI-ANALYSE</Text>
                  <Text style={{ color: isDark ? '#CCC' : '#555', lineHeight: 22 }}>{entry.solution}</Text>
                </View>

                <Text style={{ color: textColor, fontWeight: 'bold', marginTop: 20, marginBottom: 15 }}>Messwerte</Text>
                <DetailRow label="💧 Feuchtigkeit" value={entry.analysis.moisture} color="#4A90E2" isDark={isDark} />
                <DetailRow label="⚖️ Öl-Balance" value={entry.analysis.oil} color="#F5A623" isDark={isDark} />
                <DetailRow label="🔍 Poren-Zustand" value={entry.analysis.pores} color="#9013FE" isDark={isDark} />
                <DetailRow label="✨ Elastizität" value={entry.analysis.firmness} color="#7ED321" isDark={isDark} />
                <DetailRow label="🔴 Rötungen" value={entry.analysis.redness} color="#FF5E5E" isDark={isDark} />
                <DetailRow label="🦠 Unreinheiten" value={entry.analysis.acne} color="#8B572A" isDark={isDark} />

                <Text style={{ color: textColor, fontWeight: 'bold', marginTop: 20, marginBottom: 10 }}>Betroffene Zonen</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                   <ZoneChip label="Stirn" status={entry.details.stirn} isDark={isDark} />
                   <ZoneChip label="Nase" status={entry.details.nase} isDark={isDark} />
                   <ZoneChip label="Wangen" status={entry.details.wangen} isDark={isDark} />
                </View>
              </View>
            )}
          </View>
        ))
      )}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

// --- HILFSKOMPONENTEN ---
const DetailRow = ({ label, value, color, isDark }: any) => (
  <View style={{ marginBottom: 12 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
      <Text style={{ fontSize: 13, color: isDark ? '#CCC' : '#555', fontWeight: '500' }}>{label}</Text>
      {/* HIER WAR DER FEHLER: Die nächste Zeile war abgeschnitten */}
      <Text style={{ fontSize: 12, color: '#888', fontWeight: 'bold' }}>{value}%</Text>
    </View>
    <View style={{ height: 6, backgroundColor: isDark ? '#333' : '#EEE', borderRadius: 3 }}>
      <View style={{ width: `${value}%`, height: '100%', backgroundColor: color, borderRadius: 3 }} />
    </View>
  </View>
);

const ZoneChip = ({ label, status, isDark }: any) => (
  <View style={{ backgroundColor: isDark ? '#333' : '#F0F0F0', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20 }}>
    <Text style={{ color: isDark ? '#FFF' : '#333', fontSize: 12 }}><Text style={{fontWeight: 'bold'}}>{label}:</Text> {status}</Text>
  </View>
);

// --- STYLES ---
const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 25, paddingTop: 60 },
  header: { marginBottom: 20 },
  backBtn: { paddingVertical: 5 },
  backText: { color: '#A8D0C6', fontSize: 16, fontWeight: 'bold' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 25 },
  emptyState: { alignItems: 'center', marginTop: 100 },
  card: { padding: 25, borderRadius: 25, marginBottom: 20, elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  scoreCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#A8D0C6', justifyContent: 'center', alignItems: 'center' },
  scoreText: { color: '#FFF', fontWeight: 'bold', fontSize: 20 },
  expandBtn: { marginTop: 20, alignItems: 'center', backgroundColor: 'rgba(201, 149, 108, 0.08)', padding: 15, borderRadius: 15 },
  details: { marginTop: 20, borderTopWidth: 1, borderTopColor: 'rgba(150,150,150,0.1)', paddingTop: 20 },
  aiBox: { backgroundColor: 'rgba(168, 208, 198, 0.1)', padding: 15, borderRadius: 15, borderLeftWidth: 4, borderLeftColor: '#A8D0C6' }
});