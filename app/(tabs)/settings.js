import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Switch,
} from 'react-native';
import { useRouter } from 'expo-router';

const noop = () => Alert.alert('Coming Soon', 'This feature will be added in the next sprint.');

const MOCK_LOGS = [
  { date: 'Feb 19, 2026', type: 'period',   label: '🩸 Period logged' },
  { date: 'Feb 17, 2026', type: 'symptom',  label: '💊 Fatigue, Headache' },
  { date: 'Feb 14, 2026', type: 'symptom',  label: '💊 Mood Swings' },
  { date: 'Feb 10, 2026', type: 'period',   label: '🩸 Period logged' },
  { date: 'Feb 08, 2026', type: 'symptom',  label: '💊 Bloating, Nausea' },
];

export default function SettingsScreen() {
  const router = useRouter();
  const [hindi, setHindi]     = useState(false);
  const [notifs, setNotifs]   = useState(true);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>⚙️  Settings</Text>

      {/* Profile Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile</Text>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={{ fontSize: 24 }}>👤</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.profileName}>User Profile</Text>
            <Text style={styles.profileSub}>Age: —  •  Cycle: 28 days</Text>
          </View>
          <TouchableOpacity onPress={noop}>
            <Text style={styles.editLink}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>🌐  Hindi Language</Text>
          <Switch
            value={hindi}
            onValueChange={v => { setHindi(v); noop(); }}
            trackColor={{ false: '#ddd', true: '#FFB6C1' }}
            thumbColor={hindi ? '#C2185B' : '#f4f3f4'}
          />
        </View>
        <View style={[styles.row, { borderBottomWidth: 0 }]}>
          <Text style={styles.rowLabel}>🔔  Cycle Reminders</Text>
          <Switch
            value={notifs}
            onValueChange={v => { setNotifs(v); noop(); }}
            trackColor={{ false: '#ddd', true: '#FFB6C1' }}
            thumbColor={notifs ? '#C2185B' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Health Log History */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Health Log History</Text>
        {MOCK_LOGS.map((log, i) => (
          <View key={i} style={[styles.logRow, i === MOCK_LOGS.length - 1 && { borderBottomWidth: 0 }]}>
            <Text style={styles.logDate}>{log.date}</Text>
            <Text style={styles.logLabel}>{log.label}</Text>
          </View>
        ))}
      </View>

      {/* Sync Status */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sync</Text>
        <View style={styles.syncCard}>
          <Text style={styles.syncStatus}>⚡  Offline Mode</Text>
          <Text style={styles.syncSub}>Data saved locally. Sync will be available after backend integration.</Text>
          <TouchableOpacity style={styles.syncBtn} onPress={noop}>
            <Text style={styles.syncBtnTxt}>Sync Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Role Switching */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Switch Mode</Text>
        <TouchableOpacity style={styles.roleBtn} onPress={() => router.push('/asha')} activeOpacity={0.8}>
          <Text style={styles.roleBtnTxt}>🏥  Switch to ASHA Worker Mode</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.roleBtn, styles.roleBtnSecondary]} onPress={() => router.replace('/role-select')} activeOpacity={0.8}>
          <Text style={styles.roleBtnSecondaryTxt}>🔁  Change Role / Language</Text>
        </TouchableOpacity>
      </View>

      {/* Danger Zone */}
      <TouchableOpacity style={styles.dangerBtn} onPress={noop}>
        <Text style={styles.dangerBtnTxt}>🗑️  Clear All Data</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:    { flexGrow: 1, backgroundColor: '#FFF5F5', padding: 20, paddingTop: 52 },
  title:        { fontSize: 22, fontWeight: 'bold', color: '#C2185B', marginBottom: 20 },
  section:      { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 14, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 1 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#999', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 },
  profileCard:  { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar:       { width: 48, height: 48, borderRadius: 24, backgroundColor: '#FFE4E9', justifyContent: 'center', alignItems: 'center' },
  profileName:  { fontSize: 15, fontWeight: '700', color: '#333' },
  profileSub:   { fontSize: 12, color: '#aaa', marginTop: 2 },
  editLink:     { fontSize: 14, color: '#C2185B', fontWeight: '600' },
  row:          { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  rowLabel:     { fontSize: 15, color: '#333' },
  logRow:       { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  logDate:      { fontSize: 12, color: '#aaa', marginBottom: 2 },
  logLabel:     { fontSize: 14, color: '#444' },
  syncCard:     { backgroundColor: '#f9f9f9', borderRadius: 10, padding: 12 },
  syncStatus:   { fontSize: 15, fontWeight: '600', color: '#555', marginBottom: 4 },
  syncSub:      { fontSize: 12, color: '#aaa', lineHeight: 18, marginBottom: 10 },
  syncBtn:      { backgroundColor: '#FFE4E9', borderRadius: 8, paddingVertical: 8, alignItems: 'center' },
  syncBtnTxt:   { color: '#C2185B', fontWeight: '600', fontSize: 13 },
  roleBtn:          { backgroundColor: '#E3F2FD', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginBottom: 8 },
  roleBtnTxt:       { color: '#01579B', fontSize: 15, fontWeight: '700' },
  roleBtnSecondary: { backgroundColor: '#FFE4E9' },
  roleBtnSecondaryTxt: { color: '#C2185B', fontSize: 15, fontWeight: '700' },
  dangerBtn:    { backgroundColor: '#fff0f0', borderRadius: 12, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: '#ffcccc' },
  dangerBtnTxt: { color: '#e53e3e', fontSize: 16, fontWeight: '600' },
});
