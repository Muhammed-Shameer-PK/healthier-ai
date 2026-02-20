import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  SafeAreaView, Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

const noop = () => Alert.alert('Coming Soon', 'This feature is not yet active.');

const MOCK = {
  score: 14,
  level: 'MODERATE',
  color: '#FF9800',
  advice: 'Your symptoms suggest moderate risk. Consider consulting a healthcare provider within the next few days. Maintain hydration and rest.',
  adviceHi: 'आपके लक्षण मध्यम जोखिम दर्शाते हैं। अगले कुछ दिनों में स्वास्थ्य सेवा प्रदाता से सलाह लें।',
};

const RECS = [
  { icon: '💊', title: 'Track Iron Intake',  titleHi: 'आयरन ट्रैक करें',  desc: 'Low iron can worsen fatigue. Include spinach, lentils, and jaggery in your diet.' },
  { icon: '🧘', title: 'Light Exercise',     titleHi: 'हल्का व्यायाम',    desc: 'Yoga or a short walk can help relieve cramps and reduce stress.' },
  { icon: '💬', title: 'Talk to an Expert',  titleHi: 'विशेषज्ञ से बात करें', desc: 'Speak with our AI Health Advocate or share your result with an ASHA worker.' },
];

const badgeBg  = { LOW: '#E8F5E9', MODERATE: '#FFF8E1', HIGH: '#FFEBEE' };
const badgeTxt = { LOW: '#2E7D32', MODERATE: '#E65100', HIGH: '#C62828' };
const levelLbl = { LOW: 'LOW RISK', MODERATE: 'MODERATE RISK', HIGH: 'HIGH RISK' };
const levelHi  = { LOW: 'कम जोखिम', MODERATE: 'मध्यम जोखिम', HIGH: 'उच्च जोखिम' };

export default function ResultScreen() {
  const router = useRouter();
  const [lang, setLang] = useState('en');

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.container}>
        <View style={s.langRow}>
          <TouchableOpacity style={[s.lBtn, lang === 'en' && s.lBtnA]} onPress={() => setLang('en')}>
            <Text style={[s.lTxt, lang === 'en' && s.lTxtA]}>EN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.lBtn, lang === 'hi' && s.lBtnA]} onPress={() => setLang('hi')}>
            <Text style={[s.lTxt, lang === 'hi' && s.lTxtA]}>हि</Text>
          </TouchableOpacity>
        </View>

        <Text style={s.title}>{lang === 'hi' ? 'मूल्यांकन परिणाम' : 'Assessment Result'}</Text>

        <View style={[s.badge, { backgroundColor: badgeBg[MOCK.level] }]}>
          <Text style={[s.badgeLevel, { color: badgeTxt[MOCK.level] }]}>
            {lang === 'hi' ? levelHi[MOCK.level] : levelLbl[MOCK.level]}
          </Text>
          <Text style={[s.badgeScore, { color: MOCK.color }]}>{MOCK.score}</Text>
          <Text style={[s.badgeScoreLabel, { color: MOCK.color }]}>/ 30</Text>
          <View style={s.progressBarBg}>
            <View style={[s.progressBarFill, { width: (MOCK.score / 30 * 100) + '%', backgroundColor: MOCK.color }]} />
          </View>
        </View>

        <View style={[s.adviceCard, { borderLeftColor: MOCK.color }]}>
          <Text style={s.adviceTitle}>{lang === 'hi' ? 'सिफारिश' : 'Recommendation'}</Text>
          <Text style={s.adviceText}>{lang === 'hi' ? MOCK.adviceHi : MOCK.advice}</Text>
        </View>

        <Text style={s.sectionTitle}>{lang === 'hi' ? 'अगले कदम' : 'Next Steps'}</Text>
        {RECS.map((r, i) => (
          <View key={i} style={s.recCard}>
            <Text style={s.recIcon}>{r.icon}</Text>
            <View style={s.recBody}>
              <Text style={s.recTitle}>{lang === 'hi' ? r.titleHi : r.title}</Text>
              <Text style={s.recDesc}>{r.desc}</Text>
            </View>
          </View>
        ))}

        <View style={s.buttonsCol}>
          <TouchableOpacity style={s.btnPrimary} onPress={noop} activeOpacity={0.85}>
            <Text style={s.btnPrimaryTxt}>💬 {lang === 'hi' ? 'AI से बात करें' : 'Talk to AI Advocate'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.btnSecondary} onPress={() => router.push('/symptoms')} activeOpacity={0.85}>
            <Text style={s.btnSecondaryTxt}>{lang === 'hi' ? 'नया मूल्यांकन' : 'New Assessment'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.btnTertiary} onPress={() => router.replace('/(tabs)')} activeOpacity={0.85}>
            <Text style={s.btnTertiaryTxt}>{lang === 'hi' ? 'होम पर जाएं' : 'Go Home'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF5F5' },
  container: { padding: 20, paddingBottom: 40 },
  langRow: { flexDirection: 'row', gap: 8, justifyContent: 'flex-end', marginBottom: 12 },
  lBtn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1.5, borderColor: '#DDD' },
  lBtnA: { backgroundColor: '#C2185B', borderColor: '#C2185B' },
  lTxt: { fontSize: 13, color: '#888' },
  lTxtA: { color: '#FFF', fontWeight: '700' },
  title: { fontSize: 26, fontWeight: '800', color: '#333', textAlign: 'center', marginBottom: 20 },
  badge: {
    borderRadius: 20, padding: 28, alignItems: 'center', marginBottom: 24,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
  },
  badgeLevel: { fontSize: 13, fontWeight: '700', letterSpacing: 1.5, marginBottom: 8 },
  badgeScore: { fontSize: 60, fontWeight: '800' },
  badgeScoreLabel: { fontSize: 16, fontWeight: '600', marginTop: -8, marginBottom: 16 },
  progressBarBg: { width: '100%', height: 10, backgroundColor: '#E0E0E0', borderRadius: 5, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 5 },
  adviceCard: {
    backgroundColor: '#FFF', borderRadius: 14, padding: 20,
    borderLeftWidth: 5, marginBottom: 24,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  adviceTitle: { fontSize: 15, fontWeight: '700', color: '#555', marginBottom: 8 },
  adviceText: { fontSize: 14, color: '#666', lineHeight: 22 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#555', marginBottom: 12 },
  recCard: {
    flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 14, padding: 16,
    marginBottom: 10, borderWidth: 1.5, borderColor: '#FFE4E9',
  },
  recIcon: { fontSize: 28, marginRight: 14 },
  recBody: { flex: 1 },
  recTitle: { fontSize: 15, fontWeight: '700', color: '#333', marginBottom: 4 },
  recDesc: { fontSize: 13, color: '#777', lineHeight: 19 },
  buttonsCol: { gap: 12, marginTop: 24 },
  btnPrimary: {
    backgroundColor: '#C2185B', borderRadius: 14, paddingVertical: 16, alignItems: 'center',
    shadowColor: '#C2185B', shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25, shadowRadius: 6, elevation: 3,
  },
  btnPrimaryTxt: { fontSize: 16, fontWeight: '700', color: '#FFF' },
  btnSecondary: { backgroundColor: '#FFB6C1', borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  btnSecondaryTxt: { fontSize: 16, fontWeight: '700', color: '#FFF' },
  btnTertiary: { backgroundColor: 'transparent', borderRadius: 14, paddingVertical: 14, alignItems: 'center', borderWidth: 2, borderColor: '#FFB6C1' },
  btnTertiaryTxt: { fontSize: 15, fontWeight: '600', color: '#C2185B' },
});
