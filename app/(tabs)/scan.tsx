import * as MediaLibrary from 'expo-media-library';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function ScanScreen() {
  const saveImage = async (uri: string) => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        await MediaLibrary.saveToLibraryAsync(uri);
      }
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Scan Content */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' }
});