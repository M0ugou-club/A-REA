import { StyleSheet, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },

    popup: {
        display: "flex",
        position: "absolute",
        top: height * 0.3,
        left: width * 0.075,
        flexDirection: "column",
        alignItems: "center",
        width: width * 0.85,
        height: height * 0.6,
        backgroundColor: "white",
        borderRadius: width * 0.03,
        gap: height * 0.08,
    },

    titleContainer: {
        display: "flex",
        width: "100%",
        flexDirection: "column",
        paddingLeft: width * 0.07,
        paddingTop: height * 0.03,
    },

    welcome: {
        fontSize: width * 0.05,
        fontWeight: "bold",
        marginBottom: height * 0.02,
        fontFamily: "Nexa",
    },

    title: {
        fontSize: width * 0.08,
        marginBottom: height * 0.02,
        fontFamily: "Nexa",
    },

    normalTextInputs: {
        width: width * 0.7,
        height: height * 0.05,
        borderWidth: 1,
        borderColor: "#ADADAD",
        borderRadius: width * 0.01,
        paddingLeft: width * 0.02,
        marginBottom: height * 0.02,
        fontFamily: "Nexa",
    },

    button: {
        width: width * 0.7,
        height: height * 0.05,
        borderRadius: width * 0.01,
        marginBottom: height * 0.02,
        backgroundColor: "#0089ED",
    },

    textButton: {
        textAlign: "center",
        lineHeight: height * 0.05,
        fontSize: width * 0.04,
        fontFamily: "Nexa",
        color: "white",
    },

    formContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: height * 0.02,
    },

    link: {
        color: "#0089ED",
        fontFamily: "Nexa",
        textDecorationLine: "underline",
        fontSize: width * 0.03,
    },

    linkContainer: {
        width: width * 0.25,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: width * 0.45,
        marginTop: - height * 0.03,
    },

    kayzen: {
        position: "absolute",
        top: height * 0.06,
        left: width * 0.15,
        resizeMode: "contain",
        width: width * 0.7,
    },

    pageContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: height,
        width: width,
    },
});

export default styles;