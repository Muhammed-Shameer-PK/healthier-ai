import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  TextInput, Alert, Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { getUserProfile, saveUserProfile, saveDailyLog } from '../../src/services/storageService';
import { useCycleTracker } from '../../src/hooks/useCycleTracker';

export default function HomeScreen() {
  const router = useRouter();
  const { prediction, addLog } = useCycleTracker();
  const [profile, setProfile]     = useState({ name: '', age: '' });
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    getUserProfile().then(p => { if (p) setProfile(p); });
  }, []);

  const saveProfile = async () => {
    if (!profile.name || !profile.age) {
      Alert.alert('Required', 'Please enter your name and age.');
      return;
    }
    await saveUserProfile(profile);
    Alert.alert('Saved', 'Profile updated!');
    setShowProfile(false);
  };

  const logPeriodToday = async () => {
    await addLog({ isPeriod: true });
    Alert.alert('Logged', 'Period logged for today!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.emoji}>🌸</Text>
      <Text style={styles.title}>AuraHealth</Text>
      {profile.name ? (
        <Text style={styles.greeting}>Welcome, {profile.name}!</Text>
      ) : (
        <Text style={styles.subtitle}>Offline · Privacy-first</Text>
      )}

      {prediction && (
        <View style={styles.predCard}>
          <Text style={styles.predTitle}>Next Period Prediction</Text>
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
  container:       { flexGrow: 1, alignItems: 'center', backgroundColor: '#FFF5F5', padding: 24 },
  emoji:           { fontSize: 56, marginTop: 20, marginBottom: 8 },
  title:           { fontSize: 28, fontWeight: 'bold', color: '#C2185B', marginBottom: 4 },
  greeting:        { fontSize: 16, color: '#C2185B', marginBottom: 20 },
  subtitle:        { fontSize: 16, color: '#666', marginBottom: 20 },
  predCard:        { backgroundColor: '#fff0f5', borderRadius: 16, padding: 16, width: '100%', alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: '#FFB6C1' },
  predTitle:       { fontSize: 13, color: '#888', marginBottom: 4 },
  predDate:        { fontSize: 20, fontWeight: 'bold', color: '#C2185B' },
  predSub:         { fontSize: 13, color: '#999' },
  primaryBtn:      { backgroundColor: '#C2185B', borderRadius: 12, paddingVertical: 14, paddingHorizontal: 32, marginBottom: 12, width: '100%', alignItems: 'center' },
  primaryBtnText:  { color: '#fff', fontSize: 16, fontWeight: '700' },
  secondaryBtn:    { backgroundColor: '#FFE4E9', borderRadius: 12, paddingVertical: 14, width: '100%', alignItems: 'center', marginBottom: 12 },
  secondaryBtnText:{ color: '#C2185B', fontSize: 16, fontWeight: '600' },
  ghostBtn:        { paddingVertical: 10, marginBottom: 24 },
  ghostBtnText:    { color: '#aaa', fontSize: 14 },
  overlay:         { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modal:           { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24 },
  modalTitle:      { fontSize: 20, fontWeight: 'bold', color: '#C2185B', marginBottom: 16 },
  input:           { backgroundColor: '#FFF5F5', borderRadius: 10, padding: 12, fontSize: 15, marginBottom: 12, borderWidth: 1, borderColor: '#FFE4E9' },
});
