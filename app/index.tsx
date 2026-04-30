import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router'; // <-- NEU
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScanEntry, useAppContent } from './_layout';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { setHistory, theme } = useAppContent();
  const isDark = theme === 'dark';
  const router = useRouter(); // <-- NEU: Für die Navigation

  const [step, setStep] = useState<'dashboard' | 'askMask' | 'scanning' | 'results'>('dashboard');
  const [results, setResults] = useState<ScanEntry | null>(null);

  const handleMaskAnswer = (hasMask: boolean) => {
    if (!hasMask) {
      setStep('dashboard');
      return;
    }
    setStep('scanning');
    setTimeout(() => {
      generateRandomResults();
      setStep('results');
    }, 2500);
  };

  const generateRandomResults = () => {
    const moisture = Math.floor(Math.random() * 50) + 40; 
    const oil = Math.floor(Math.random() * 50) + 40; 
    const pores = Math.floor(Math.random() * 40) + 50; 
    const firmness = Math.floor(Math.random() * 40) + 60; 
    const redness = Math.floor(Math.random() * 50) + 40; 
    const acne = Math.floor(Math.random() * 50) + 50; 

    const totalScore = Math.floor((moisture + oil + pores + firmness + redness + acne) / 6);
    const metrics = { Feuchtigkeit: moisture, 'Öl-Balance': oil, Poren: pores, Elastizität: firmness, Rötungen: redness, Unreinheiten: acne };
    const lowestMetric = Object.keys(metrics).reduce((a, b) => metrics[a as keyof typeof metrics] < metrics[b as keyof typeof metrics] ? a : b);

    let solution = "Deine Haut ist in einem guten Gleichgewicht. Setze deine aktuelle Routine fort.";
    if (lowestMetric === 'Feuchtigkeit') solution = "Dein Feuchtigkeitslevel ist kritisch niedrig. Setze auf okklusive Cremes mit Ceramiden und ein Hyaluron-Serum, um Feuchtigkeit in der Haut einzuschließen.";
    else if (lowestMetric === 'Öl-Balance') solution = "Deine Haut produziert zu viel Talg. Ein Serum mit Niacinamide (Vitamin B3) hilft, die Ölproduktion zu regulieren und mattiert langfristig.";
    else if (lowestMetric === 'Poren') solution = "Vergrößerte Poren durch Talgablagerungen. Nutze 1-2 mal wöchentlich ein BHA-Peeling (Salicylsäure), um die Poren tiefenrein zu säubern.";
    else if (lowestMetric === 'Elastizität') solution = "Leichter Verlust der Spannkraft. Integriere Peptide oder Retinol in deine Abendroutine, um die Kollagenproduktion anzuregen.";
    else if (lowestMetric === 'Rötungen') solution = "Erhöhte Rötungen gemessen. Deine Hautbarriere ist gestresst. Nutze beruhigende Inhaltsstoffe wie Centella Asiatica (Cica) oder Panthenol.";
    else if (lowestMetric === 'Unreinheiten') solution = "Aktive Unreinheiten erkannt. Verwende milde Reiniger und punktuelle Behandlungen mit Zink oder Salicylsäure. Vermeide es, die Haut zu überpflegen.";

    const newEntry: ScanEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('de-DE'),
      score: totalScore,
      details: {
        nase: oil < 60 ? 'Stark ölig' : 'Normal',
        wangen: redness < 60 ? 'Gerötet' : (moisture < 60 ? 'Trocken' : 'Normal'),
        augen: firmness < 70 ? 'Feine Linien' : 'Stabil',
        stirn: acne < 70 ? 'Unreinheiten' : 'Normal',
        mund: moisture < 50 ? 'Sehr trocken' : 'Normal',
      },
      analysis: { moisture, oil, pores, firmness, redness, acne },
      solution,
    };

    setResults(newEntry);
    setHistory((prev: ScanEntry[]) => [newEntry, ...prev]);
  };

  const reset = () => {
    setResults(null);
    setStep('dashboard');
  };

  const bgColor = isDark ? '#121212' : '#F5F7FA';
  const textColor = isDark ? '#FFFFFF' : '#1A1A1A';
  const cardBg = isDark ? '#1E1E1E' : '#FFFFFF';

  if (step === 'dashboard') {
    return (
      <ScrollView style={[styles.container, { backgroundColor: bgColor }]} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatarPlaceholder}><Text style={{fontSize: 20}}>😸</Text></View>
          <Text style={[styles.greeting, { color: textColor }]}>Hallo, Gast!</Text>
        </View>

        <View style={[styles.uvCard, { backgroundColor: cardBg }]}>
          <View style={styles.uvHeader}>
            <Text style={[styles.uvTitle, { color: textColor }]}>UV-Index</Text>
            <Text style={styles.locationText}>📍 Peine</Text>
          </View>
          <Text style={styles.uvValue}>5 Mittel</Text>
          <View style={styles.uvBarContainer}>
            <LinearGradient colors={['#A8D0C6', '#FFC8DD', '#FFA07A']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.uvBar} />
            <View style={[styles.uvDot, { left: '50%' }]} />
          </View>
          <Text style={styles.uvSubtitle}>Trage Sonnencreme mit LSF 30 oder höher auf.</Text>
        </View>

        <LinearGradient colors={['#E6E6FA', '#F0E6FA']} style={styles.routineBanner}>
          <Text style={styles.routineTitle}>Deine Pflegeroutine</Text>
          <Text style={styles.routineSubtitle}>Gib deiner Haut die Pflege, die sie wirklich verdient!</Text>
          <TouchableOpacity style={styles.createButton} onPress={() => router.push('/routine')}>
            <Text style={styles.createButtonText}>Jetzt erstellen</Text>
          </TouchableOpacity>
        </LinearGradient>

        <Text style={[styles.sectionTitle, { color: textColor }]}>Entdecken</Text>

        <View style={styles.grid}>
          <TouchableOpacity style={[styles.gridCard, { backgroundColor: '#A8D0C6' }]} onPress={() => setStep('askMask')} activeOpacity={0.8}>
            <Text style={styles.cardIcon}>📱</Text>
            <Text style={styles.cardTitle}>Scanner</Text>
            <Text style={styles.cardSubtitle}>Haut mit Maske scannen</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.gridCard, { backgroundColor: '#FFC8DD' }]} onPress={() => router.push('/pflege-finder')} activeOpacity={0.8}>
            <Text style={styles.cardIcon}>🧴</Text>
            <Text style={styles.cardTitle}>Pflege-Finder</Text>
            <Text style={styles.cardSubtitle}>Finde passende Produkte</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.gridCard, { backgroundColor: '#E0BBE4' }]} onPress={() => router.navigate('/history')} activeOpacity={0.8}>
            <Text style={styles.cardIcon}>📔</Text>
            <Text style={styles.cardTitle}>Tagebuch</Text>
            <Text style={styles.cardSubtitle}>Dein Haut-Fortschritt</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.gridCard, { backgroundColor: '#BDE0FE' }]} onPress={() => router.push('/uv-guide')} activeOpacity={0.8}>
            <Text style={styles.cardIcon}>☀️</Text>
            <Text style={styles.cardTitle}>UV-Guide</Text>
            <Text style={styles.cardSubtitle}>Sonnenschutz-Tipps</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.creditsContainer}>
          <Text style={styles.creditsTitle}>SkinScan Mask</Text>
          <Text style={styles.creditsText}>Gründe dein eigenes Unternehmen - Projekt</Text>
          <Text style={styles.creditsNames}>Erstellt von: Cansin Can Kurt & Rabia Kurt</Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: bgColor, justifyContent: 'center' }]}>
      {step === 'askMask' && (
        <View style={styles.centerContent}>
          <Text style={[styles.promptTitle, { color: textColor }]}>SkinScan Setup</Text>
          <Text style={styles.heroSubtitle}>Trägst du die SkinScan-Maske?</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.glassButton} onPress={() => handleMaskAnswer(false)}>
              <Text style={styles.glassButtonText}>Ohne Maske</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleMaskAnswer(true)}>
              <LinearGradient colors={['#C9956C', '#A6734D']} style={styles.smallButton}>
                <Text style={styles.mainButtonText}>Mit Maske</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {step === 'scanning' && (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#C9956C" />
          <Text style={[styles.scanText, { marginTop: 20 }]}>Analysiere 6-Punkt-Hautmatrix...</Text>
        </View>
      )}

      {step === 'results' && results && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingTop: 60, paddingBottom: 100 }}>
          <Text style={[styles.promptTitle, { color: textColor, textAlign: 'center' }]}>Analyse abgeschlossen!</Text>
          
          <View style={styles.scoreContainer}>
            <LinearGradient colors={['rgba(201, 149, 108, 0.2)', 'transparent']} style={styles.scoreCircle}>
              <Text style={[styles.hugeScore, { color: textColor }]}>{results.score}</Text>
              <Text style={styles.scoreLabel}>Haut-Score</Text>
            </LinearGradient>
          </View>

          <View style={[styles.uvCard, { backgroundColor: cardBg }]}>
            <Text style={[styles.resultCardTitle, { color: textColor, marginBottom: 15 }]}>Detail-Auswertung</Text>
            <StatBar label="Feuchtigkeit" value={results.analysis.moisture} icon="💧" isDark={isDark} />
            <StatBar label="Öl-Balance" value={results.analysis.oil} icon="⚖️" isDark={isDark} />
            <StatBar label="Porenfeinheit" value={results.analysis.pores} icon="🔍" isDark={isDark} />
            <StatBar label="Elastizität" value={results.analysis.firmness} icon="✨" isDark={isDark} />
            <StatBar label="Rötungen (Wenig = Gut)" value={results.analysis.redness} icon="🔴" isDark={isDark} />
            <StatBar label="Unreinheiten (Wenig = Gut)" value={results.analysis.acne} icon="🦠" isDark={isDark} />
          </View>

          <View style={[styles.uvCard, { backgroundColor: cardBg }]}>
            <Text style={[styles.resultCardTitle, { color: textColor }]}>Personalisierte Pflegetipps</Text>
            <Text style={{ color: isDark ? '#CCC' : '#555', marginTop: 10, lineHeight: 22, fontSize: 15 }}>{results.solution}</Text>
          </View>

          <TouchableOpacity style={[styles.createButton, { alignSelf: 'center', marginTop: 10, backgroundColor: '#A8D0C6' }]} onPress={reset}>
            <Text style={styles.createButtonText}>Zurück zum Menü</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}

