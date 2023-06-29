import * as Localization from "expo-localization"
import i18n from "i18n-js"

import en from "./strings/en.json"
import ru from "./strings/ru.json"

// Установка переводов для поддерживаемых языков
i18n.translations = { en, ru };
// Установка текущего языка на основе локализации устройства
i18n.locale = Localization.locale;
// Установка режима отката на другой язык в том случае, если перевод не найден
i18n.fallbacks = true;

export default i18n;
