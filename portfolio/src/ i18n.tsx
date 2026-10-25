import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

export const ready = i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'pt'],
    fallbackLng: 'en',
    load: 'languageOnly',
    ns: ['default'],
    defaultNS: 'default',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    backend: {
      loadPath: `/locales/{{lng}}/{{ns}}.json`
    },
    interpolation: {escapeValue: false}
  });

export default i18n;
