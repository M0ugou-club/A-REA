import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    globalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'white',
    },

    pageContentContainer: {
        flex: 1,
        display: 'flex',
    },

    title: {
        height: height * 0.05,
        justifyContent: 'center',
        marginTop: height * 0.05,
        paddingLeft: width * 0.03,
    },

    titleText: {
        fontSize: width * 0.05,
        fontFamily: 'Nexa',
    },

    separator: {
        width: width * 0.94,
        height: width * 0.003,
        backgroundColor: '#7F7F7F',
        marginTop: height * 0.02,
    },

    icon: {
        width: width * 0.1,
        height: width * 0.1,
    },

    connectServiceButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: width * 0.05,
        width: width * 0.9,
        backgroundColor: '#F3F3F3',
        paddingLeft: width * 0.03,
        height: height * 0.075,
        borderRadius: width * 0.03,
    },

    listPlatformsContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: height * 0.03,
        marginTop: height * 0.02,
    },

    connectText: {
        fontSize: width * 0.04,
        fontFamily: 'Nexa',
    },
});