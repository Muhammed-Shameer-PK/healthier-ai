import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert,
} from 'react-native';
import { getDailyLogs, clearAllData } from '../../src/services/storageService';

export default function SettingsScreen() {
  const [logs, setLogs] = useState([]);

  useEffect(() => { getDailyLogs().then(setLogs); }, []);

  const handleClear = () => {
    Alert.alert(
      'Clear All Data',
      'This will permanently delete your profile and logs.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete', style: 'destructive',
          onPress: async () => {
            await clearAllData();
            setLogs([]);
            Alert.alert('Done', 'All data cleared.');
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>⚙️  Settings</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Health Log History</Text>
        {logs.length === 0 ? (
          <Text style={styles.empty}>No logs yet.</Text>
        ) : (
          logs.slice(-10).reverse().map((log, i) => (
            <View key={i} style={styles.logRow}>
              <Text style={styles.logDate}>
                {new Date(log.date).toLocaleDateString()}
              </Text>
              {log.isPeriod && <Text style={styles.badge}>🩸 Period</Text>}
              {log.symptoms?.length > 0 && (
                <Text style={styles.logSub}>{log.symptoms.join(', ')}</Text>
              )}
            </View>
          ))
        )}
      </View>

      <TouchableOpacity style={styles.dangerBtn} onPress={handleClear}>
        <Text style={styles.dangerBtnText}>🗑️  Clear All Data</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:    { flexGrow: 1, backgroundColor: '#FFF5F5', padding: 20 },
  title:        { fontSize: 22, fontWeight: 'bold', color: '#C2185B', marginBottom: 20 },
  card:         { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#333', marginBottom: 12 },
  empty:        { color: '#aaa', fontSize: 14 },
  logRow:       { paddingVertical: 8, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  logDate:      { fontSize: 13, fontWeight: '600', color: '#555' },
  badge:        { fontSize: 12, color: '#C2185B' },
  logSub:       { fontSize: 12, color: '#999' },
  dangerBtn:    { backgroundColor: '#fff0f0', borderRadius: 12, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: '#ffcccc' },
  dangerBtnText:{ color: '#e53e3e', fontSize: 16, fontWeight: '600' },
});
