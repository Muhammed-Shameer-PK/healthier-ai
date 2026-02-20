import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  SafeAreaView, TextInput, Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

const noop = () => Alert.alert('Coming Soon', 'Assessment engine not yet active.');

const SYMPTOMS = [
  { key: 'heavyBleeding',  label: 'Heavy Bleeding',         hi: 'अत्यधिक रक्तस्राव', weight: 3, emergency: false },
  { key: 'fatigue',        label: 'Fatigue / Weakness',     hi: 'थकान / कमजोरी',    weight: 2, emergency: false },
  { key: 'dizziness',      label: 'Dizziness',              hi: 'चक्कर आना',          weight: 2, emergency: false },
  { key: 'irregularCycle', label: 'Irregular Cycles',       hi: 'अनियमित मासिक',     weight: 2, emergency: false },
  { key: 'pain',           label: 'Pelvic Pain',            hi: 'पेल्विक दर्द',       weight: 2, emergency: false },
  { key: 'pregnancyIssue', label: 'Pregnancy Concerns',     hi: 'गर्भावस्था चिंता',  weight: 3, emergency: false },
  { key: 'fainted',        label: '🚨 Fainting',            hi: '🚨 बेहोशी',           weight: 5, emergency: true },
  { key: 'severePain',     label: '🚨 Severe Pain',         hi: '🚨 तेज दर्द',        weight: 5, emergency: true },
  { key: 'vomiting',       label: '🚨 Persistent Vomiting', hi: '🚨 लगातार उल्टी',   weight: 4, emergency: true },
];

