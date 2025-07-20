import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslations from './locales/en.json';
import svTranslations from './locales/sv.json';

const resources = {
  en: {
    translation: enTranslations
  },
  sv: {
    translation: svTranslations
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true, // Always enable debug to catch missing keys
    
    // Save missing keys during development
    saveMissing: process.env.NODE_ENV === 'development',
    
    // Language detection options
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },

    interpolation: {
      escapeValue: false, // React already does escaping
    },

    // Swedish locale settings
    lng: navigator.language.startsWith('sv') ? 'sv' : 'en',
    
    // Additional debugging options
    returnEmptyString: false,
    returnNull: false,
    returnObjects: false,
  });

export default i18n;
