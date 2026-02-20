import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

const noop = () => Alert.alert('Coming Soon', 'This feature is not yet active.');

export default function RoleSelectScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.container}>
        <View style={s.header}>
          <Text style={s.logo}>🌸</Text>
          <Text style={s.appName}>AuraHealth</Text>
          <Text style={s.tagline}>Privacy-first menstrual wellness</Text>
        </View>

        <Text style={s.prompt}>Who are you?</Text>
        <Text style={s.promptHi}>आप कौन हैं?</Text>

        <TouchableOpacity
          style={[s.roleCard, s.roleCardWoman]}
          onPress={() => router.push('/profile-setup')}
          activeOpacity={0.85}
        >
          <Text style={s.roleEmoji}>👩</Text>
          <View style={s.roleTextBox}>
            <Text style={s.roleTitle}>I'm a Woman</Text>
            <Text style={s.roleTitleHi}>मैं एक महिला हूँ</Text>
            <Text style={s.roleDesc}>Track your cycle, assess health risks, and chat with an AI health guide.</Text>
          </View>
          <Text style={s.roleArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[s.roleCard, s.roleCardAsha]}
          onPress={() => router.push('/asha')}
          activeOpacity={0.85}
        >
          <Text style={s.roleEmoji}>🏥</Text>
          <View style={s.roleTextBox}>
            <Text style={s.roleTitle}>I'm an ASHA Worker</Text>
            <Text style={s.roleTitleHi}>मैं आशा कार्यकर्ता हूँ</Text>
            <Text style={s.roleDesc}>Conduct village-level health assessments and manage patient records.</Text>
          </View>
          <Text style={s.roleArrow}>›</Text>
        </TouchableOpacity>

        <View style={s.privacyBox}>
          <Text style={s.privacyIcon}>🔒</Text>
          <Text style={s.privacyText}>Your data stays on your device. No account needed.</Text>
        </View>

        <View style={s.langRow}>
          <TouchableOpacity style={[s.langBtn, s.langBtnActive]} onPress={noop}>
            <Text style={[s.langBtnText, s.langBtnTextActive]}>EN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.langBtn} onPress={noop}>
            <Text style={s.langBtnText}>हि</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF5F5' },
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 32 },
  logo: { fontSize: 56 },
  appName: { fontSize: 32, fontWeight: '800', color: '#C2185B', marginTop: 4 },
  tagline: { fontSize: 14, color: '#AAA', marginTop: 4 },
  prompt: { fontSize: 22, fontWeight: '700', color: '#333', textAlign: 'center' },
  promptHi: { fontSize: 16, color: '#888', textAlign: 'center', marginBottom: 24 },
  roleCard: {
    flexDirection: 'row', alignItems: 'center', borderRadius: 18,
    padding: 20, marginBottom: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  roleCardWoman: { backgroundColor: '#FFFFFF', borderWidth: 2, borderColor: '#FFB6C1' },
  roleCardAsha: { backgroundColor: '#FFFFFF', borderWidth: 2, borderColor: '#80DEEA' },
  roleEmoji: { fontSize: 40, marginRight: 16 },
  roleTextBox: { flex: 1 },
  roleTitle: { fontSize: 18, fontWeight: '700', color: '#333' },
  roleTitleHi: { fontSize: 14, color: '#888', marginBottom: 4 },
  roleDesc: { fontSize: 13, color: '#666', lineHeight: 18 },
  roleArrow: { fontSize: 28, color: '#CCC', marginLeft: 8 },
  privacyBox: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    marginTop: 16, backgroundColor: '#FFF0F5', borderRadius: 10, padding: 10,
  },
  privacyIcon: { fontSize: 16, marginRight: 6 },
  privacyText: { fontSize: 12, color: '#888' },
  langRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 24, gap: 12 },
  langBtn: {
    paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20,
    borderWidth: 1, borderColor: '#DDD',
  },
  langBtnActive: { backgroundColor: '#C2185B', borderColor: '#C2185B' },
  langBtnText: { fontSize: 14, color: '#888' },
  langBtnTextActive: { color: '#FFF', fontWeight: '700' },
});
