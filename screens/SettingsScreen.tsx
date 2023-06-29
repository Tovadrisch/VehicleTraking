import { StyleSheet, View } from "react-native";
import { useContext } from "react";

import { LanguageContext } from "../localization/LanguageContext";
import Button from "../components/Button";

export default function SettingsScreen() {
    // Получение текущего языка приложения и функций для получения локализированных строк и смены языка приложения из контекста языка
    const { language, get, changeLanguage } = useContext(LanguageContext);

    return (
        <View style={styles.container} >
            {/* Отображение определенной кнопки для смены языка приложения в зависимости от текущего языка */}
            {
                language !== "ru-RU" ?
                    <Button
                        text={get("swapToRussianButton")}
                        pressHandler={() => changeLanguage("ru-RU")}
                    />
                    :
                    <Button
                    text={get("swapToEnglishButton")}
                    pressHandler={() => changeLanguage("en-GB")}
                    />
            }
        </View>
    );
};

// Стили
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});
