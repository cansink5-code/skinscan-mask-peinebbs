import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppContent } from './_layout';

export default function PflegeFinderScreen() {
  const { history, theme } = useAppContent();
  const isDark = theme === 'dark';
  const router = useRouter();
  
  const latest = history.length > 0 ? history[0] : null;

  const bgColor = isDark ? '#121212' : '#F5F7FA';
  const textColor = isDark ? '#FFFFFF' : '#1A1A1A';
  const cardBg = isDark ? '#1E1E1E' : '#FFFFFF';

  // --- DER SMARTE ALGORITHMUS ---
  const getSmartProducts = () => {
    if (!latest) return [];
    
    const { moisture, oil, pores, firmness, redness, acne } = latest.analysis;
    let products = [];

    // Feuchtigkeit fehlt
    if (moisture < 55) {
      products.push({ icon: '💧', name: "Hyaluronic Acid 2% + B5", brand: "HydraLab", match: "98%", reason: "Füllt Feuchtigkeitsdepots auf" });
      products.push({ icon: '🛡️', name: "Ceramide Barrier Cream", brand: "SkinProtect", match: "95%", reason: "Schließt Feuchtigkeit ein" });
    }
    // Zu ölig & große Poren
    if (oil > 60 || pores < 60) {
      products.push({ icon: '🌿', name: "Niacinamide 10% + Zinc", brand: "PoreClear", match: "96%", reason: "Reguliert die Talgproduktion" });
      products.push({ icon: '🧪', name: "BHA 2% Liquid Peeling", brand: "GlowTech", match: "92%", reason: "Befreit verstopfte Poren" });
    }
    // Rötungen & Irritationen
    if (redness > 40) {
      products.push({ icon: '🌱', name: "Centella Asiatica Serum", brand: "CalmSkin", match: "97%", reason: "Lindert akute Rötungen" });
    }
    // Unreinheiten / Akne
    if (acne > 30) {
      products.push({ icon: '🩹', name: "Azelainsäure 10%", brand: "ClearBalance", match: "94%", reason: "Wirkt antibakteriell" });
    }
    // Elastizität lässt nach
    if (firmness < 65) {
      products.push({ icon: '✨', name: "Peptide + Retinol Complex", brand: "YouthBoost", match: "90%", reason: "Fördert die Kollagenbildung" });
    }

    // Wenn die Haut perfekt ist (Fallback)
    if (products.length === 0) {
      products.push({ icon: '☀️', name: "Daily SPF 50+ Invisible", brand: "SunShield", match: "99%", reason: "Zum Schutz deiner perfekten Haut" });
      products.push({ icon: '🧴', name: "Mild Hydrating Cleanser", brand: "PureBasics", match: "95%", reason: "Für die sanfte Reinigung" });
    }

    // Zeige maximal die Top 3 an, damit es übersichtlich bleibt
    return products.slice(0, 3);
  };

  const recommendedProducts = getSmartProducts();

  return (
    <ScrollView style={[styles.container, { backgroundColor: bgColor }]} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>‹ Zurück</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: textColor }]}>Pflege-Finder</Text>
        <View style={{ width: 60 }} />
      </View>

      {!latest ? (
        <View style={styles.emptyContainer}>
          <Text style={{ fontSize: 60, marginBottom: 20 }}>🔍</Text>
          <Text style={{ color: '#888', textAlign: 'center', fontSize: 16 }}>
            Führe zuerst einen Scan mit deiner Maske durch, damit wir die richtigen Produkte für dich finden können.
          </Text>
          <TouchableOpacity style={styles.scanNowBtn} onPress={() => router.push('/(tabs)')}>
            <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Zum Scanner</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <View style={[styles.card, { backgroundColor: cardBg }]}>
            <Text style={styles.label}>KI-Analyse deines letzten Scans:</Text>
            <Text style={[styles.solutionText, { color: textColor }]}>{latest.solution}</Text>
          </View>

          <Text style={[styles.sectionTitle, { color: textColor }]}>Dein Perfect Match</Text>
          <Text style={{ color: '#888', marginBottom: 15, fontSize: 13 }}>
            Exakt abgestimmt auf deine Analysewerte.
          </Text>
          
          {recommendedProducts.map((prod, index) => (
            <ProductItem key={index} {...prod} isDark={isDark} />
          ))}
        </View>
      )}
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const ProductItem = ({ icon, name, brand, match, reason, isDark }: any) => (
  <View style={[styles.productItem, { backgroundColor: isDark ? '#1E1E1E' : '#FFF' }]}>
    <View style={styles.productIcon}><Text style={{ fontSize: 24 }}>{icon}</Text></View>
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: '#888', fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase' }}>{brand}</Text>
        <View style={styles.matchBadge}><Text style={styles.matchText}>{match}</Text></View>
      </View>
      <Text style={{ color: isDark ? '#FFF' : '#333', fontWeight: 'bold', fontSize: 15, marginTop: 4 }}>{name}</Text>
      <Text style={{ color: '#C9956C', fontSize: 12, marginTop: 4, fontStyle: 'italic' }}>{reason}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 25, paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  backBtn: { padding: 5 },
  backText: { color: '#A8D0C6', fontSize: 18, fontWeight: 'bold' },
  title: { fontSize: 24, fontWeight: 'bold' },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 80 },
  scanNowBtn: { backgroundColor: '#C9956C', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 25, marginTop: 30 },
  card: { padding: 20, borderRadius: 20, marginBottom: 30, elevation: 1 },
  label: { color: '#888', fontSize: 12, textTransform: 'uppercase', marginBottom: 8, fontWeight: 'bold' },
  solutionText: { fontSize: 15, lineHeight: 22 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold' },
  productItem: { flexDirection: 'row', padding: 15, borderRadius: 20, marginBottom: 15, elevation: 1 },
  productIcon: { width: 55, height: 55, backgroundColor: 'rgba(150,150,150,0.08)', borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  matchBadge: { backgroundColor: 'rgba(168, 208, 198, 0.2)', paddingVertical: 3, paddingHorizontal: 8, borderRadius: 8 },
  matchText: { color: '#A8D0C6', fontWeight: 'bold', fontSize: 10 }
});