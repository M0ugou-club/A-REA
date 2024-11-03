import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    popup: {
        position: 'absolute',
        left: width * 0.1,
        top: height * 0.4,
        width: width * 0.8,
        height: height * 0.4,
        backgroundColor: '#f0f0f0',
        borderRadius: width * 0.03,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: width * 0.015,
    },

    input: {
        width: '80%',
        height: height * 0.05,
        margin: height * 0.02,
        padding: width * 0.02,
        borderWidth: width * 0.003,
        borderColor: 'gray',
        borderRadius: width * 0.02,
    },

    button: {
        width: '80%',
        height: height * 0.05,
        backgroundColor: '#0089ED',
        borderRadius: width * 0.02,
        alignItems: 'center',
        justifyContent: 'center',
    },

    textButton: {
        color: 'white',
        fontSize: width * 0.05,
    },

    questionCircleButton: {
        position: 'absolute',
        top: height * 0.9,
        left: width * 0.85,
    },

    questionCircle: {
        fontSize: width * 0.125,
    },
});

export default styles;