import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProductsScreen() {
  const handleScanProduct = () => {
    alert('Barcode Scanner wird geöffnet...');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produkte</Text>
      <Text style={styles.subtitle}>Scanne deine Hautpflege-Produkte, um die Inhaltsstoffe zu prüfen.</Text>
      
      <TouchableOpacity style={styles.scanButton} onPress={handleScanProduct}>
        <Text style={styles.buttonText}>📷 Barcode Scannen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { color: '#aaa', fontSize: 16, textAlign: 'center', marginBottom: 40 },
  scanButton: {
    backgroundColor: '#C9956C', // Dein Gold/Kupfer-Ton
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});