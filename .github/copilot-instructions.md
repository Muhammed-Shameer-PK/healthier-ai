# AuraHealth - Copilot Instructions

## Project Overview
AuraHealth is a privacy-first, vernacular-supported menstrual wellness tracker for the CodeSangram Hackathon.

## Tech Stack
- React Native (Expo Go)
- Expo Router for navigation
- Lucide Icons for UI
- Gemini API for health insights
- expo-secure-store for local data storage

## Core Features
1. **Cycle Tracker**: Visual calendar using 'react-native-calendars' to log periods and symptoms
2. **AI Health Advocate**: Chat interface integrating Gemini API for personalized health advice
3. **Vernacular First**: Support for English and Hindi (crucial for rural impact)
4. **Privacy-First**: All data stored locally using 'expo-secure-store'

## UI Style
- Soft pastel theme (#FFF5F5, #FFB6C1)
- Minimalist design
- Accessible for rural users

## Project Structure
```
src/
├── api/
│   └── gemini.js         # Gemini API calls
├── components/
│   ├── Calendar.js       # Core tracking UI
│   └── LanguageSwitch.js # Malayalam/English toggle
├── screens/
│   └── ChatScreen.js     # AI health advocate
├── hooks/
│   └── useCycleTracker.js # Cycle prediction logic
├── constants/
│   └── translations.js   # Malayalam string mappings
└── utils/
    └── storage.js        # Secure storage utilities
```

## Development Guidelines
- Always use expo-secure-store for sensitive data
- Support both English and Hindi in all user-facing text
- Follow accessibility best practices
- Keep the UI simple and intuitive for rural users
