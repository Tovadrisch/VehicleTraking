import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from "react-native";
import { useContext } from "react";

import VehicleListScreen from "../screens/VehicleListScreen";
import VehicleMapScreen from "../screens/VehicleMapScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { LanguageContext } from "../localization/LanguageContext";
import Colors from "../constants/Colors";

// Компонент навигации, экспортируемый по умолчанию
export default function Navigation() {
    return (
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    )
}

// Типы параметров для BottomTabNavigator
export type BottomTabParamList = {
    VehicleList;
    VehicleMap;
    Settings;
}

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

// Основной компонент навигации
function RootNavigator() {
    const { get } = useContext(LanguageContext); // получение функции для получения локализированных строк из контекста языка

    return (
        <BottomTab.Navigator
            screenOptions={{
                headerStyle: styles.header,
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.label,
                tabBarActiveTintColor: Colors.additional
            }}
        >
            {/* Экран со списком транспортных средств */}
            <BottomTab.Screen
                name="VehicleList"
                component={VehicleListScreen}
                options={{
                    title: get("vehiclesList"),
                    tabBarLabel: get("vehiclesList"),
                    tabBarIcon: ({ color }) => <Ionicons name="car-outline" color={color} size={30} />
                }}
            />
            {/* Экран с картой транспортных средств */}
            <BottomTab.Screen
                name="VehicleMap"
                component={VehicleMapScreen}
                options={{
                    title: get("vehiclesMap"),
                    tabBarLabel: get("vehiclesMap"),
                    tabBarIcon: ({ color }) => <Ionicons name="map-outline" color={color} size={30} />
                }}
            />
            {/* Экран с настройками */}
            <BottomTab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    title: get("settings"),
                    tabBarLabel: get("settings"),
                    tabBarIcon: ({ color }) => <Ionicons name="settings-outline" color={color} size={30} />
                }}
            />
        </BottomTab.Navigator>
    )
}

// Подключение стилей
const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.main,
        borderBottomWidth: 2,
        borderBottomColor: Colors.additional
    },
    tabBar: {
        backgroundColor: Colors.main,
        borderTopWidth: 2,
        borderTopColor: Colors.additional
    },
    label: {
        fontSize: 14
    }
})
