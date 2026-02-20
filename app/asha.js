import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  SafeAreaView, Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

const noop = () => Alert.alert('Coming Soon', 'This feature is not yet active.');

const MOCK_PATIENTS = [
  { id: '001', village: 'Rampur',  level: 'HIGH',     color: '#F44336', bg: '#FFEBEE', time: '10:32 AM', score: 22 },
  { id: '002', village: 'Rampur',  level: 'MODERATE', color: '#FF9800', bg: '#FFF8E1', time: '10:55 AM', score: 14 },
  { id: '003', village: 'Sonepur', level: 'LOW',      color: '#4CAF50', bg: '#E8F5E9', time: '11:20 AM', score: 4  },
  { id: '004', village: 'Sonepur', level: 'HIGH',     color: '#F44336', bg: '#FFEBEE', time: '11:48 AM', score: 19 },
  { id: '005', village: 'Karela',  level: 'MODERATE', color: '#FF9800', bg: '#FFF8E1', time: '12:05 PM', score: 11 },
];

const ALERTS = [
  { icon: '🚨', msg: 'Patient #001: High risk — emergency SMS sent', time: '10:33 AM', color: '#F44336' },
  { icon: '⚠️', msg: 'Patient #004: High risk — follow-up needed',  time: '11:49 AM', color: '#FF9800' },
  { icon: '✅', msg: 'Data sync complete (3 records)',              time: '12:01 PM', color: '#4CAF50' },
];