const StatBar = ({ label, value, icon, isDark }: { label: string, value: number, icon: string, isDark: boolean }) => (
  <View style={styles.statRow}>
    <View style={styles.statLabelContainer}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={[styles.statLabelText, { color: isDark ? '#FFF' : '#333' }]}>{label}</Text>
    </View>
    <View style={styles.statBarBackground}>
      <LinearGradient
        colors={value < 50 ? ['#FF8A8A', '#FF5E5E'] : value < 80 ? ['#FFD166', '#FFB703'] : ['#A8D0C6', '#8AB5A9']}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        style={[styles.statBarFill, { width: `${value}%` }]}
      />
    </View>
    <Text style={[styles.statValueText, { color: isDark ? '#FFF' : '#333' }]}>{value}/100</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: 60, marginBottom: 20 },
  avatarPlaceholder: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  greeting: { fontSize: 24, fontWeight: 'bold' },
  uvCard: { padding: 20, borderRadius: 20, marginBottom: 20, elevation: 1, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
  uvHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  uvTitle: { fontSize: 16, fontWeight: 'bold' },
  locationText: { color: '#888', fontSize: 14 },
  uvValue: { fontSize: 22, fontWeight: 'bold', marginVertical: 10 },
  uvBarContainer: { height: 10, backgroundColor: '#E0E0E0', borderRadius: 5, marginVertical: 10, position: 'relative' },
  uvBar: { width: '100%', height: '100%', borderRadius: 5 },
  uvDot: { position: 'absolute', width: 14, height: 14, backgroundColor: '#FFF', borderRadius: 7, top: -2, borderWidth: 2, borderColor: '#333' },
  uvSubtitle: { color: '#888', fontSize: 12 },
  routineBanner: { padding: 25, borderRadius: 20, marginBottom: 25, alignItems: 'center' },
  routineTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  routineSubtitle: { color: '#666', marginTop: 5, marginBottom: 15, textAlign: 'center' },
  createButton: { backgroundColor: '#FF8A8A', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25 },
  createButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingBottom: 20 },
  gridCard: { width: (width - 55) / 2, padding: 20, borderRadius: 25, marginBottom: 15, height: 160 },
  cardIcon: { fontSize: 40, marginBottom: 10 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  cardSubtitle: { fontSize: 12, color: '#555' },
  creditsContainer: { alignItems: 'center', marginTop: 20, marginBottom: 50, padding: 20, backgroundColor: 'rgba(201, 149, 108, 0.1)', borderRadius: 20 },
  creditsTitle: { fontSize: 16, fontWeight: 'bold', color: '#C9956C', marginBottom: 5 },
  creditsText: { fontSize: 12, color: '#888', marginBottom: 5 },
  creditsNames: { fontSize: 14, fontWeight: '600', color: '#C9956C' },
  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  promptTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 5 },
  heroSubtitle: { color: '#888', fontSize: 17, textAlign: 'center', lineHeight: 24, marginBottom: 40 },
  buttonRow: { flexDirection: 'row', gap: 15 },
  glassButton: { paddingVertical: 15, paddingHorizontal: 25, borderRadius: 30, borderWidth: 1, borderColor: '#CCC' },
  glassButtonText: { color: '#888', fontWeight: '600' },
  smallButton: { paddingVertical: 15, paddingHorizontal: 30, borderRadius: 30 },
  mainButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  scanText: { color: '#C9956C', letterSpacing: 2, fontSize: 13, fontWeight: '600' },
  scoreContainer: { alignItems: 'center', marginVertical: 15 },
  scoreCircle: { width: 150, height: 150, borderRadius: 75, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(201, 149, 108, 0.3)' },
  hugeScore: { fontSize: 60, fontWeight: '900' },
  scoreLabel: { color: '#C9956C', fontSize: 12, fontWeight: '600', marginTop: -5 },
  resultCardTitle: { fontSize: 18, fontWeight: 'bold' },
  statRow: { marginBottom: 15 },
  statLabelContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  statIcon: { fontSize: 16, marginRight: 8 },
  statLabelText: { fontSize: 14, fontWeight: '500' },
  statBarBackground: { height: 12, backgroundColor: '#E0E0E0', borderRadius: 6, overflow: 'hidden' },
  statBarFill: { height: '100%', borderRadius: 6 },
  statValueText: { fontSize: 12, position: 'absolute', right: 0, top: 0, fontWeight: 'bold' }
});