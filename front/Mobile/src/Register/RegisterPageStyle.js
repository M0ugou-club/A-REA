import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: height * 0.15,
    },

    popup: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: width * 0.85,
        height: height * 0.6,
        backgroundColor: "white",
        borderRadius: width * 0.03,
        gap: height * 0.06,
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

    nameContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: width * 0.7,
    },

    middleTextInput: {
        width: width * 0.33,
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

    kayzen: {
        position: "absolute",
        top: height * 0.06,
        resizeMode: "contain",
        width: width * 0.7,
    },
});

export default styles;