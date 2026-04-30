import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Animated,
    Dimensions,
    LayoutAnimation,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    UIManager,
    View,
} from 'react-native';
import { ScanEntry, useAppContent } from '../_layout';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { setHistory, theme } = useAppContent();
  const isDark = theme === 'dark';
  const router = useRouter();

  const [step, setStep] = useState<'dashboard' | 'askMask' | 'scanning' | 'results'>('dashboard');
  const [scanText, setScanText] = useState("Kalibriere Sensoren...");
  const [results, setResults] = useState<ScanEntry | null>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (step === 'scanning') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.2, duration: 800, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        ])
      ).start();
    }
  }, [step]);

  const changeStep = (newStep: any) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setStep(newStep);
  };

  const handleMaskAnswer = (hasMask: boolean) => {
    if (!hasMask) {
      changeStep('dashboard');
      return;
    }
    
    changeStep('scanning');
    setScanText("Messe Feuchtigkeit & Öl...");

    // Simuliere verschiedene Analyse-Phasen
    setTimeout(() => setScanText("Scanne Poren & Elastizität..."), 1200);
    setTimeout(() => setScanText("Analysiere Rötungen & Unreinheiten..."), 2400);

    setTimeout(() => {
      generateRandomResults();
      changeStep('results');
    }, 3500);
  };

  const generateRandomResults = () => {
    const moisture = Math.floor(Math.random() * 50) + 40; 
    const oil = Math.floor(Math.random() * 50) + 40; 
    const pores = Math.floor(Math.random() * 40) + 50; 
    const firmness = Math.floor(Math.random() * 40) + 60; 
    const redness = Math.floor(Math.random() * 40) + 20; 
    const acne = Math.floor(Math.random() * 30) + 10; 

    // Score Berechnung (Höher ist besser, Rötungen/Akne werden negativ gewertet)
    const positiveScore = (moisture + (100 - oil) + pores + firmness) / 4;
    const penalty = (redness + acne) / 4;
    const totalScore = Math.min(100, Math.max(0, Math.floor(positiveScore - penalty + 20)));
    
    let solution = "Deine Hautstruktur ist stabil. Pflege sie weiterhin gut!";
    if (moisture < 50) solution = "Deine Hautbarriere braucht dringend mehr Feuchtigkeit (z.B. Ceramide, Hyaluron).";
    else if (oil > 70) solution = "Hohe Talgproduktion gemessen. Nutze Niacinamide zur Regulierung.";
    else if (redness > 50) solution = "Deine Haut ist leicht irritiert. Beruhige sie mit Panthenol oder Centella Asiatica.";

    const newEntry: ScanEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('de-DE') + ' ' + new Date().toLocaleTimeString('de-DE', {hour: '2-digit', minute:'2-digit'}),
      score: totalScore,
      details: { 
        nase: oil > 65 ? 'Sehr ölig' : 'Normal', 
        wangen: moisture < 50 ? 'Trocken' : 'Ausgeglichen', 
        augen: firmness < 60 ? 'Pflegebedarf' : 'Straff', 
        stirn: acne > 20 ? 'Unreinheiten' : 'Klar', 
        mund: 'Normal' 
      },
      analysis: { moisture, oil, pores, firmness, redness, acne },
      solution,
    };

    setResults(newEntry);
    setHistory((prev: ScanEntry[]) => [newEntry, ...prev]);
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
          <Text style={[styles.uvTitle, { color: textColor }]}>UV-Index: 5 Mittel</Text>
          <View style={styles.uvBarContainer}>
            <LinearGradient colors={['#A8D0C6', '#FFC8DD', '#FFA07A']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.uvBar} />
          </View>
          <View style={[styles.uvCard, { backgroundColor: cardBg }]}>
          <Text style={[styles.uvTitle, { color: textColor }]}>UV-Index: 5 Mittel</Text>
          <View style={styles.uvBarContainer}>
            <LinearGradient colors={['#A8D0C6', '#FFC8DD', '#FFA07A']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.uvBar} />
          </View>
          {/* HIER IST DAS BBS PEINE EASTER EGG */}
          <Text style={styles.uvSubtitle}>📍 BBS Peine — LSF 30+ für die große Pause auf dem Schulhof empfohlen!</Text>
        </View>
        </View>

        <LinearGradient colors={['#E6E6FA', '#F0E6FA']} style={styles.routineBanner}>
          <Text style={styles.routineTitle}>Deine Pflegeroutine</Text>
          <Text style={{color: '#666', marginBottom: 15, textAlign: 'center'}}>Basierend auf deinem Hauttyp.</Text>
          <TouchableOpacity style={styles.createButton} onPress={() => router.push('/routine')}>
            <Text style={styles.createButtonText}>Jetzt erstellen</Text>
          </TouchableOpacity>
        </LinearGradient>

        <Text style={[styles.sectionTitle, { color: textColor }]}>Entdecken</Text>
        <View style={styles.grid}>
          <GridCard icon="📱" title="Scanner" sub="Analyse starten" color="#A8D0C6" onPress={() => changeStep('askMask')} />
          <GridCard icon="🧴" title="Pflege-Finder" sub="Produkt-Match" color="#FFC8DD" onPress={() => router.push('/pflege-finder')} />
          <GridCard icon="📔" title="Tagebuch" sub="Verlauf" color="#E0BBE4" onPress={() => router.navigate('/history')} />
          <GridCard icon="☀️" title="UV-Guide" sub="Sonnenschutz" color="#BDE0FE" onPress={() => router.push('/uv-guide')} />
        </View>
        <View style={{height: 40}}/>
      </ScrollView>
    );
  }

  if (step === 'scanning') {
    return (
      <View style={[styles.container, { backgroundColor: bgColor, justifyContent: 'center', alignItems: 'center' }]}>
        <Animated.View style={{ transform: [{ scale: pulseAnim }], marginBottom: 40 }}>
          <View style={styles.scanCircle}>
             <Text style={{fontSize: 50}}>🤖</Text>
          </View>
        </Animated.View>
        <Text style={[styles.scanText, { color: textColor }]}>{scanText}</Text>
        <ActivityIndicator size="small" color="#A8D0C6" style={{marginTop: 20}} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: bgColor, justifyContent: 'center' }]}>
       {step === 'askMask' && (
        <View style={styles.centerContent}>
          <Text style={{fontSize: 60, marginBottom: 20}}>🎭</Text>
          <Text style={[styles.promptTitle, { color: textColor }]}>Maske aufgesetzt?</Text>
          <Text style={styles.heroSubtitle}>Verbinde die SkinScan-Maske mit deinem Gesicht, um optimale Messwerte zu garantieren.</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.glassButton, { backgroundColor: cardBg }]} onPress={() => changeStep('dashboard')}>
              <Text style={{color: isDark ? '#AAA' : '#555', fontWeight: 'bold'}}>Abbrechen</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleMaskAnswer(true)}>
              <LinearGradient colors={['#C9956C', '#A6734D']} style={styles.smallButton}>
                <Text style={{color: '#FFF', fontWeight: 'bold'}}>Ja, Scan starten</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {step === 'results' && results && (
        <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 60, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
          <Text style={[styles.promptTitle, { color: textColor, textAlign: 'center' }]}>Analyse abgeschlossen!</Text>
          
          <View style={styles.scoreContainer}>
            <Text style={[styles.hugeScore, { color: textColor }]}>{results.score}</Text>
            <Text style={styles.scoreLabel}>Health Score</Text>
          </View>
          
          <Text style={[styles.sectionTitle, { color: textColor, marginTop: 10 }]}>Die 6-Punkt-Matrix</Text>
          <View style={[styles.uvCard, { backgroundColor: cardBg }]}>
             <StatBar label="Feuchtigkeit" value={results.analysis.moisture} icon="💧" isDark={isDark} color="#4A90E2" />
             <StatBar label="Öl-Balance" value={results.analysis.oil} icon="⚖️" isDark={isDark} color="#F5A623" />
             <StatBar label="Poren-Zustand" value={results.analysis.pores} icon="🔍" isDark={isDark} color="#9013FE" />
             <StatBar label="Elastizität" value={results.analysis.firmness} icon="✨" isDark={isDark} color="#7ED321" />
             <StatBar label="Rötungen" value={results.analysis.redness} icon="🔴" isDark={isDark} color="#FF5E5E" />
             <StatBar label="Unreinheiten (Akne)" value={results.analysis.acne} icon="🦠" isDark={isDark} color="#8B572A" />
          </View>

          <Text style={[styles.sectionTitle, { color: textColor, marginTop: 10 }]}>Zonen-Analyse</Text>
          <View style={[styles.zoneContainer, { backgroundColor: cardBg }]}>
            <ZoneBadge name="Stirn" status={results.details.stirn} isDark={isDark} />
            <ZoneBadge name="Nase" status={results.details.nase} isDark={isDark} />
            <ZoneBadge name="Wangen" status={results.details.wangen} isDark={isDark} />
            <ZoneBadge name="Augen" status={results.details.augen} isDark={isDark} />
          </View>
          
          <View style={[styles.uvCard, { backgroundColor: cardBg, marginTop: 20 }]}>
             <Text style={{color: '#C9956C', fontWeight: 'bold', marginBottom: 5}}>KI-Empfehlung:</Text>
             <Text style={{ color: isDark ? '#CCC' : '#555', lineHeight: 22 }}>{results.solution}</Text>
          </View>

          <TouchableOpacity style={[styles.createButton, {alignSelf: 'center', marginTop: 10}]} onPress={() => changeStep('dashboard')}>
            <Text style={{color: '#FFF', fontSize: 16, fontWeight: 'bold'}}>Ergebnisse speichern</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}

// --- HILFSKOMPONENTEN ---
const GridCard = ({ icon, title, sub, color, onPress }: any) => (
  <TouchableOpacity style={[styles.gridCard, { backgroundColor: color }]} onPress={onPress}>
    <Text style={{ fontSize: 32 }}>{icon}</Text>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardSubtitle}>{sub}</Text>
  </TouchableOpacity>
);

