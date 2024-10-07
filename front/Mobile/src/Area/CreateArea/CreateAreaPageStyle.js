import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    globalContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },

    pageContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },

    actionContainer: {
        height: height * 0.3,
        backgroundColor: '#88b4db',
        borderBottomRightRadius: width * 0.05,
        borderBottomLeftRadius: width * 0.05,
    },

    reactionContainer: {
        height: height * 0.3,
        backgroundColor: '#88b4db',
        borderTopRightRadius: width * 0.05,
        borderTopLeftRadius: width * 0.05,
    },

    areaContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    actionButton: {
        width: width * 0.3,
        height: width * 0.3,
        backgroundColor: '#3f72af',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: width * 0.03,
    },
});
