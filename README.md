Here is a **GitHub-ready, production-quality README** with badges, clean structure, and professional formatting:

---

# 🌸 Healthier

![React Native](https://img.shields.io/badge/React%20Native-0.73+-blue.svg)
![Expo](https://img.shields.io/badge/Expo-SDK%2050+-black.svg)
![Gemini API](https://img.shields.io/badge/AI-Gemini%20API-purple.svg)
![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS-green.svg)
![Privacy First](https://img.shields.io/badge/Privacy-Local%20Storage-success.svg)
![License](https://img.shields.io/badge/License-Hackathon-blue.svg)

> **A Privacy-First, Vernacular-Enabled Menstrual Wellness Platform**
> Built for the **CodeSangram Hackathon**

---

## 📖 Overview

**Healthier** is a secure, accessible menstrual wellness tracker designed for rural and semi-urban women.

The app combines:

* 📅 Smart cycle tracking
* 🤖 AI-powered health guidance
* 🌏 Vernacular language support
* 🔐 Fully local encrypted storage

All user data remains on the device — ensuring privacy, dignity, and cultural sensitivity.

---

## ✨ Key Features

### 📅 Cycle Tracking & Prediction

* Interactive calendar (`react-native-calendars`)
* Period & mood logging
* Offline cycle prediction algorithm
* Historical pattern tracking

### 🤖 AI Health Advocate

* Gemini API powered chat assistant
* Personalized menstrual health guidance
* Multilingual responses
* Integrated text-to-speech for accessibility

### 🌏 Vernacular Support

* English
* Hindi (हिंदी)
* One-tap language toggle
* Fully translated UI

### 🔒 Privacy-First Architecture

* Local encrypted storage using `expo-secure-store`
* No cloud uploads
* No tracking
* No analytics

### 📊 Mood Heatmap

* Visual mood tracking
* Emotional pattern recognition
* Mental health awareness insights

---

## 🛠 Tech Stack

| Layer         | Technology             |
| ------------- | ---------------------- |
| Framework     | React Native (Expo)    |
| Navigation    | Expo Router            |
| AI            | Gemini API             |
| Storage       | expo-secure-store      |
| Accessibility | expo-speech            |
| UI            | Lucide Icons           |
| Calendar      | react-native-calendars |

---

## 🏗 Project Structure

```
├── app/
│   ├── _layout.js
│   └── (tabs)/
│       ├── index.js
│       ├── chat.js
│       └── settings.js
├── src/
│   ├── api/
│   │   └── gemini.js
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── constants/
│   └── utils/
└── assets/
```

---

## 🚀 Getting Started

### 🔹 Prerequisites

* Node.js (v18+)
* Expo Go (Android / iOS)
* Gemini API key from Google AI Studio

---

### 🔹 Installation

1️⃣ Clone the repository:

```bash
git clone https://github.com/your-username/healthier.git
cd healthier
```

2️⃣ Install dependencies:

```bash
npm install
```

3️⃣ Add your Gemini API key:

Open:

```
src/api/gemini.js
```

Replace:

```javascript
const API_KEY = 'YOUR_GEMINI_API_KEY';
```

4️⃣ Start development server:

```bash
npx expo start
```

5️⃣ Run on your device:

* Scan QR code with Expo Go (Android)
* Scan using Camera app (iOS)

---

## 🎨 Design Philosophy

* Soft pastel theme (`#FFF5F5`, `#FFB6C1`)
* Minimalist interface
* Low cognitive load
* Optimized for low digital literacy users
* Accessibility-first design

---

## 🎯 Impact Goals

| Challenge               | Healthier Solution          |
| ----------------------- | --------------------------- |
| Language barriers       | Hindi localization          |
| Limited literacy        | Text-to-speech support      |
| Cultural sensitivity    | Offline-first privacy model |
| Poor connectivity       | Offline cycle prediction    |
| Mental health awareness | Mood heatmap tracking       |

---

## 🔐 Privacy & Security

* All data stored locally
* Encrypted storage via `expo-secure-store`
* No external databases
* No third-party analytics
* No personal data transmission

---

## ⚠️ Disclaimer

Healthier provides general wellness tracking and educational insights.
It is not a substitute for professional medical advice.
Users should consult certified healthcare providers for medical concerns.

---

## 🏆 Hackathon Submission

Developed for **CodeSangram Hackathon**
Focused on accessibility, privacy, and grassroots health empowerment.

---

## 📄 License

This project was developed for hackathon purposes.
For production or commercial use, please contact the development team.

---
