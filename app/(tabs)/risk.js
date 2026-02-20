import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert,
} from 'react-native';
import { calculateRisk, ALL_SYMPTOMS } from '../../src/services/riskEngine';

const SYMPTOM_LABELS = {
  heavy_bleeding:  'Heavy Bleeding',
  severe_cramps:   'Severe Cramps',
  fever:           'Fever',
  irregular_cycle: 'Irregular Cycle',
  discharge:       'Unusual Discharge',
  fatigue:         'Fatigue',
  nausea:          'Nausea',
  headache:        'Headache',
  bloating:        'Bloating',
  mood_swings:     'Mood Swings',
};

export default function RiskScreen() {
  const [selected, setSelected] = useState([]);
  const [result, setResult]     = useState(null);

  const toggle = (symptom) => {
    setSelected(prev =>
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
    setResult(null);
  };

  const handleAssess = () => {
    if (selected.length === 0) {
      Alert.alert('No symptoms selected', 'Please select at least one symptom.');
      return;
    }
    setResult(calculateRisk(selected));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🩺 Health Assessment</Text>
      <Text style={styles.subtitle}>Select all symptoms you are experiencing:</Text>

      <View style={styles.grid}>
        {ALL_SYMPTOMS.map(s => (
          <TouchableOpacity
            key={s}
            style={[styles.chip, selected.includes(s) && styles.chipSelected]}
            onPress={() => toggle(s)}
          >
            <Text style={[styles.chipText, selected.includes(s) && styles.chipTextSelected]}>
              {SYMPTOM_LABELS[s]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.btn} onPress={handleAssess}>
        <Text style={styles.btnText}>Assess Risk</Text>
      </TouchableOpacity>

      {result && (
        <View style={[styles.result, { borderColor: result.color }]}>
          <Text style={[styles.level, { color: result.color }]}>
            {result.risk_level} Risk
          </Text>
          <Text style={styles.score}>Score: {result.score}</Text>
          <Text style={styles.msg}>{result.message}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:       { flexGrow: 1, backgroundColor: '#FFF5F5', padding: 20 },
  title:           { fontSize: 22, fontWeight: 'bold', color: '#C2185B', marginBottom: 4 },
  subtitle:        { fontSize: 14, color: '#666', marginBottom: 16 },
  grid:            { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  chip:            { backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#FFB6C1', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 7 },
  chipSelected:    { backgroundColor: '#FFB6C1', borderColor: '#C2185B' },
  chipText:        { fontSize: 13, color: '#555' },
  chipTextSelected:{ color: '#fff', fontWeight: '600' },
  btn:             { backgroundColor: '#C2185B', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginBottom: 20 },
  btnText:         { color: '#fff', fontSize: 16, fontWeight: '700' },
  result:          { backgroundColor: '#fff', borderWidth: 2, borderRadius: 16, padding: 20, alignItems: 'center' },
  level:           { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  score:           { fontSize: 14, color: '#888', marginBottom: 8 },
  msg:             { fontSize: 15, color: '#444', textAlign: 'center', lineHeight: 22 },
});
