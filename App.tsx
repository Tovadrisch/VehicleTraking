import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Navigation from "./navigation";
import { LanguageProvider } from "./localization/LanguageContext";

// Обертывание приложения в провайдеры , обеспечивающие смену языка (LanguageProvider) и безопасные области
// для размещения контента в границах устройства (SafeAreaProvider).
// Подключение компонента, отвечающего за навигацию (Navigation).
// Подключение компонента для установки стиля строки состояния устройста (StatusBar).
export default function App() {
    return (
        <LanguageProvider>
            <SafeAreaProvider>
                <Navigation />
                <StatusBar style="auto" />
            </SafeAreaProvider>
        </LanguageProvider>
    );
}
