import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CycleCalendar from '../../src/components/Calendar';
import CyclePrediction from '../../src/components/CyclePrediction';
import MoodHeatmap from '../../src/components/MoodHeatmap';
import { useLanguage } from '../../src/context/LanguageContext';
import { translations } from '../../src/constants/translations';

export default function CalendarScreen() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {language === 'hi' ? 'कैलेंडर' : 'Calendar'}
          </Text>
        </View>
        
        <CycleCalendar />
        
        <CyclePrediction />
        
        <MoodHeatmap />
      </ScrollView>
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
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