const StatBar = ({ label, value, icon, isDark, color }: any) => (
  <View style={{ marginBottom: 18 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
      <Text style={{ color: isDark ? '#FFF' : '#333', fontSize: 13, fontWeight: '600' }}>{icon} {label}</Text>
      <Text style={{ color: '#888', fontSize: 12, fontWeight: 'bold' }}>{value}%</Text>
    </View>
    <View style={{ height: 8, backgroundColor: isDark ? '#333' : '#EEE', borderRadius: 4, overflow: 'hidden' }}>
      <View style={{ width: `${value}%`, height: '100%', backgroundColor: color || '#A8D0C6', borderRadius: 4 }} />
    </View>
  </View>
);

const ZoneBadge = ({ name, status, isDark }: any) => (
  <View style={styles.zoneBadge}>
    <Text style={{ color: '#888', fontSize: 11, textTransform: 'uppercase', fontWeight: 'bold' }}>{name}</Text>
    <Text style={{ color: isDark ? '#FFF' : '#000', fontSize: 14, fontWeight: '600', marginTop: 2 }}>{status}</Text>
  </View>
);

// --- STYLES ---
const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: 60, marginBottom: 20 },
  avatarPlaceholder: { width: 45, height: 45, borderRadius: 23, backgroundColor: '#DDD', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  greeting: { fontSize: 22, fontWeight: 'bold' },
  uvCard: { padding: 25, borderRadius: 25, marginBottom: 20, elevation: 1 },
  uvTitle: { fontWeight: 'bold', marginBottom: 15, fontSize: 16 },
  uvBarContainer: { height: 8, backgroundColor: '#EEE', borderRadius: 4, marginBottom: 8 },
  uvBar: { height: '100%', borderRadius: 4 },
  uvSubtitle: { fontSize: 12, color: '#888' },
  routineBanner: { padding: 25, borderRadius: 25, alignItems: 'center', marginBottom: 25 },
  routineTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginTop: 5 },
  createButton: { backgroundColor: '#FF8A8A', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30, elevation: 2 },
  createButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridCard: { width: (width - 55) / 2, padding: 20, borderRadius: 25, marginBottom: 15, height: 155 },
  cardTitle: { fontWeight: 'bold', marginTop: 12, fontSize: 17 },
  cardSubtitle: { fontSize: 11, opacity: 0.7, marginTop: 4 },
  scanCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(168, 208, 198, 0.2)', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#A8D0C6' },
  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  promptTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 15 },
  heroSubtitle: { color: '#888', marginBottom: 40, textAlign: 'center', fontSize: 15, lineHeight: 22 },
  buttonRow: { flexDirection: 'row', gap: 15 },
  glassButton: { padding: 18, borderRadius: 20, width: 140, alignItems: 'center', elevation: 1 },
  smallButton: { padding: 18, borderRadius: 20, width: 170, alignItems: 'center', elevation: 2 },
  scanText: { fontSize: 18, fontWeight: '600' },
  scoreContainer: { alignItems: 'center', marginVertical: 20 },
  hugeScore: { fontSize: 90, fontWeight: 'bold' },
  scoreLabel: { color: '#C9956C', fontWeight: 'bold', fontSize: 18, textTransform: 'uppercase', letterSpacing: 2 },
  zoneContainer: { padding: 20, borderRadius: 25, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  zoneBadge: { width: '48%', backgroundColor: 'rgba(150,150,150,0.05)', padding: 15, borderRadius: 15, marginBottom: 10 }
});