export default function ASHAScreen() {
  const router = useRouter();
  const [lang, setLang] = useState('en');
  const total    = MOCK_PATIENTS.length;
  const high     = MOCK_PATIENTS.filter(p => p.level === 'HIGH').length;
  const moderate = MOCK_PATIENTS.filter(p => p.level === 'MODERATE').length;
  const low      = MOCK_PATIENTS.filter(p => p.level === 'LOW').length;

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.container}>
        <View style={s.headerRow}>
          <View>
            <Text style={s.title}>{lang === 'hi' ? 'आशा डैशबोर्ड' : 'ASHA Dashboard'}</Text>
            <Text style={s.sub}>📍 {lang === 'hi' ? 'रामपुर, उत्तर प्रदेश' : 'Rampur, Uttar Pradesh'}</Text>
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

        <Text style={s.sectionTitle}>{lang === 'hi' ? "आज का सारांश" : "Today's Summary"}</Text>
        <View style={s.statsRow}>
          <View style={[s.statCard, { borderTopColor: '#2196F3' }]}>
            <Text style={[s.statNum, { color: '#2196F3' }]}>{total}</Text>
            <Text style={s.statLabel}>{lang === 'hi' ? 'कुल' : 'Assessed'}</Text>
          </View>
          <View style={[s.statCard, { borderTopColor: '#F44336' }]}>
            <Text style={[s.statNum, { color: '#F44336' }]}>{high}</Text>
            <Text style={s.statLabel}>{lang === 'hi' ? 'उच्च जोखिम' : 'High Risk'}</Text>
          </View>
          <View style={[s.statCard, { borderTopColor: '#FF9800' }]}>
            <Text style={[s.statNum, { color: '#FF9800' }]}>{moderate}</Text>
            <Text style={s.statLabel}>{lang === 'hi' ? 'मध्यम' : 'Moderate'}</Text>
          </View>
          <View style={[s.statCard, { borderTopColor: '#4CAF50' }]}>
            <Text style={[s.statNum, { color: '#4CAF50' }]}>{low}</Text>
            <Text style={s.statLabel}>{lang === 'hi' ? 'कम' : 'Low'}</Text>
          </View>
        </View>

        <TouchableOpacity style={s.newBtn} onPress={() => router.push('/symptoms')} activeOpacity={0.85}>
          <Text style={s.newBtnTxt}>
            {lang === 'hi' ? '+ नया रोगी मूल्यांकन' : '+ New Patient Assessment'}
          </Text>
        </TouchableOpacity>

        <Text style={s.sectionTitle}>{lang === 'hi' ? 'अलर्ट' : 'Alerts'}</Text>
        {ALERTS.map((a, i) => (
          <View key={i} style={[s.alertRow, { borderLeftColor: a.color }]}>
            <Text style={s.alertIcon}>{a.icon}</Text>
            <View style={s.alertBody}>
              <Text style={s.alertMsg}>{a.msg}</Text>
              <Text style={s.alertTime}>{a.time}</Text>
            </View>
          </View>
        ))}

        <Text style={s.sectionTitle}>{lang === 'hi' ? 'हालिया रिकॉर्ड' : 'Recent Records'}</Text>
        {MOCK_PATIENTS.map(p => (
          <TouchableOpacity key={p.id} style={s.patientCard} onPress={noop} activeOpacity={0.8}>
            <View style={s.patientLeft}>
              <View style={[s.patientAvatar, { backgroundColor: p.bg }]}>
                <Text style={[s.patientAvatarTxt, { color: p.color }]}>{p.id}</Text>
              </View>
              <View>
                <Text style={s.patientVillage}>📍 {p.village}</Text>
                <Text style={s.patientTime}>{p.time}</Text>
              </View>
            </View>
            <View style={[s.riskBadge, { backgroundColor: p.bg }]}>
              <Text style={[s.riskBadgeTxt, { color: p.color }]}>{p.level}</Text>
              <Text style={[s.riskScore, { color: p.color }]}>{p.score}/30</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={s.syncCard}>
          <View>
            <Text style={s.syncTitle}>{lang === 'hi' ? 'सिंक स्थिति' : 'Sync Status'}</Text>
            <Text style={s.syncSub}>🟢 {lang === 'hi' ? 'ऑनलाइन • अंतिम: 12:01 PM' : 'Online • Last: 12:01 PM'}</Text>
          </View>
          <TouchableOpacity style={s.syncBtn} onPress={noop}>
            <Text style={s.syncBtnTxt}>{lang === 'hi' ? 'सिंक करें' : 'Sync Now'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={s.endBtn} onPress={noop} activeOpacity={0.85}>
          <Text style={s.endBtnTxt}>{lang === 'hi' ? 'दौरा समाप्त करें और सहेजें' : 'End Visit & Save Summary'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={s.switchRole} onPress={() => router.replace('/role-select')} activeOpacity={0.7}>
          <Text style={s.switchRoleTxt}>{lang === 'hi' ? 'भूमिका बदलें' : 'Switch Role'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F0F8FF' },
  container: { padding: 20, paddingBottom: 40 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  title: { fontSize: 22, fontWeight: '800', color: '#01579B' },
  sub: { fontSize: 13, color: '#888', marginTop: 2 },
  langRow: { flexDirection: 'row', gap: 6 },
  lBtn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1.5, borderColor: '#DDD' },
  lBtnA: { backgroundColor: '#01579B', borderColor: '#01579B' },
  lTxt: { fontSize: 13, color: '#888' },
  lTxtA: { color: '#FFF', fontWeight: '700' },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#555', marginBottom: 12, marginTop: 20, borderBottomWidth: 1, borderBottomColor: '#E0E0E0', paddingBottom: 6 },
  statsRow: { flexDirection: 'row', gap: 10 },
  statCard: {
    flex: 1, backgroundColor: '#FFF', borderRadius: 12, padding: 12,
    alignItems: 'center', borderTopWidth: 4,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  statNum: { fontSize: 28, fontWeight: '800' },
  statLabel: { fontSize: 11, color: '#888', textAlign: 'center', marginTop: 2 },
  newBtn: {
    backgroundColor: '#01579B', borderRadius: 14, paddingVertical: 16,
    alignItems: 'center', marginTop: 20,
    shadowColor: '#01579B', shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2, shadowRadius: 6, elevation: 3,
  },
  newBtnTxt: { fontSize: 16, fontWeight: '700', color: '#FFF' },
  alertRow: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 12, padding: 14, marginBottom: 8, borderLeftWidth: 4 },
  alertIcon: { fontSize: 20, marginRight: 10 },
  alertBody: { flex: 1 },
  alertMsg: { fontSize: 13, color: '#444', lineHeight: 18 },
  alertTime: { fontSize: 11, color: '#AAA', marginTop: 2 },
  patientCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#FFF', borderRadius: 14, padding: 14, marginBottom: 8,
    borderWidth: 1.5, borderColor: '#E0E0E0',
  },
  patientLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  patientAvatar: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  patientAvatarTxt: { fontSize: 13, fontWeight: '700' },
  patientVillage: { fontSize: 14, color: '#444', fontWeight: '600' },
  patientTime: { fontSize: 12, color: '#AAA', marginTop: 2 },
  riskBadge: { borderRadius: 10, paddingVertical: 6, paddingHorizontal: 12, alignItems: 'center' },
  riskBadgeTxt: { fontSize: 12, fontWeight: '700', letterSpacing: 0.8 },
  riskScore: { fontSize: 11, marginTop: 2 },
  syncCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#FFF', borderRadius: 14, padding: 16, marginTop: 20,
    borderWidth: 1.5, borderColor: '#E0E0E0',
  },
  syncTitle: { fontSize: 15, fontWeight: '700', color: '#333' },
  syncSub: { fontSize: 12, color: '#888', marginTop: 2 },
  syncBtn: { backgroundColor: '#01579B', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 18 },
  syncBtnTxt: { fontSize: 14, fontWeight: '700', color: '#FFF' },
  endBtn: { backgroundColor: '#4CAF50', borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginTop: 20 },
  endBtnTxt: { fontSize: 16, fontWeight: '700', color: '#FFF' },
  switchRole: { alignItems: 'center', marginTop: 16 },
  switchRoleTxt: { fontSize: 14, color: '#AAA' },
});
