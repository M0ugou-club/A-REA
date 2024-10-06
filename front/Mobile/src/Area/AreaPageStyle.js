import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    globalContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },

    pageContentContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        marginTop: height * 0.1,
        gap: height * 0.02,
    },
});
