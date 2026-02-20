import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const [lastRisk, setLastRisk] = useState(null);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.emoji}>🌸</Text>
      <Text style={styles.title}>AuraHealth</Text>
      <Text style={styles.subtitle}>Menstrual Wellness Tracker</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>How are you feeling today?</Text>
        <Text style={styles.cardText}>
          Log your symptoms and get an instant health risk assessment.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() => router.push('/(tabs)/risk')}
      >
        <Text style={styles.primaryBtnText}>🩺  Check Health Risk</Text>
      </TouchableOpacity>

      <Text style={styles.tagline}>
        Privacy-first • Vernacular-supported • Offline
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:      { flexGrow: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF5F5', padding: 24 },
  emoji:          { fontSize: 56, marginBottom: 8 },
  title:          { fontSize: 28, fontWeight: 'bold', color: '#C2185B', marginBottom: 4 },
  subtitle:       { fontSize: 16, color: '#666', marginBottom: 24 },
  card:           { backgroundColor: '#fff', borderRadius: 16, padding: 20, width: '100%', marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  cardTitle:      { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 6 },
  cardText:       { fontSize: 14, color: '#666', lineHeight: 20 },
  primaryBtn:     { backgroundColor: '#C2185B', borderRadius: 12, paddingVertical: 14, paddingHorizontal: 32, marginBottom: 24, width: '100%', alignItems: 'center' },
  primaryBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  tagline:        { fontSize: 13, color: '#FFB6C1', textAlign: 'center' },
});
