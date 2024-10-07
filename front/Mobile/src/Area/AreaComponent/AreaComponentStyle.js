import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    areaContainer: {
        display: 'flex',
        padding: width * 0.05,
        paddingTop: height * 0.01,
        paddingBottom: height * 0.01,
        width: width * 0.9,
        height: height * 0.15,
        backgroundColor: '#CFE2F3',
        borderRadius: width * 0.05,
        gap: height * 0.02,
    },

    logoApi: {
        width: width * 0.1,
        height: width * 0.1,
        borderRadius: width,
    },

    arrowImage: {
        resizeMode: 'contain',
        width: width * 0.25,
    },

    area: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '40%',
        gap: width * 0.125,
    },

    areaTitle: {
        fontFamily: 'Nexa',
        fontSize: width * 0.04,
        textDecorationLine: 'underline',
    },

    areaHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: width * 0.5,
        height: height * 0.04,
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
    },

    switch: {
        transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
    },
});