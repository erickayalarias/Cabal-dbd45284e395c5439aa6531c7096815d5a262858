import { initReactI18next } from "react-i18next";
import LaguageDetector from "i18next-browser-languagedetector";
import i18next from "i18next";
import lang_en from "../assets/translations/en/global.json";
import lang_es from "../assets/translations/es/global.json";

const userLang = navigator.language.substring(0, 2);

i18next
  .use(initReactI18next)
  .use(LaguageDetector) //Change language automaticalmente
  .init({
    resources: {
      en: { translation: lang_en },
      es: { translation: lang_es },
    },
    lng: userLang,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });
