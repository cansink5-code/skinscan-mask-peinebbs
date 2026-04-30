import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ONBOARDING_DATA = [
  { emoji: '✨', title: 'SkinScan AI', description: 'Deine persönliche Hautanalyse direkt auf dem Smartphone.' },
  { emoji: '🔍', title: 'Präziser Scan', description: 'Wir analysieren Nase, Wangen, Augen und Mundpartie für beste Ergebnisse.' },
  { emoji: '📈', title: 'Dein Verlauf', description: 'Speichere jeden Scan und beobachte, wie sich deine Haut verbessert.' }
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  // FIX: Wir definieren currentItem mit einem Fallback (??), 
  // damit TypeScript weiß, dass es niemals undefined ist.
  const currentItem = ONBOARDING_DATA[currentIndex] ?? ONBOARDING_DATA[0];

  const handleNext = async () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      await AsyncStorage.setItem('@onboarding_complete', 'true');
      router.replace('/(tabs)');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <View style={styles.circleDecoration} />
          <Text style={styles.emoji}>{currentItem.emoji}</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{currentItem.title}</Text>
          <Text style={styles.description}>{currentItem.description}</Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.dotContainer}>
            {ONBOARDING_DATA.map((_, index) => (
              <View 
                key={index} 
                style={[styles.dot, currentIndex === index && styles.activeDot]} 
              />
            ))}
          </View>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>
              {currentIndex === ONBOARDING_DATA.length - 1 ? 'Starten' : 'Weiter'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  content: { flex: 1, padding: 40, justifyContent: 'center' },
  imageContainer: { alignItems: 'center', marginBottom: 50, justifyContent: 'center' },
  circleDecoration: { position: 'absolute', width: 200, height: 200, borderRadius: 100, backgroundColor: '#C9956C', opacity: 0.1 },
  emoji: { fontSize: 80 },
  textContainer: { alignItems: 'center' },
  title: { color: '#FFF', fontSize: 28, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  description: { color: '#888', fontSize: 16, textAlign: 'center', lineHeight: 24 },
  footer: { marginTop: 50, alignItems: 'center' },
  dotContainer: { flexDirection: 'row', marginBottom: 30 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#333', marginHorizontal: 5 },
  activeDot: { backgroundColor: '#C9956C', width: 20 },
  button: { backgroundColor: '#C9956C', paddingVertical: 15, paddingHorizontal: 60, borderRadius: 30 },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});