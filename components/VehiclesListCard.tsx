import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { LanguageContext } from "../localization/LanguageContext";

// Определение типов
type props = {
    number: number;
    vehicle: object;

    pressHandler(vehicle: object, name: string): void;
};

export default function VehiclesListCard({ number, vehicle, pressHandler }: props) {
    // Получение функции для получения локализированных строк из контекста языка
    const { get } = useContext(LanguageContext);

    return (
        <TouchableOpacity style={styles.card} onPress={() => pressHandler(vehicle, (get("vehicle") + number))} >
            <View style={styles.topRow} >
                <Text style={styles.nameText} >{get("vehicle") + number}</Text>
                <Text >{get("category") + get(vehicle["category"])}</Text>
            </View>
            <Text >{get("driver") + vehicle["driver"]}</Text>
        </TouchableOpacity>
    );
};

// Стили
const styles = StyleSheet.create({
    card: {
        alignSelf: "center",
        width: "90%",
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: "white"
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: 5
    },
    nameText: {
        fontSize: 20
    }
});
