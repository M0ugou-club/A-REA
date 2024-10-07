import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    navigationBarContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: width * 0.04,
        alignItems: 'center',
        width: width,
        height: height * 0.07,
        backgroundColor: '#0089ED',
        alignSelf: 'flex-end'
    },

    navigationButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3D85C6',
        width: width * 0.35,
        height: height * 0.05,
        borderRadius: width * 0.03,
        shadowColor: 'black',
        elevation: 1
    },

    textNavigationButton: {
        color: 'white',
        fontFamily: 'Nexa',
        fontSize: width * 0.05,
    },

    userButtonImage: {
        width: width * 0.1,
        height: width * 0.1,
        borderRadius: width,
        borderColor: 'white',
        borderWidth: width * 0.004
    },
    
    userButton:{
        borderRadius: width,
    },
});