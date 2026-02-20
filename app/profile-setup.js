import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { saveUserProfile } from '../src/services/storageService';

export default function ProfileSetup() {
  const router   = useRouter();
  const insets   = useSafeAreaInsets();
  const [name, setName]   = useState('');
  const [age,  setAge]    = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim() || !age.trim()) {
      Alert.alert('Missing info', 'Please enter your name and age.');
      return;
    }
    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum < 10 || ageNum > 80) {
      Alert.alert('Invalid age', 'Please enter a valid age between 10 and 80.');
      return;
    }
    setSaving(true);
    try {
      await saveUserProfile({ name: name.trim(), age: ageNum });
      router.replace('/(tabs)');
    } catch (e) {
      Alert.alert('Error', 'Could not save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={[styles.container, { paddingTop: insets.top + 40 }]}
        keyboardShouldPersistTaps="handled"
      >
        {/* Branding */}
        <Text style={styles.brand}>🌸 AuraHealth</Text>
        <Text style={styles.tagline}>
          Welcome! Let's set up your profile to get started.
        </Text>

        {/* Name */}
        <Text style={styles.label}>Your Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          placeholderTextColor="#BBBBBB"
          autoCapitalize="words"
          returnKeyType="next"
        />

        {/* Age */}
        <Text style={styles.label}>Your Age</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          placeholder="Enter your age"
          placeholderTextColor="#BBBBBB"
          keyboardType="number-pad"
          maxLength={2}
          returnKeyType="done"
          onSubmitEditing={handleSave}
        />

        <Text style={styles.privacy}>
          🔒 Your data is stored only on this device and never shared.
        </Text>

        <TouchableOpacity
          style={[styles.btn, saving && styles.btnDisabled]}
          onPress={handleSave}
          disabled={saving}
          activeOpacity={0.8}
        >
          <Text style={styles.btnText}>
            {saving ? 'Saving…' : 'Get Started →'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex:        { flex: 1, backgroundColor: '#FFF5F5' },
  container:   { padding: 28, paddingBottom: 60 },
  brand:       { fontSize: 32, fontWeight: '800', color: '#C2185B', textAlign: 'center', marginBottom: 8 },
  tagline:     { fontSize: 15, color: '#888', textAlign: 'center', marginBottom: 40, lineHeight: 22 },
  label:       { fontSize: 15, fontWeight: '600', color: '#555', marginBottom: 8, marginTop: 20 },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
  },
  privacy:     { fontSize: 13, color: '#AAA', textAlign: 'center', marginTop: 24, marginBottom: 8, lineHeight: 20 },
  btn: {
    backgroundColor: '#FFB6C1',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#FFB6C1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  btnDisabled: { opacity: 0.6 },
  btnText:     { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
});
