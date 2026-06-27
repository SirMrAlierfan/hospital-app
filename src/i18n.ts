import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/landing/en.json';
import translationFA from './locales/landing/fa.json';

const resources = {
  en: translationEN,
  fa: translationFA,
};

i18n
  .use(LanguageDetector) 
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fa', 
    interpolation: {
      escapeValue: false, 
    },
  });


i18n.on('languageChanged', (lng) => {
  const dir = lng === 'fa' ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
});

export default i18n;