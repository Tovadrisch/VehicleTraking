import { Marker } from "react-native-maps";
import { StyleSheet, Text, View } from "react-native";
import { useContext, useState } from "react";

import data from "../data.json"
import { LanguageContext } from "../localization/LanguageContext";
import Colors from "../constants/Colors";

// Определение типов
type props = {
    vehicle: object;

    pressHandler(vehicle: object, name: string): void;
};

// Переменная, хранящая цвета, используемые в маркерах
const colors = {
    "cargo": "#FFC640",
    "passenger": "#EFFD3F",
    "special": "#FF5A40"
};

export default function CustomMapMarker({ vehicle, pressHandler }: props) {
    // Получение функции для получения локализированных строк из контекста языка
    const { get } = useContext(LanguageContext);
    // Определение переменных для хранения номера ТС в общем списке и фонового цвета кружка на карте из входных данных
    const [vehicleNumber] = useState(data.vehicles.findIndex(v => v["id"] === vehicle["id"]));
    const [backgroundColor] = useState(colors[vehicle["category"]]);
    const vehicleName = get("vehicle") + (vehicleNumber + 1);

    return (
        <Marker coordinate={vehicle["coordinates"]} onPress={() => pressHandler(vehicle, vehicleName)}>
            <View style={[styles.marker, { backgroundColor }]}>
                <Text style={styles.markerText}>{vehicleName}</Text>
            </View>
        </Marker>
    );
};

// Стили
const styles = StyleSheet.create({
    marker: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    markerText: {
        fontSize: 8,
        fontWeight: "bold"
    }
});

