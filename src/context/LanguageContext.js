import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveLanguage, getLanguage } from '../utils/storage';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    const savedLanguage = await getLanguage();
    setLanguage(savedLanguage);
  };

  const toggleLanguage = async () => {
    const newLanguage = language === 'en' ? 'hi' : 'en';
    setLanguage(newLanguage);
    await saveLanguage(newLanguage);
  };

  const changeLanguage = async (lang) => {
    setLanguage(lang);
    await saveLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
