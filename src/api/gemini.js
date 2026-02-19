import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API - Replace with your API key
const API_KEY = 'AIzaSyDdJQo01a1F34bcFC5l1olx9JEtNTVBCpM'; // Get from https://makersuite.google.com/app/apikey

const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Get personalized health advice based on user's symptom and language
 * @param {string} symptom - User's symptom or health concern
 * @param {string} language - 'en' for English, 'hi' for Hindi
 * @returns {Promise<string>} - AI-generated health tip with disclaimer
 */
export async function getHealthAdvice(symptom, language = 'en') {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const languageInstruction = language === 'hi' 
    ? 'Respond in Hindi (हिंदी) language only.'
    : 'Respond in English.';

  const prompt = `You are a supportive women's health companion AI called AuraHealth. 
A user has described the following symptom or concern related to menstrual health: "${symptom}"

${languageInstruction}

Please provide:
1. A warm, empathetic acknowledgment of their concern
2. General wellness tips that may help (like hydration, rest, gentle exercise, heat therapy)
3. When they should consider consulting a healthcare provider

Keep your response concise (under 150 words), supportive, and accessible for rural users.

IMPORTANT: End your response with a clear disclaimer that this is general wellness information, not medical advice, and they should consult a healthcare provider for persistent or severe symptoms.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    
    // Fallback response in case of API failure
    const fallbackMessages = {
      en: "I'm having trouble connecting right now. Please try again later. Remember to stay hydrated and rest well. If your symptoms persist, please consult a healthcare provider.\n\n⚠️ Disclaimer: This is general wellness information, not medical advice.",
      hi: "अभी कनेक्ट करने में समस्या हो रही है। कृपया बाद में पुनः प्रयास करें। खूब पानी पिएं और अच्छी तरह आराम करें। यदि लक्षण बने रहें, तो कृपया डॉक्टर से परामर्श लें।\n\n⚠️ अस्वीकरण: यह सामान्य स्वास्थ्य जानकारी है, चिकित्सा सलाह नहीं।"
    };
    
    return fallbackMessages[language] || fallbackMessages.en;
  }
}

/**
 * Analyze mood patterns and provide insights
 * @param {Array} moodData - Array of mood entries
 * @param {string} language - 'en' for English, 'hi' for Hindi
 * @returns {Promise<string>} - AI-generated mood analysis
 */
export async function analyzeMoodPatterns(moodData, language = 'en') {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const languageInstruction = language === 'hi' 
    ? 'Respond in Hindi (हिंदी) language only.'
    : 'Respond in English.';

  const moodSummary = moodData.map(m => `${m.date}: ${m.mood}`).join(', ');

  const prompt = `You are AuraHealth, a supportive wellness companion.
Analyze this mood pattern from the past month: ${moodSummary}

${languageInstruction}

Provide a brief, supportive insight about any patterns you notice and one wellness tip. Keep it under 80 words.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    return language === 'hi' 
      ? 'मूड विश्लेषण अभी उपलब्ध नहीं है।'
      : 'Mood analysis is not available right now.';
  }
}
