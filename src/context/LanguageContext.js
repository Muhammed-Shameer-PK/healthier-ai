import React, { createContext, useContext, useState } from 'react';
import { translations } from '../constants/translations';

const LanguageContext = createContext({
  language: 'en',
  t: translations.en,
  toggleLanguage: () => {},
  setLanguage: () => {},
});

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const toggleLanguage = () =>
    setLanguage(prev => (prev === 'en' ? 'hi' : 'en'));

  return (
    <LanguageContext.Provider
      value={{ language, t: translations[language], toggleLanguage, setLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
