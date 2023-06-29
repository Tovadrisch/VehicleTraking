import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useContext, useState } from "react";
import { LanguageContext } from "../localization/LanguageContext";
import Button from "./Button";
import Colors from "../constants/Colors";

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
                style={[styles.category, selectedCategory === category ? { borderWidth: 2, borderColor: Colors.additional } : undefined]}
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
        borderTopWidth: 2,
        borderColor: Colors.additional,
        backgroundColor: Colors.main
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
        backgroundColor: Colors.main,
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 15,
        margin: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: -2,
            height: 4,
        },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5
    }
});
