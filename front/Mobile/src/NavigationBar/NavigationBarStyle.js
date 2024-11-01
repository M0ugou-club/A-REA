import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    screenColor: {
        flex: 1,
        backgroundColor: 'red'
    },

    navigationBarContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: width * 0.04,
        alignItems: 'center',
        width: width,
        height: height * 0.08,
        alignSelf: 'flex-end',
        borderTopWidth: width * 0.003,
        borderTopColor: '#7F7F7F',
    },

    buttonNavigation: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.2,
        height: height * 0.07,
    },

    icon: {
        fontSize: width * 0.07,
        color: '#7F7F7F'
    },

    iconChoosen: {
        color: 'black'
    },

    textButton: {
        color: '#7F7F7F',
        fontSize: width * 0.03,
        fontFamily: 'Nexa',
    },

    textButtonChoosen: {
        color: 'black',
        fontSize: width * 0.03,
        fontFamily: 'Nexa',
    }
});
