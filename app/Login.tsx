import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAppContent } from './(tabs)/_layout';

export default function LoginScreen() {
  const { theme, toggleTheme } = useAppContent();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Validierung: Echte Daten-Check Simulation
    if (email.toLowerCase() === 'test@skinscan.de' && password === 'maske123') {
      router.replace('/(tabs)');
    } else {
      alert('Ungültige Zugangsdaten. (Tipp: test@skinscan.de / maske123)');
    }
  };

  const isDark = theme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#0A0A0A' : '#F9F9F9' }]}>
      <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
        <Text style={{ color: isDark ? '#FFF' : '#000' }}>{isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: isDark ? '#FFF' : '#000' }]}>SkinScan Login</Text>
      
      <TextInput 
        style={[styles.input, { color: isDark ? '#FFF' : '#000', borderColor: isDark ? '#333' : '#DDD' }]}
        placeholder="E-Mail" placeholderTextColor="#888"
        value={email} onChangeText={setEmail}
      />
      <TextInput 
        style={[styles.input, { color: isDark ? '#FFF' : '#000', borderColor: isDark ? '#333' : '#DDD' }]}
        placeholder="Passwort" placeholderTextColor="#888" secureTextEntry
        value={password} onChangeText={setPassword}
      />

      <TouchableOpacity onPress={handleLogin}>
        <LinearGradient colors={['#C9956C', '#A6734D']} style={styles.button}>
          <Text style={styles.buttonText}>Anmelden</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 30 },
  themeToggle: { position: 'absolute', top: 50, right: 20, padding: 10 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  input: { borderWidth: 1, borderRadius: 12, padding: 15, marginBottom: 15 },
  button: { padding: 18, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold' }
});


//E-Mail: test@skinscan.de password : maske123