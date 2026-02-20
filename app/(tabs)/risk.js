import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert,
} from 'react-native';
import { useLanguage } from '../../src/context/LanguageContext';
import LanguageSwitch from '../../src/components/LanguageSwitch';
import { calculateRisk, ALL_SYMPTOMS } from '../../src/services/riskEngine';

const SYMPTOM_LABELS_EN = {
  heavy_bleeding: 'Heavy Bleeding', severe_cramps: 'Severe Cramps', fever: 'Fever',
  irregular_cycle: 'Irregular Cycle', discharge: 'Unusual Discharge', fatigue: 'Fatigue',
  nausea: 'Nausea', headache: 'Headache', bloating: 'Bloating', mood_swings: 'Mood Swings',
};
const SYMPTOM_LABELS_HI = {
  heavy_bleeding: 'अधिक रक्तस्राव', severe_cramps: 'तेज दर्द', fever: 'बुखार',
  irregular_cycle: 'अनियमित चक्र', discharge: 'असामान्य स्राव', fatigue: 'थकान',
  nausea: 'मतली', headache: 'सिरदर्द', bloating: 'पेट फूलना', mood_swings: 'मूड बदलना',
};

export default function RiskScreen() {
  const { t, language } = useLanguage();
  const labels = language === 'hi' ? SYMPTOM_LABELS_HI : SYMPTOM_LABELS_EN;
  const [selected, setSelected] = useState([]);
  const [result, setResult]     = useState(null);

  const toggle = (s) => {
    setSelected(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
    setResult(null);
  };

  const handleAssess = () => {
    if (!selected.length) { Alert.alert('', language === 'hi' ? 'कृपया कम से कम एक लक्षण चुनें' : 'Select at least one symptom.'); return; }
    setResult(calculateRisk(selected));
  };

  const levelLabel = result
    ? (language === 'hi'
      ? result.risk_level === 'High' ? t.riskHigh : result.risk_level === 'Medium' ? t.riskMedium : t.riskLow
      : `${result.risk_level} Risk`)
    : '';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🩺  {language === 'hi' ? 'स्वास्थ्य आकलन' : 'Health Assessment'}</Text>
        <LanguageSwitch />
      </View>
      <Text style={styles.subtitle}>{t.selectSymptoms}</Text>
      <View style={styles.grid}>
        {ALL_SYMPTOMS.map(s => (
          <TouchableOpacity key={s}
            style={[styles.chip, selected.includes(s) && styles.chipOn]}
            onPress={() => toggle(s)}
          >
            <Text style={[styles.chipTxt, selected.includes(s) && styles.chipTxtOn]}>{labels[s]}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.btn} onPress={handleAssess}>
        <Text style={styles.btnTxt}>{t.assessRisk}</Text>
      </TouchableOpacity>
      {result && (
        <View style={[styles.result, { borderColor: result.color }]}>
          <Text style={[styles.level, { color: result.color }]}>{levelLabel}</Text>
          <Text style={styles.score}>Score: {result.score}</Text>
          <Text style={styles.msg}>{result.message}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#FFF5F5', padding: 20 },
  header:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  title:     { fontSize: 20, fontWeight: 'bold', color: '#C2185B' },
  subtitle:  { fontSize: 14, color: '#666', marginBottom: 16 },
  grid:      { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  chip:      { backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#FFB6C1', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 7 },
  chipOn:    { backgroundColor: '#FFB6C1', borderColor: '#C2185B' },
  chipTxt:   { fontSize: 13, color: '#555' },
  chipTxtOn: { color: '#fff', fontWeight: '600' },
  btn:       { backgroundColor: '#C2185B', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginBottom: 20 },
  btnTxt:    { color: '#fff', fontSize: 16, fontWeight: '700' },
  result:    { backgroundColor: '#fff', borderWidth: 2, borderRadius: 16, padding: 20, alignItems: 'center' },
  level:     { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  score:     { fontSize: 14, color: '#888', marginBottom: 8 },
  msg:       { fontSize: 15, color: '#444', textAlign: 'center', lineHeight: 22 },
});
