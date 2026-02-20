import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';

const SYMPTOMS = [
  { key: 'heavy_bleeding',  label: 'Heavy Bleeding' },
  { key: 'severe_cramps',   label: 'Severe Cramps' },
  { key: 'fever',           label: 'Fever' },
  { key: 'irregular_cycle', label: 'Irregular Cycle' },
  { key: 'discharge',       label: 'Unusual Discharge' },
  { key: 'fatigue',         label: 'Fatigue' },
  { key: 'nausea',          label: 'Nausea' },
  { key: 'headache',        label: 'Headache' },
  { key: 'bloating',        label: 'Bloating' },
  { key: 'mood_swings',     label: 'Mood Swings' },
];

export default function RiskScreen() {
  const [selected, setSelected] = useState([]);

  const toggle = (key) =>
    setSelected(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);

  const handleAssess = () =>
    Alert.alert('Coming Soon', 'Risk assessment logic will be added in the next sprint.');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🩺 Health Assessment</Text>
      <Text style={styles.subtitle}>Select all symptoms you are experiencing:</Text>

      <View style={styles.grid}>
        {SYMPTOMS.map(s => (
          <TouchableOpacity
            key={s.key}
            style={[styles.chip, selected.includes(s.key) && styles.chipOn]}
            onPress={() => toggle(s.key)}
          >
            <Text style={[styles.chipTxt, selected.includes(s.key) && styles.chipTxtOn]}>
              {s.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Mock result preview */}
      <View style={styles.resultPreview}>
        <Text style={styles.resultPreviewLabel}>LAST ASSESSMENT</Text>
        <Text style={[styles.resultLevel, { color: '#34C759' }]}>Low Risk</Text>
        <Text style={styles.resultScore}>Score: 10 / 100</Text>
        <Text style={styles.resultMsg}>You appear to be healthy. Keep tracking!</Text>
      </View>

      <TouchableOpacity style={styles.btn} onPress={handleAssess}>
        <Text style={styles.btnTxt}>Assess Risk</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:           { flexGrow: 1, backgroundColor: '#FFF5F5', padding: 20, paddingTop: 52 },
  title:               { fontSize: 22, fontWeight: 'bold', color: '#C2185B', marginBottom: 4 },
  subtitle:            { fontSize: 14, color: '#666', marginBottom: 16 },
  grid:                { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  chip:                { backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#FFB6C1', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8 },
  chipOn:              { backgroundColor: '#FFB6C1', borderColor: '#C2185B' },
  chipTxt:             { fontSize: 13, color: '#555' },
  chipTxtOn:           { color: '#fff', fontWeight: '600' },
  resultPreview:       { backgroundColor: '#fff', borderWidth: 2, borderColor: '#34C759', borderRadius: 16, padding: 18, alignItems: 'center', marginBottom: 16 },
  resultPreviewLabel:  { fontSize: 10, color: '#aaa', letterSpacing: 0.5, marginBottom: 6 },
  resultLevel:         { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  resultScore:         { fontSize: 13, color: '#888', marginBottom: 6 },
  resultMsg:           { fontSize: 14, color: '#555', textAlign: 'center', lineHeight: 20 },
  btn:                 { backgroundColor: '#C2185B', borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  btnTxt:              { color: '#fff', fontSize: 16, fontWeight: '700' },
});
