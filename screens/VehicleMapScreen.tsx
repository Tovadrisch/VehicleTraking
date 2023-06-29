import MapView from "react-native-maps";
import { StyleSheet, Text, View } from "react-native";
import { useRef, useState, useEffect, useContext } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Linking from 'expo-linking';
import Communications from 'react-native-communications';

import data from "../data.json";
import CustomMapMarker from "../components/CustomMapMarker";
import { BottomTabParamList } from "../navigation/Navigation";
import { LanguageContext } from "../localization/LanguageContext";
import Button from "../components/Button";
import Colors from "../constants/Colors";

// Переменная, содержащая текстовое сообщение, подставляемое в мессенджер при открытии чата
const whatsAppMessage = "Добрый день, подскажите пожалуйста, какой номер заказа у вас сейчас в работе";

// Определение типов
type props = NativeStackScreenProps<BottomTabParamList, "VehicleMap">;

export default function VehicleMapScreen({ route }: props) {
    // Получение функции для получения локализированных строк из контекста языка
    const { get } = useContext(LanguageContext);
    // Хуки для хранения и изменения состояния переменных displayDetails (флаг, отвечающий за отображение на экране окна с информацией о ТС)
    // и selectedVehicleInfo (объект, хранящий информацию о выбранном ТС на карте)
    const [displayDetails, setDisplayDetails] = useState(false);
    const [selectedVehicleInfo, setSelectedVehicleInfo] = useState({});
    // Создание ссылки, которая будет указывать на компонент "MapView" с помощью хука useRef
    const mapRef = useRef(null);
    // Объявление начального положения камеры на карте
    const [initialCamera] = useState({
        center: {
            latitude: 55.751244,
            longitude: 37.618423
        },
        heading: 0,
        pitch: 0,
        altitude: 150000,
        zoom: 10
    });

    // Обработка параметров, полученых с навагацией на текущий экран
    useEffect(() => {
        if (route.params) {
            onMarkerPress(route.params["vehicle"], route.params["name"]);
        }
    }, [route]);

    // Обработка нажатия на маркер на карте
    const onMarkerPress = (vehicle: object, name: string) => {
        setSelectedVehicleInfo({ ...vehicle, name });
        setDisplayDetails(true);
        mapRef.current.animateCamera({
            center: {
                latitude: vehicle["coordinates"]["latitude"],
                longitude: vehicle["coordinates"]["longitude"],
            },
            heading: 0,
            pitch: 0,
            altitude: 5000,
            zoom: 15
        });
    };

    // Обработка нажатия на кнопку "Закрыть"
    const onClosePress = () => {
        setSelectedVehicleInfo({});
        setDisplayDetails(false);
    };

    // Обработка нажатия на кнопку "Позвонить"
    const onPhoneCallPress = (phone: string) => {
        Communications.phonecall(phone, true);
    };

    // Обработка нажатия на кнопку "Написать"
    const onSendMessagePress = (phone: string) => {
        const url = `https://wa.me/${phone}?text=${whatsAppMessage}`; // формирование url адреса с заданными контактным номером и сообщением
        Linking.openURL(url);
    };

    return (
        <View style={{ flex: 1 }} >
            <MapView ref={mapRef} style={{ width: "100%", height: "100%" }} initialCamera={initialCamera} >
                {
                    data.vehicles.map((vehicle:object, index) =>
                        <CustomMapMarker
                            key={index}
                            vehicle={vehicle}
                            pressHandler={(vehicle: object, name) => onMarkerPress(vehicle, name)}
                        />)
                }
            </MapView>
            {/* Проверка флага, отвечающего за отображения окна информации о выбранном ТС на карте */}
            {
                displayDetails ?
                    <View style={styles.detailsCard} >
                        <View style={styles.closeButtonWrap} >
                            <Button
                                text={get("closeButton")}
                                pressHandler={() => onClosePress()}
                            />
                        </View>
                        <Text style={styles.vehicleNameText} >{selectedVehicleInfo["name"]}</Text>
                        <Text >{get("category") + get(selectedVehicleInfo["category"])}</Text>
                        <Text >{get("driver") + selectedVehicleInfo["driver"]}</Text>
                        <Text >{get("contactNumber") + selectedVehicleInfo["number"]}</Text>
                        <View style={styles.contactButtonsContainer} >
                            <Button
                                text={get("phoneCallButton")}
                                pressHandler={() => onPhoneCallPress(selectedVehicleInfo["number"])}
                            />
                            <Button
                                text={get("sendMessageButton")}
                                pressHandler={() => onSendMessagePress(selectedVehicleInfo["number"])}
                            />
                        </View>
                    </View>
                    :
                    undefined
            }
        </View>
    );
};

// Стили
const styles = StyleSheet.create({
    detailsCard: {
        position: "absolute",
        alignSelf: "center",
        bottom: 10,
        padding: 10,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: Colors.additional,
        width: "90%",
        backgroundColor: Colors.main,
        shadowColor: "#000",
        shadowOffset: {
            width: -2,
            height: 4,
        },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5
    },
    closeButtonWrap: {
        position: "absolute",
        zIndex: 2,
        right: 5,
        top: 5
    },
    vehicleNameText: {
        fontSize: 20,
        marginBottom: 5
    },
    contactButtonsContainer: {
        marginTop: 5,
        flexDirection: "row"
    }
});
