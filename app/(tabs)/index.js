import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  Alert, TextInput, Modal, Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '../../src/context/LanguageContext';
import LanguageSwitch from '../../src/components/LanguageSwitch';
import { getUserProfile, saveUserProfile } from '../../src/services/storageService';
import { useCycleTracker } from '../../src/hooks/useCycleTracker';
import { classifyEmergency, simulateSMS } from '../../src/services/emergencyService';
import { getCurrentLocation, formatCoords } from '../../src/services/locationService';

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const { prediction, addLog } = useCycleTracker();
  const [profile, setProfile]         = useState({ name: '', age: '' });
  const [showProfile, setShowProfile] = useState(false);
  const [lastRisk, setLastRisk]       = useState(null);
  const [gpsCoords, setGpsCoords]     = useState(null);
  const [locLoading, setLocLoading]   = useState(false);

  useEffect(() => { getUserProfile().then(p => { if (p) setProfile(p); }); }, []);

  const saveProfile = async () => {
    if (!profile.name || !profile.age) { Alert.alert(t.save, 'Please fill all fields.'); return; }
    await saveUserProfile(profile);
    Alert.alert('✅', `${t.save}d!`);
    setShowProfile(false);
  };

  const logPeriodToday = async () => {
    await addLog({ isPeriod: true });
    Alert.alert('✅', 'Period logged!');
  };

  const fetchLocation = async () => {
    setLocLoading(true);
    try { const c = await getCurrentLocation(); setGpsCoords(c); }
    catch (e) { Alert.alert('Error', e.message); }
    finally { setLocLoading(false); }
  };

  const handleEmergency = async () => {
    const em = classifyEmergency('High', []);
    const loc = gpsCoords ? formatCoords(gpsCoords) : 'unknown';
    simulateSMS('ASHA', `EMERGENCY: ${profile.name || 'User'} at ${loc}`);
    Alert.alert('🚨 Alert Sent', `Hotline: ${em.hotline}`, [
      { text: `Call ${em.hotline}`, onPress: () => Linking.openURL(`tel:${em.hotline}`) },
      { text: 'OK' },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.title}>{t.appName}</Text>
        <LanguageSwitch />
      </View>

      {profile.name && (
        <Text style={styles.greeting}>{t.welcome}, {profile.name}! 👋</Text>
      )}

      {prediction && (
        <View style={styles.predCard}>
          <Text style={styles.predLabel}>{t.nextPeriod}</Text>
          <Text style={styles.predDate}>{prediction.nextPeriod}</Text>
          <Text style={styles.predSub}>{prediction.daysUntil} {t.daysUntil}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.primaryBtn} onPress={logPeriodToday}>
        <Text style={styles.primaryBtnText}>{t.logPeriod}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.push('/(tabs)/risk')}>
        <Text style={styles.secondaryBtnText}>{t.checkRisk}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.gpsBtn} onPress={fetchLocation} disabled={locLoading}>
        <Text style={styles.gpsBtnText}>
          {locLoading ? '📡 ...' : gpsCoords ? `📍 ${formatCoords(gpsCoords)}` : t.getLocation}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.emergencyBtn} onPress={handleEmergency}>
        <Text style={styles.emergencyBtnText}>{t.emergency}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.ghostBtn} onPress={() => setShowProfile(true)}>
        <Text style={styles.ghostBtnText}>{t.editProfile}</Text>
      </TouchableOpacity>

      <Modal visible={showProfile} animationType="slide" transparent>
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>{t.editProfile}</Text>
            <TextInput style={styles.input} placeholder="Name" value={profile.name} onChangeText={v => setProfile(p => ({ ...p, name: v }))} />
            <TextInput style={styles.input} placeholder="Age" keyboardType="numeric" value={profile.age?.toString()} onChangeText={v => setProfile(p => ({ ...p, age: v }))} />
            <TouchableOpacity style={styles.primaryBtn} onPress={saveProfile}><Text style={styles.primaryBtnText}>{t.save}</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setShowProfile(false)}><Text style={[styles.ghostBtnText, { textAlign: 'center', marginTop: 10 }]}>{t.cancel}</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:        { flexGrow: 1, backgroundColor: '#FFF5F5', padding: 24 },
  topRow:           { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 36, marginBottom: 8 },
  title:            { fontSize: 24, fontWeight: 'bold', color: '#C2185B' },
  greeting:         { fontSize: 16, color: '#C2185B', marginBottom: 16, textAlign: 'center' },
  predCard:         { backgroundColor: '#fff0f5', borderRadius: 16, padding: 16, alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: '#FFB6C1' },
  predLabel:        { fontSize: 13, color: '#888', marginBottom: 4 },
  predDate:         { fontSize: 20, fontWeight: 'bold', color: '#C2185B' },
  predSub:          { fontSize: 13, color: '#999' },
  primaryBtn:       { backgroundColor: '#C2185B', borderRadius: 12, paddingVertical: 14, width: '100%', alignItems: 'center', marginBottom: 10 },
  primaryBtnText:   { color: '#fff', fontSize: 16, fontWeight: '700' },
  secondaryBtn:     { backgroundColor: '#FFE4E9', borderRadius: 12, paddingVertical: 14, width: '100%', alignItems: 'center', marginBottom: 10 },
  secondaryBtnText: { color: '#C2185B', fontSize: 16, fontWeight: '600' },
  gpsBtn:           { backgroundColor: '#f0f9ff', borderRadius: 12, paddingVertical: 12, width: '100%', alignItems: 'center', marginBottom: 10, borderWidth: 1, borderColor: '#bee3f8' },
  gpsBtnText:       { color: '#2b6cb0', fontSize: 14 },
  emergencyBtn:     { backgroundColor: '#FF3B30', borderRadius: 12, paddingVertical: 14, width: '100%', alignItems: 'center', marginBottom: 10 },
  emergencyBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  ghostBtn:         { paddingVertical: 10, marginBottom: 16, alignItems: 'center' },
  ghostBtnText:     { color: '#aaa', fontSize: 14 },
  overlay:          { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modal:            { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24 },
  modalTitle:       { fontSize: 20, fontWeight: 'bold', color: '#C2185B', marginBottom: 16 },
  input:            { backgroundColor: '#FFF5F5', borderRadius: 10, padding: 12, fontSize: 15, marginBottom: 12, borderWidth: 1, borderColor: '#FFE4E9' },
});
