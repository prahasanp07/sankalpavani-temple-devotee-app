import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json';
import translationKN from './locales/kn/translation.json';

const resources = {
  en: {
    translation: translationEN
  },
  kn: {
    translation: translationKN
  }
};

// Retrieve persisted language or fallback to English ('en')
const savedLanguage = (() => {
  try {
    return localStorage.getItem('sankalpavani_language') || 'en';
  } catch (e) {
    return 'en';
  }
})();

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;
