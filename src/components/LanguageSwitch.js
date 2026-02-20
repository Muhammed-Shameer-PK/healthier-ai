import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageSwitch({ style }) {
  const { language, toggleLanguage } = useLanguage();
  return (
    <TouchableOpacity style={[styles.btn, style]} onPress={toggleLanguage}>
      <Text style={styles.text}>{language === 'en' ? 'हिंदी' : 'EN'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn:  { backgroundColor: '#FFE4E9', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, alignSelf: 'flex-end' },
  text: { color: '#C2185B', fontWeight: '700', fontSize: 14 },
});
