import { StyleSheet, Text, TouchableOpacity } from "react-native";

// Определение типов
type props = {
    text: string;

    pressHandler(): void;
};

export default function Button({ text, pressHandler }: props) {
    return (
        <TouchableOpacity activeOpacity={1} style={styles.button} onPress={pressHandler} >
            <Text style={styles.text} >{text}</Text>
        </TouchableOpacity>
    );
};

// Стили
const styles = StyleSheet.create({
    button: {
        padding: 10
    },
    text: {
        textAlign: "center",
        textDecorationLine: "underline"
    }
});
