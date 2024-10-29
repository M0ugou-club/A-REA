import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },

    title: {
        fontSize: width * 0.075,
        fontWeight: 'bold',
        margin: 20,
        color: '#CAC7C7',
    },

    popup: {
        width: width * 0.9,
        height: height * 0.8,
        backgroundColor: 'rgba(0,0,0,0.65)',
        borderRadius: 20,
        margin: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
    },

    formInput: {
        width: '80%',
        height: 40,
        margin: 20,
        padding: width * 0.02,
        borderWidth: 1,
        borderColor: '#CAC7C7',
        borderRadius: 10,
        placeholderTextColor: '#CAC7C7',
    },

    utilsInfo: {
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-between',
    },

    formInputUtilsInfo: {
        width: '47.5%',
        height: 40,
        padding: width * 0.02,
        borderWidth: 1,
        borderColor: '#CAC7C7',
        borderRadius: 10,
        placeholderTextColor: '#CAC7C7',
    },

    registerButton: {
        width: '80%',
        height: 40,
        backgroundColor: '#0089ED',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    registerButtonText: {
        color: '#CAC7C7',
        fontSize: width * 0.05,
    },

    textRegisterButton: {
        color: '#CAC7C7',
        textDecorationLine: 'underline',
        fontSize: width * 0.04,
        marginTop: height * 0.02,
      },
});

export default styles;