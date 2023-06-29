import React, { createContext, useState, ReactNode } from 'react';
import i18n from './i18n';

// Определение тип для контекста языка
interface LanguageContextProps {
    language: string; // текущий язык
    changeLanguage: (newLanguage: string) => void; // функция для изменения языка
    get: (stringId: string) => string; // функция для получения локализованных строк по идентификатору
}

// Создание контекста языка и предоставление значения по умолчанию
export const LanguageContext = createContext<LanguageContextProps>({
    language: i18n.locale, // использование языка, заданного в i18n по умолчанию
    changeLanguage: () => {}, // возвращение пустой функции во избежание ошибок
    get: () => "" // возвращение пустой строки по умолчанию
});

// Определение типа пропсов для компонента LanguageProvider
interface LanguageProviderProps {
    children: ReactNode; // дочерние элементы, которые будут обернуты провайдером
}

// Компонент-провайдер для контекста языка
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [language, setLanguage] = useState(i18n.locale); // хранение текущего языка в состоянии

    // Функция для изменения языка
    const changeLanguage = (newLanguage: string) => {
        i18n.locale = newLanguage; // устанавка нового языка в i18n
        setLanguage(newLanguage); // обновление состояния текущего языка
    };

    // Функция для получения локализованных строк по идентификатору
    const get = (stringId: string) => {
        return i18n.t(stringId); // использование i18n для получения локализованной строки
    }

    // Возвращение обернутых дочерних элементов в провайдере
    return (
        <LanguageContext.Provider value={{ language, changeLanguage, get }}>
            {children}
        </LanguageContext.Provider>
    )
};
