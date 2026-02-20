import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.emoji}>🌸</Text>
      <Text style={styles.title}>AuraHealth</Text>
      <Text style={styles.subtitle}>Menstrual Wellness Tracker</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>
          Navigate using the tabs below to explore the app.
        </Text>
      </View>
      <Text style={styles.tagline}>
        Privacy-first • Vernacular-supported • Offline
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF5F5', padding: 24 },
  emoji:     { fontSize: 56, marginBottom: 8 },
  title:     { fontSize: 28, fontWeight: 'bold', color: '#C2185B', marginBottom: 4 },
  subtitle:  { fontSize: 16, color: '#666', marginBottom: 24 },
  card:      { backgroundColor: '#fff', borderRadius: 16, padding: 20, width: '100%', marginBottom: 24, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  cardText:  { fontSize: 15, color: '#555', textAlign: 'center', lineHeight: 22 },
  tagline:   { fontSize: 13, color: '#FFB6C1', textAlign: 'center' },
});
