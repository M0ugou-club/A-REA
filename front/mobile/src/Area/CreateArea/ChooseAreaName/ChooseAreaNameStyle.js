import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    globalContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },

    pageContainer: {
        flex: 1,
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    textInput: {
        height: height * 0.075,
        width: width * 0.9,
        backgroundColor: 'white',
        margin: width * 0.05,
        borderRadius: width * 0.03,
        borderWidth: 1,
        borderColor: 'black',
        padding: width * 0.03,
    },

    finishButton: {
        height: height * 0.05,
        width: width * 0.5,
        backgroundColor: '#0089ED',
        margin: width * 0.05,
        borderRadius: width * 0.03,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    finishButtonText: {
        color: 'white',
        fontSize: width * 0.05,
    },
});