import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trash2, Shield, Info } from 'lucide-react-native';
import { useLanguage } from '../../src/context/LanguageContext';
import { translations } from '../../src/constants/translations';
import LanguageSwitch from '../../src/components/LanguageSwitch';
import { clearAllData } from '../../src/utils/storage';

export default function SettingsScreen() {
  const { language } = useLanguage();
  const t = translations[language];

  const handleClearData = () => {
    Alert.alert(
      t.clearDataTitle,
      t.clearDataMessage,
      [
        { text: t.cancel, style: 'cancel' },
        {
          text: t.confirm,
          style: 'destructive',
          onPress: async () => {
            await clearAllData();
            Alert.alert(t.success, t.dataCleared);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t.settings}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.language}</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>{t.selectLanguage}</Text>
          <LanguageSwitch />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.privacy}</Text>
        <View style={styles.infoCard}>
          <Shield size={24} color="#FFB6C1" />
          <Text style={styles.infoText}>{t.privacyInfo}</Text>
        </View>
        
        <TouchableOpacity style={styles.dangerButton} onPress={handleClearData}>
          <Trash2 size={20} color="#FF6B6B" />
          <Text style={styles.dangerButtonText}>{t.clearAllData}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.about}</Text>
        <View style={styles.infoCard}>
          <Info size={24} color="#FFB6C1" />
          <View style={styles.aboutContent}>
            <Text style={styles.appVersion}>AuraHealth v1.0.0</Text>
            <Text style={styles.aboutText}>{t.aboutInfo}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#FFE4E9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#FFE4E9',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  aboutContent: {
    flex: 1,
    marginLeft: 12,
  },
  appVersion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  aboutText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  dangerButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: '500',
  },
});
