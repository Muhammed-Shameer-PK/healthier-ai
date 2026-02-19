# AuraHealth 🌸

A privacy-first, vernacular-supported menstrual wellness tracker built for the **CodeSangram Hackathon**.

## ✨ Features

### 1. 📅 Cycle Tracker
- Visual calendar using `react-native-calendars`
- Log period days and moods
- Offline cycle prediction algorithm

### 2. 🤖 AI Health Advocate
- Chat interface powered by Gemini API
- Personalized health advice in your language
- Text-to-speech for accessibility (especially for rural users)

### 3. 🗣️ Vernacular Support
- **English** and **Hindi** (हिंदी)
- Easy language toggle
- All UI elements translated

### 4. 🔒 Privacy First
- All data stored locally using `expo-secure-store`
- No cloud uploads or tracking
- Secure encryption on device

### 5. 📊 Mood Heatmap
- Visual mood tracking over time
- See patterns in your emotional wellbeing

## 🛠️ Tech Stack

- **React Native** (Expo Go)
- **Expo Router** for navigation
- **Lucide Icons** for beautiful UI
- **Gemini API** for AI health insights
- **expo-secure-store** for local data storage
- **expo-speech** for text-to-speech
- **react-native-calendars** for cycle tracking

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Expo Go app on your phone
- Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add your Gemini API key:**
   Open `src/api/gemini.js` and replace:
   ```javascript
   const API_KEY = 'YOUR_GEMINI_API_KEY';
   ```

3. **Start the development server:**
   ```bash
   npx expo start
   ```

4. **Run on your device:**
   - Scan the QR code with Expo Go (Android)
   - Scan with Camera app (iOS)

## 📁 Project Structure

```
├── app/                      # Expo Router pages
│   ├── _layout.js           # Root layout with providers
│   └── (tabs)/              # Tab-based navigation
│       ├── index.js         # Home screen with calendar
│       ├── chat.js          # AI health advocate
│       └── settings.js      # App settings
├── src/
│   ├── api/
│   │   └── gemini.js        # Gemini API integration
│   ├── components/
│   │   ├── Calendar.js      # Period tracking calendar
│   │   ├── LanguageSwitch.js # EN/ML toggle
│   │   ├── CyclePrediction.js # Next period prediction
│   │   └── MoodHeatmap.js   # Mood visualization
│   ├── context/
│   │   └── LanguageContext.js # Language state management
│   ├── hooks/
│   │   └── useCycleTracker.js # Cycle prediction logic
│   ├── constants/
│   │   └── translations.js  # EN/ML translations
│   └── utils/
│       └── storage.js       # Secure storage utilities
└── assets/                  # App icons and images
```

## 🎨 Design

- **Primary Colors:** `#FFF5F5` (background), `#FFB6C1` (accent)
- **Style:** Soft pastel, minimalist, accessible
- **Target Users:** Rural women with varying tech literacy

## 🏆 Hackathon Features

| Feature | Impact |
|---------|--------|
| Hindi support | Rural accessibility |
| Text-to-speech | Helps non-readers |
| Offline prediction | Works without internet |
| Privacy-first | Addresses cultural sensitivity |
| Mood tracking | Mental health awareness |

## 📝 License

Built with ❤️ for CodeSangram Hackathon

## ⚠️ Disclaimer

This app provides general wellness information and is not a substitute for professional medical advice. Always consult a healthcare provider for medical concerns.
