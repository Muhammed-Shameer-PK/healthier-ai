import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, SafeAreaView, Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

const noop = () => Alert.alert('Coming Soon', 'This feature is not yet active.');

export default function ProfileSetupScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [cycleLength, setCycleLength] = useState('28');
  const [periodLength, setPeriodLength] = useState('5');
  const [lang, setLang] = useState('en');

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.container} keyboardShouldPersistTaps="handled">
        <Text style={s.title}>{lang === 'hi' ? 'अपनी प्रोफाइल बनाएं' : 'Set Up Your Profile'}</Text>
        <Text style={s.sub}>{lang === 'hi' ? 'आपकी जानकारी डिवाइस पर रहती है' : 'Your info stays on your device'}</Text>

        <View style={s.langRow}>
          <TouchableOpacity style={[s.langBtn, lang === 'en' && s.langActive]} onPress={() => setLang('en')}>
            <Text style={[s.langTxt, lang === 'en' && s.langActiveTxt]}>English</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.langBtn, lang === 'hi' && s.langActive]} onPress={() => setLang('hi')}>
            <Text style={[s.langTxt, lang === 'hi' && s.langActiveTxt]}>हिंदी</Text>
          </TouchableOpacity>
        </View>

        <View style={s.avatarBox}>
          <Text style={s.avatarEmoji}>👤</Text>
        </View>

        <Text style={s.label}>{lang === 'hi' ? 'नाम (वैकल्पिक)' : 'Name (optional)'}</Text>
        <TextInput
          style={s.input}
          value={name}
          onChangeText={setName}
          placeholder={lang === 'hi' ? 'आपका नाम' : 'Your name'}
          placeholderTextColor="#CCC"
        />

        <Text style={s.label}>{lang === 'hi' ? 'आयु' : 'Age'}</Text>
        <TextInput
          style={s.input}
          value={age}
          onChangeText={setAge}
          placeholder="18"
          placeholderTextColor="#CCC"
          keyboardType="number-pad"
          maxLength={3}
        />

        <Text style={s.label}>{lang === 'hi' ? 'औसत चक्र लंबाई (दिन)' : 'Average cycle length (days)'}</Text>
        <View style={s.stepperRow}>
          <TouchableOpacity style={s.stepBtn} onPress={() => setCycleLength(v => String(Math.max(21, Number(v) - 1)))}>
            <Text style={s.stepTxt}>-</Text>
          </TouchableOpacity>
          <Text style={s.stepVal}>{cycleLength}</Text>
          <TouchableOpacity style={s.stepBtn} onPress={() => setCycleLength(v => String(Math.min(40, Number(v) + 1)))}>
            <Text style={s.stepTxt}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={s.label}>{lang === 'hi' ? 'औसत पीरियड लंबाई (दिन)' : 'Average period length (days)'}</Text>
        <View style={s.stepperRow}>
          <TouchableOpacity style={s.stepBtn} onPress={() => setPeriodLength(v => String(Math.max(2, Number(v) - 1)))}>
            <Text style={s.stepTxt}>-</Text>
          </TouchableOpacity>
          <Text style={s.stepVal}>{periodLength}</Text>
          <TouchableOpacity style={s.stepBtn} onPress={() => setPeriodLength(v => String(Math.min(10, Number(v) + 1)))}>
            <Text style={s.stepTxt}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={s.notifBox}>
          <Text style={s.notifLabel}>{lang === 'hi' ? 'चक्र अनुस्मारक' : 'Cycle reminders'}</Text>
          <View style={s.notifToggle}><View style={s.notifThumb} /></View>
        </View>

        <TouchableOpacity style={s.btn} onPress={() => router.replace('/(tabs)')} activeOpacity={0.85}>
          <Text style={s.btnTxt}>{lang === 'hi' ? 'शुरू करें' : 'Get Started'}</Text>
        </TouchableOpacity>

        <Text style={s.skip} onPress={() => router.replace('/(tabs)')}>
          {lang === 'hi' ? 'अभी के लिए छोड़ें' : 'Skip for now'}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF5F5' },
  container: { padding: 24, paddingBottom: 40 },
  title: { fontSize: 26, fontWeight: '800', color: '#C2185B', marginBottom: 4 },
  sub: { fontSize: 14, color: '#AAA', marginBottom: 20 },
  langRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  langBtn: { flex: 1, paddingVertical: 10, borderRadius: 10, borderWidth: 1.5, borderColor: '#DDD', alignItems: 'center' },
  langActive: { backgroundColor: '#C2185B', borderColor: '#C2185B' },
  langTxt: { fontSize: 15, color: '#888' },
  langActiveTxt: { color: '#FFF', fontWeight: '700' },
  avatarBox: { alignItems: 'center', marginBottom: 24 },
  avatarEmoji: { fontSize: 72 },
  label: { fontSize: 14, fontWeight: '600', color: '#555', marginBottom: 6, marginTop: 16 },
  input: {
    backgroundColor: '#FFF', borderRadius: 12, borderWidth: 1.5, borderColor: '#E0E0E0',
    paddingVertical: 14, paddingHorizontal: 16, fontSize: 15, color: '#333',
  },
  stepperRow: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  stepBtn: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFB6C1',
    alignItems: 'center', justifyContent: 'center',
  },
  stepTxt: { fontSize: 22, fontWeight: '700', color: '#FFF' },
  stepVal: { fontSize: 26, fontWeight: '700', color: '#333', minWidth: 44, textAlign: 'center' },
  notifBox: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#FFF', borderRadius: 12, padding: 16, marginTop: 20,
    borderWidth: 1.5, borderColor: '#E0E0E0',
  },
  notifLabel: { fontSize: 15, color: '#555' },
  notifToggle: {
    width: 50, height: 28, borderRadius: 14, backgroundColor: '#4CAF50',
    justifyContent: 'center', paddingHorizontal: 3,
  },
  notifThumb: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#FFF', alignSelf: 'flex-end' },
  btn: {
    backgroundColor: '#C2185B', borderRadius: 14, paddingVertical: 18,
    alignItems: 'center', marginTop: 32,
    shadowColor: '#C2185B', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  btnTxt: { fontSize: 18, fontWeight: '700', color: '#FFF' },
  skip: { fontSize: 14, color: '#BBB', textAlign: 'center', marginTop: 16 },
});
