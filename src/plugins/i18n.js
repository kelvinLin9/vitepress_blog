import { createI18n } from "vue-i18n";
import en_US from "@/locales/en-US";
import zh_TW from "@/locales/zh-TW";
const messages = {
  en_US,
  zh_TW
};

const i18n = createI18n({
  legacy: false,
  locale: "en_US",
  fallbackLocale: "en_US",
  messages,
});

export default i18n;
