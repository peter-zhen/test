import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
  
  .use(detector)
  .use(backend)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: require("./locales/en.json"),
      },
      cn: {
        translation: require("./locales/cn.json"),
      },
      de: {
        translation: require("./locales/cn.json"),
      },
        ar:{
        translation: require("./locales/ar.json"),
        }
    },
    lng: "en", 
    fallbackLng: "en", // Fallback to English if translation is missing
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;