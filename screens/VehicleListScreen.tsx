import { ScrollView, View } from "react-native";
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import VehiclesListCard from "../components/VehiclesListCard";
import Filter from "../components/Filter";
import data from "../data.json";
import { BottomTabParamList } from "../navigation/Navigation";

type props = NativeStackScreenProps<BottomTabParamList, "VehicleList">;

export default function VehicleListScreen({ navigation }: props) {
    // Хуки, используемые для хранения и изменения состояния флага открытия фильтра
    // и состояния переменной, хранящей текущее значение фильтра
    const [filterIsOpen, setFilterIsOpen] = useState(false);
    const [filterCategory, setFilterCategory] = useState("all");

    // Обработка нажатия на кнопку фильтрации списка
    const onFilterButtonPress = (category: string) => {
        setFilterCategory(category);
        setFilterIsOpen(!filterIsOpen);
    };

    // Обработка нажатия на карточку ТС
    const onVehicleCardPress = (vehicle: object, name: string) => {
        navigation.navigate("VehicleMap", {
                vehicle,
                name
            });
    };

    return (
        <View style={{ flex: 1 }} >
            <ScrollView>
                {
                    data.vehicles.map((vehicle:object, index) =>
                        filterCategory === "all" ?
                            <VehiclesListCard
                                key={index}
                                number={index + 1}
                                vehicle={vehicle}
                                pressHandler={(vehicle: object, name: string) => onVehicleCardPress(vehicle, name)}
                            />
                        : filterCategory === vehicle["category"] ?
                            <VehiclesListCard
                                key={index}
                                number={index + 1}
                                vehicle={vehicle}
                                pressHandler={(vehicle: object, name: string) => onVehicleCardPress(vehicle, name)}
                            />
                        :
                            <View key={index} />
                        )
                }
            </ScrollView>
            <Filter
                filterIsOpen={filterIsOpen}
                currentFilterCategory={filterCategory}
                buttonPressHandler={(category) => onFilterButtonPress(category)}
            />
        </View>
    );
};
