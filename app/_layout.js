/* PROJECT: "AuraHealth" - Menstrual Wellness & AI Companion 
GOAL: A privacy-first, vernacular-supported menstrual tracker for the CodeSangram Hackathon.
TECH STACK: React Native (Expo Go), Expo Router, Lucide Icons, Gemini API for health insights.

CORE FEATURES TO IMPLEMENT:
1. Cycle Tracker: A visual calendar using 'react-native-calendars' to log periods and symptoms.
2. AI Health Advocate: A chat interface integrating Gemini API for personalized health advice.
3. Vernacular First: Support for English and Malayalam (crucial for rural impact).
4. Privacy-First: All data stored locally using 'expo-secure-store'.

UI STYLE: Soft pastel theme (#FFF5F5, #FFB6C1), minimalist, accessible for rural users.
*/

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LanguageProvider } from '../src/context/LanguageContext';

export default function RootLayout() {
  return (
    <LanguageProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FFF5F5',
          },
          headerTintColor: '#333',
          headerTitleStyle: {
            fontWeight: '600',
          },
          contentStyle: {
            backgroundColor: '#FFF5F5',
          },
        }}
      />
    </LanguageProvider>
  );
}
