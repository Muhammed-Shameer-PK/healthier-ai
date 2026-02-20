import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RiskScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🩺</Text>
      <Text style={styles.title}>Health Risk</Text>
      <Text style={styles.text}>
        Risk assessment module coming in the next sprint.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF5F5', padding: 24 },
  icon:  { fontSize: 48, marginBottom: 12 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#C2185B', marginBottom: 12 },
  text:  { fontSize: 15, color: '#666', textAlign: 'center', lineHeight: 22 },
});