export default function SymptomsScreen() {
  const router = useRouter();
  const [active, setActive] = useState({});
  const [hb, setHb] = useState('');
  const [lang, setLang] = useState('en');

  const toggle = (key) => setActive(prev => ({ ...prev, [key]: !prev[key] }));
  const count = Object.values(active).filter(Boolean).length;

  const regularSymptoms = SYMPTOMS.filter(sym => !sym.emergency);
  const emergencySymptoms = SYMPTOMS.filter(sym => sym.emergency);

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.container} keyboardShouldPersistTaps="handled">
        <View style={s.headerRow}>
          <View>
            <Text style={s.title}>{lang === 'hi' ? 'लक्षण मूल्यांकन' : 'Symptom Assessment'}</Text>
            <Text style={s.sub}>{lang === 'hi' ? 'जो लागू हो वो चुनें' : 'Select all that apply'}</Text>
          </View>
          <View style={s.langRow}>
            <TouchableOpacity style={[s.lBtn, lang === 'en' && s.lBtnA]} onPress={() => setLang('en')}>
              <Text style={[s.lTxt, lang === 'en' && s.lTxtA]}>EN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.lBtn, lang === 'hi' && s.lBtnA]} onPress={() => setLang('hi')}>
              <Text style={[s.lTxt, lang === 'hi' && s.lTxtA]}>हि</Text>
            </TouchableOpacity>
          </View>
        </View>

        {count > 0 && (
          <View style={s.countBadge}>
            <Text style={s.countText}>{count} symptom{count !== 1 ? 's' : ''} selected</Text>
          </View>
        )}

        <Text style={s.section}>{lang === 'hi' ? 'सामान्य लक्षण' : 'General Symptoms'}</Text>
        {regularSymptoms.map(sym => (
          <TouchableOpacity
            key={sym.key}
            style={[s.row, active[sym.key] && s.rowActive]}
            onPress={() => toggle(sym.key)}
            activeOpacity={0.8}
          >
            <View style={s.rowLeft}>
              <Text style={s.rowLabel}>{lang === 'hi' ? sym.hi : sym.label}</Text>
              <View style={s.weightDots}>
                {[1, 2, 3, 4, 5].map(i => (
                  <View key={i} style={[s.dot, i <= sym.weight && s.dotFill]} />
                ))}
              </View>
            </View>
            <View style={[s.checkbox, active[sym.key] && s.checkboxChecked]}>
              {active[sym.key] && <Text style={s.checkmark}>v</Text>}
            </View>
          </TouchableOpacity>
        ))}

        <Text style={s.section}>{lang === 'hi' ? 'हीमोग्लोबिन' : 'Hemoglobin Level'}</Text>
        <TextInput
          style={s.hbInput}
          value={hb}
          onChangeText={setHb}
          placeholder={lang === 'hi' ? 'जैसे: 10.5 g/dL' : 'e.g. 10.5 g/dL'}
          placeholderTextColor="#CCC"
          keyboardType="decimal-pad"
          maxLength={5}
        />
        <Text style={s.hbNote}>{lang === 'hi' ? 'सामान्य: 12-16 g/dL' : 'Normal range: 12-16 g/dL for women'}</Text>

        <Text style={[s.section, s.sectionRed]}>
          {lang === 'hi' ? 'आपातकालीन लक्षण' : 'Emergency Symptoms'}
        </Text>
        <Text style={s.emergencyNote}>
          {lang === 'hi' ? 'इनमें से कोई भी चुनने पर तुरंत मदद मिलेगी' : 'Selecting any of these triggers immediate assistance'}
        </Text>
        {emergencySymptoms.map(sym => (
          <TouchableOpacity
            key={sym.key}
            style={[s.row, s.rowEmergency, active[sym.key] && s.rowEmergencyActive]}
            onPress={() => toggle(sym.key)}
            activeOpacity={0.8}
          >
            <Text style={s.rowLabel}>{lang === 'hi' ? sym.hi : sym.label}</Text>
            <View style={[s.checkbox, active[sym.key] && s.checkboxEmergency]}>
              {active[sym.key] && <Text style={s.checkmark}>v</Text>}
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={s.submitBtn} onPress={noop} activeOpacity={0.85}>
          <Text style={s.submitTxt}>{lang === 'hi' ? 'मूल्यांकन करें' : 'Assess My Health'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF5F5' },
  container: { padding: 20, paddingBottom: 40 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  title: { fontSize: 24, fontWeight: '800', color: '#333' },
  sub: { fontSize: 14, color: '#AAA', marginTop: 2 },
  langRow: { flexDirection: 'row', gap: 6 },
  lBtn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1.5, borderColor: '#DDD' },
  lBtnA: { backgroundColor: '#C2185B', borderColor: '#C2185B' },
  lTxt: { fontSize: 13, color: '#888' },
  lTxtA: { color: '#FFF', fontWeight: '700' },
  countBadge: { backgroundColor: '#FFE4E9', borderRadius: 8, padding: 10, marginBottom: 12 },
  countText: { fontSize: 14, color: '#C2185B', fontWeight: '600', textAlign: 'center' },
  section: { fontSize: 17, fontWeight: '700', color: '#555', marginTop: 20, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#FFE4E9', paddingBottom: 6 },
  sectionRed: { color: '#D32F2F', borderBottomColor: '#FFCDD2' },
  row: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#FFF', borderRadius: 12, padding: 16, marginBottom: 8,
    borderWidth: 1.5, borderColor: '#E0E0E0',
  },
  rowActive: { borderColor: '#FFB6C1', backgroundColor: '#FFF5F8' },
  rowEmergency: { borderColor: '#FFCDD2' },
  rowEmergencyActive: { borderColor: '#F44336', backgroundColor: '#FFF0F0' },
  rowLeft: { flex: 1 },
  rowLabel: { fontSize: 15, color: '#333', fontWeight: '500' },
  weightDots: { flexDirection: 'row', gap: 3, marginTop: 4 },
  dot: { width: 7, height: 7, borderRadius: 3, backgroundColor: '#E0E0E0' },
  dotFill: { backgroundColor: '#FFB6C1' },
  checkbox: { width: 26, height: 26, borderRadius: 6, borderWidth: 2, borderColor: '#DDD', alignItems: 'center', justifyContent: 'center' },
  checkboxChecked: { backgroundColor: '#FFB6C1', borderColor: '#FFB6C1' },
  checkboxEmergency: { backgroundColor: '#F44336', borderColor: '#F44336' },
  checkmark: { color: '#FFF', fontWeight: '700', fontSize: 14 },
  hbInput: { backgroundColor: '#FFF', borderRadius: 12, borderWidth: 1.5, borderColor: '#E0E0E0', paddingVertical: 14, paddingHorizontal: 16, fontSize: 15, color: '#333' },
  hbNote: { fontSize: 12, color: '#AAA', marginTop: 6, marginLeft: 4 },
  emergencyNote: { fontSize: 13, color: '#D32F2F', fontStyle: 'italic', marginBottom: 8 },
  submitBtn: {
    backgroundColor: '#C2185B', borderRadius: 14, paddingVertical: 18,
    alignItems: 'center', marginTop: 28,
    shadowColor: '#C2185B', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  submitTxt: { fontSize: 18, fontWeight: '700', color: '#FFF' },
});
