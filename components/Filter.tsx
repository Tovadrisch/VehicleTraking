import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useContext, useState } from "react";
import { LanguageContext } from "../localization/LanguageContext";
import Button from "./Button";

// Определение типов
type props = {
    filterIsOpen: boolean;
    currentFilterCategory: string;

    buttonPressHandler(category: string): void;
};

export default function Filter({ filterIsOpen, currentFilterCategory, buttonPressHandler }: props) {
    // Получение функции для получения локализированных строк из контекста языка
    const { get } = useContext(LanguageContext);
    // Хук, используемый для хранения и изменения состояния выбранной категории ТС
    const [selectedCategory, setSelectedCategory] = useState(currentFilterCategory);

    // Компонент выборки категорий в всплывающем списке
    const  FilterCategory = ({ category }) => {
        return (
            <TouchableOpacity
                style={[styles.category, selectedCategory === category ? { borderLeftWidth: 3, borderBottomWidth: 3 } : undefined]}
                onPress={() => setSelectedCategory(category)}
            >
                <Text >{get(category)}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.filterContainer} >
            {/* Отображение всплывающего списка выборки категорий */}
            {
                filterIsOpen ?
                    <View style={styles.categories} >
                        <FilterCategory category={"cargo"} />
                        <FilterCategory category={"passenger"} />
                        <FilterCategory category={"special"} />
                        <FilterCategory category={"all"} />
                    </View>
                    :
                    <></>
            }
            <View style={styles.filterWrap} >
                {/* Изменение кнопки в зависимости от того, открыт список или нет */}
                {
                    filterIsOpen ?
                        <Button
                            text={get("applyButton")}
                            pressHandler={() => buttonPressHandler(selectedCategory)}
                        />
                        :
                        <Button
                            text={(get("displayedCategoriesButton") + get(currentFilterCategory))}
                            pressHandler={() => buttonPressHandler(selectedCategory)}
                        />
                }
            </View>
        </View>
    );
};

// Стили
const styles = StyleSheet.create({
    filterContainer: {
        borderTopWidth: 1,
        backgroundColor: "white"
    },
    filterWrap: {
        height: 40,
        alignItems: "center",
        justifyContent: "center"
    },
    categories: {
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 5
    },
    category: {
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 15,
        margin: 5
    }
});
