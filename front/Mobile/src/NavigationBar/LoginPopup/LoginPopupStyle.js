import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    popupLoginContainer: {
        position: 'absolute',
        bottom: height * 0.08,
        left: width * 0.38,
        zIndex: 1,
        padding: width * 0.05,
        backgroundColor: 'white',
        width: width * 0.6,
        height: height * 0.4,
        shadowOffset: { width: -2, height: -2 },
        shadowColor: 'black',
        elevation: 5,
        borderRadius: width * 0.05,
        gap: width * 0.02,
    },

    usernameText: {
        fontFamily: 'Nexa',
        fontSize: width * 0.05,
    },

    emailText: {
        fontFamily: 'Nexa',
        fontSize: width * 0.03,
        color: 'grey',
    },

    headerPopup: {
        display: 'flex',
    },

    separator: {
        width: '100%',
        height: width * 0.004,
        backgroundColor: 'grey',
        borderRadius: width,
    },

    utilsButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: height * 0.04,
        borderRadius: width * 0.02,
    },

    utilsButtonContainer: {
        display: 'flex',
        gap: width * 0.02,
    },

    textUtilsButton: {
        fontFamily: 'Nexa',
        fontSize: width * 0.035,
        paddingLeft: width * 0.04,
        width: '80%',
    },

    apiLogo: {
        width: width * 0.06,
        height: width * 0.06,
        borderRadius: width,
    },
});