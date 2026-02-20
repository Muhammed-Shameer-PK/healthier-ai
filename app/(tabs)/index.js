import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  TextInput, Modal, Alert,
} from 'react-native';

const noop = () => Alert.alert('Coming Soon', 'This feature will be added in the next sprint.');

export default function HomeScreen() {
  const [showProfile, setShowProfile] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge]   = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>🌸 AuraHealth</Text>
          <Text style={styles.subtitle}>Menstrual Wellness Tracker</Text>
        </View>
        <TouchableOpacity style={styles.langBtn} onPress={noop}>
          <Text style={styles.langBtnText}>हिंदी</Text>
        </TouchableOpacity>
      </View>

      {/* Greeting */}
      <View style={styles.greetingCard}>
        <Text style={styles.greetingEmoji}>👋</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.greetingTitle}>Good morning!</Text>
          <Text style={styles.greetingSubtitle}>Track your health, stay empowered.</Text>
        </View>
      </View>

      {/* Cycle Prediction Card */}
      <View style={styles.predCard}>
        <Text style={styles.predLabel}>NEXT PERIOD PREDICTION</Text>
        <Text style={styles.predDate}>Mar 15, 2026</Text>
        <Text style={styles.predSub}>in 23 days</Text>
        <View style={styles.cycleDots}>
          {[...Array(7)].map((_, i) => (
            <View key={i} style={[styles.dot, i < 3 && styles.dotFilled]} />
          ))}
        </View>
        <Text style={styles.cycleLabel}>Day 8 of 28</Text>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: '#fff0f5' }]}>
          <Text style={styles.statEmoji}>🩸</Text>
          <Text style={styles.statValue}>28</Text>
          <Text style={styles.statLabel}>Avg. Cycle</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#f0fff4' }]}>
          <Text style={styles.statEmoji}>📅</Text>
          <Text style={styles.statValue}>5</Text>
          <Text style={styles.statLabel}>Period Days</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#fffbf0' }]}>
          <Text style={styles.statEmoji}>💊</Text>
          <Text style={styles.statValue}>Low</Text>
          <Text style={styles.statLabel}>Risk Level</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.primaryBtn} onPress={noop}>
        <Text style={styles.primaryBtnText}>🩸  Log Period Today</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryBtn} onPress={noop}>
        <Text style={styles.secondaryBtnText}>🩺  Check Health Risk</Text>
      </TouchableOpacity>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.halfBtn, { backgroundColor: '#f0f9ff', borderColor: '#bee3f8' }]} onPress={noop}>
          <Text style={{ color: '#2b6cb0', fontWeight: '600', fontSize: 13 }}>📡  Get Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.halfBtn, { backgroundColor: '#fff0f0', borderColor: '#ffcccc' }]} onPress={noop}>
          <Text style={{ color: '#e53e3e', fontWeight: '600', fontSize: 13 }}>🚨  Emergency</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.ghostBtn} onPress={() => setShowProfile(true)}>
        <Text style={styles.ghostBtnText}>👤  Edit Profile</Text>
      </TouchableOpacity>

      {/* Profile Modal */}
      <Modal visible={showProfile} animationType="slide" transparent>
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Your Profile</Text>
            <TextInput style={styles.input} placeholder="Your name" placeholderTextColor="#bbb" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Age" placeholderTextColor="#bbb" keyboardType="numeric" value={age} onChangeText={setAge} />
            <TouchableOpacity style={styles.primaryBtn} onPress={() => { setShowProfile(false); noop(); }}>
              <Text style={styles.primaryBtnText}>Save Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowProfile(false)}>
              <Text style={[styles.ghostBtnText, { textAlign: 'center', marginTop: 10 }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:       { flexGrow: 1, backgroundColor: '#FFF5F5', padding: 20, paddingTop: 52 },
  header:          { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  title:           { fontSize: 24, fontWeight: 'bold', color: '#C2185B' },
  subtitle:        { fontSize: 12, color: '#aaa', marginTop: 2 },
  langBtn:         { backgroundColor: '#FFE4E9', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 7 },
  langBtnText:     { color: '#C2185B', fontWeight: '700', fontSize: 13 },
  greetingCard:    { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, padding: 14, marginBottom: 12, gap: 10, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  greetingEmoji:   { fontSize: 30 },
  greetingTitle:   { fontSize: 15, fontWeight: '700', color: '#333' },
  greetingSubtitle:{ fontSize: 12, color: '#888', marginTop: 2 },
  predCard:        { backgroundColor: '#fff0f5', borderRadius: 16, padding: 16, alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: '#FFB6C1' },
  predLabel:       { fontSize: 10, color: '#aaa', marginBottom: 4, letterSpacing: 0.5 },
  predDate:        { fontSize: 22, fontWeight: 'bold', color: '#C2185B' },
  predSub:         { fontSize: 13, color: '#999', marginBottom: 10 },
  cycleDots:       { flexDirection: 'row', gap: 6, marginBottom: 4 },
  dot:             { width: 10, height: 10, borderRadius: 5, backgroundColor: '#FFE4E9' },
  dotFilled:       { backgroundColor: '#FFB6C1' },
  cycleLabel:      { fontSize: 11, color: '#ccc' },
  statsRow:        { flexDirection: 'row', gap: 8, marginBottom: 12 },
  statCard:        { flex: 1, borderRadius: 12, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: '#f0e0e8' },
  statEmoji:       { fontSize: 18, marginBottom: 4 },
  statValue:       { fontSize: 15, fontWeight: 'bold', color: '#333' },
  statLabel:       { fontSize: 10, color: '#888', marginTop: 2 },
  primaryBtn:      { backgroundColor: '#C2185B', borderRadius: 12, paddingVertical: 14, width: '100%', alignItems: 'center', marginBottom: 10 },
  primaryBtnText:  { color: '#fff', fontSize: 16, fontWeight: '700' },
  secondaryBtn:    { backgroundColor: '#FFE4E9', borderRadius: 12, paddingVertical: 14, width: '100%', alignItems: 'center', marginBottom: 10 },
  secondaryBtnText:{ color: '#C2185B', fontSize: 16, fontWeight: '600' },
  row:             { flexDirection: 'row', gap: 10, marginBottom: 10, width: '100%' },
  halfBtn:         { flex: 1, borderRadius: 12, paddingVertical: 12, alignItems: 'center', borderWidth: 1 },
  ghostBtn:        { paddingVertical: 12, alignItems: 'center', marginBottom: 10 },
  ghostBtnText:    { color: '#aaa', fontSize: 14 },
  overlay:         { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modal:           { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24 },
  modalTitle:      { fontSize: 20, fontWeight: 'bold', color: '#C2185B', marginBottom: 16 },
  input:           { backgroundColor: '#FFF5F5', borderRadius: 10, padding: 12, fontSize: 15, marginBottom: 12, borderWidth: 1, borderColor: '#FFE4E9', color: '#333' },
});
