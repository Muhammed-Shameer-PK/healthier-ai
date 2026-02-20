import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  Alert, TextInput, Modal, Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import { getUserProfile, saveUserProfile } from '../../src/services/storageService';
import { useCycleTracker } from '../../src/hooks/useCycleTracker';
import { classifyEmergency, simulateSMS } from '../../src/services/emergencyService';
import { getCurrentLocation, formatCoords } from '../../src/services/locationService';

export default function HomeScreen() {
  const router = useRouter();
  const { prediction, addLog } = useCycleTracker();
  const [profile, setProfile]           = useState({ name: '', age: '' });
  const [showProfile, setShowProfile]   = useState(false);
  const [lastRisk, setLastRisk]         = useState(null);
  const [gpsCoords, setGpsCoords]       = useState(null);
  const [locLoading, setLocLoading]     = useState(false);

  useEffect(() => {
    getUserProfile().then(p => { if (p) setProfile(p); });
  }, []);

  const saveProfile = async () => {
    if (!profile.name || !profile.age) { Alert.alert('Required', 'Please enter name and age.'); return; }
    await saveUserProfile(profile);
    Alert.alert('Saved', 'Profile updated!');
    setShowProfile(false);
  };

  const logPeriodToday = async () => {
    await addLog({ isPeriod: true });
    Alert.alert('Logged', 'Period logged for today!');
  };

  const fetchLocation = async () => {
    setLocLoading(true);
    try {
      const coords = await getCurrentLocation();
      setGpsCoords(coords);
    } catch (e) {
      Alert.alert('Location Error', e.message);
    } finally {
      setLocLoading(false);
    }
  };

  const handleEmergency = () => {
    const em = classifyEmergency('High', []);
    const loc = gpsCoords ? formatCoords(gpsCoords) : 'unknown';
    simulateSMS('ASHA_WORKER', `EMERGENCY: ${profile.name || 'User'} needs help. Location: ${loc}`);
    Alert.alert(
      '🚨 Emergency Alert Sent',
      `Your ASHA worker has been notified.

Location: ${loc}

Hotline: ${em.hotline}`,
      [
        { text: `Call ${em.hotline}`, onPress: () => Linking.openURL(`tel:${em.hotline}`) },
        { text: 'OK' },
      ]
    );
  };

  const emergency = lastRisk ? classifyEmergency(lastRisk.risk_level, lastRisk.symptoms || []) : null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.emoji}>🌸</Text>
      <Text style={styles.title}>AuraHealth</Text>
      {profile.name && <Text style={styles.greeting}>Welcome, {profile.name}!</Text>}

      {prediction && (
        <View style={styles.predCard}>
          <Text style={styles.predTitle}>Next Period</Text>
          <Text style={styles.predDate}>{prediction.nextPeriod}</Text>
          <Text style={styles.predSub}>in {prediction.daysUntil} days</Text>
        </View>
      )}

      <TouchableOpacity style={styles.primaryBtn} onPress={logPeriodToday}>
        <Text style={styles.primaryBtnText}>🩸  Log Period Today</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.push('/(tabs)/risk')}>
        <Text style={styles.secondaryBtnText}>🩺  Check Health Risk</Text>
      </TouchableOpacity>

      {/* GPS */}
      <TouchableOpacity style={styles.gpsBtn} onPress={fetchLocation} disabled={locLoading}>
        <Text style={styles.gpsBtnText}>
          {locLoading ? '📡 Fetching...' : gpsCoords ? `📍 ${formatCoords(gpsCoords)}` : '📡 Get My Location'}
        </Text>
      </TouchableOpacity>

      {/* Emergency */}
      {emergency && (
        <View style={[styles.emergencyCard, { borderColor: emergency.color }]}>
          <Text style={[styles.emergencyLevel, { color: emergency.color }]}>
            ⚠️  {emergency.level}
          </Text>
          <Text style={styles.emergencyMsg}>{emergency.message}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.emergencyBtn} onPress={handleEmergency}>
        <Text style={styles.emergencyBtnText}>🚨  Emergency Alert</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.ghostBtn} onPress={() => setShowProfile(true)}>
        <Text style={styles.ghostBtnText}>👤  Edit Profile</Text>
      </TouchableOpacity>

      {/* Profile Modal */}
      <Modal visible={showProfile} animationType="slide" transparent>
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Your Profile</Text>
            <TextInput style={styles.input} placeholder="Name" value={profile.name}
              onChangeText={v => setProfile(p => ({ ...p, name: v }))} />
            <TextInput style={styles.input} placeholder="Age" keyboardType="numeric"
              value={profile.age?.toString()}
              onChangeText={v => setProfile(p => ({ ...p, age: v }))} />
            <TouchableOpacity style={styles.primaryBtn} onPress={saveProfile}>
              <Text style={styles.primaryBtnText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowProfile(false)}>
              <Text style={[styles.ghostBtnText, { textAlign: 'center', marginTop: 12 }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:        { flexGrow: 1, alignItems: 'center', backgroundColor: '#FFF5F5', padding: 24 },
  emoji:            { fontSize: 56, marginTop: 20, marginBottom: 8 },
  title:            { fontSize: 28, fontWeight: 'bold', color: '#C2185B', marginBottom: 4 },
  greeting:         { fontSize: 16, color: '#C2185B', marginBottom: 20 },
  predCard:         { backgroundColor: '#fff0f5', borderRadius: 16, padding: 16, width: '100%', alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: '#FFB6C1' },
  predTitle:        { fontSize: 13, color: '#888', marginBottom: 4 },
  predDate:         { fontSize: 20, fontWeight: 'bold', color: '#C2185B' },
  predSub:          { fontSize: 13, color: '#999' },
  primaryBtn:       { backgroundColor: '#C2185B', borderRadius: 12, paddingVertical: 14, paddingHorizontal: 32, marginBottom: 12, width: '100%', alignItems: 'center' },
  primaryBtnText:   { color: '#fff', fontSize: 16, fontWeight: '700' },
  secondaryBtn:     { backgroundColor: '#FFE4E9', borderRadius: 12, paddingVertical: 14, width: '100%', alignItems: 'center', marginBottom: 12 },
  secondaryBtnText: { color: '#C2185B', fontSize: 16, fontWeight: '600' },
  gpsBtn:           { backgroundColor: '#f0f9ff', borderRadius: 12, paddingVertical: 12, width: '100%', alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: '#bee3f8' },
  gpsBtnText:       { color: '#2b6cb0', fontSize: 14 },
  emergencyCard:    { backgroundColor: '#fff', borderWidth: 2, borderRadius: 12, padding: 14, width: '100%', marginBottom: 12 },
  emergencyLevel:   { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  emergencyMsg:     { fontSize: 14, color: '#555' },
  emergencyBtn:     { backgroundColor: '#FF3B30', borderRadius: 12, paddingVertical: 14, width: '100%', alignItems: 'center', marginBottom: 16 },
  emergencyBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  ghostBtn:         { paddingVertical: 10, marginBottom: 16 },
  ghostBtnText:     { color: '#aaa', fontSize: 14 },
  overlay:          { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modal:            { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24 },
  modalTitle:       { fontSize: 20, fontWeight: 'bold', color: '#C2185B', marginBottom: 16 },
  input:            { backgroundColor: '#FFF5F5', borderRadius: 10, padding: 12, fontSize: 15, marginBottom: 12, borderWidth: 1, borderColor: '#FFE4E9' },
});
