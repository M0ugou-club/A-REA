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
        alignItems: 'center',
        marginTop: height * 0.1,
        gap: height * 0.02,
    },

    areaComponentContainer: {
        display: 'flex',
        gap: height * 0.02,
    },
});
