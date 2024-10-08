import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    globalContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },

    pageContainer: {
        flex: 1,
        backgroundColor: 'white',
    },

    actionContainerWrapper: {
        height: height * 0.25,
        backgroundColor: '#88b4db',
        borderBottomRightRadius: width * 0.05,
        borderBottomLeftRadius: width * 0.05,
        overflow: 'hidden',
    },

    actionContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: width * 0.02,
        paddingRight: width * 0.02,
        gap: width * 0.02,
    },

    reactionContainerWrapper: {
        height: height * 0.25,
        backgroundColor: '#88b4db',
        borderTopRightRadius: width * 0.05,
        borderTopLeftRadius: width * 0.05,
        overflow: 'hidden',
    },

    reactionContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: width * 0.02,
        paddingRight: width * 0.02,
        gap: width * 0.02,
    },

    areaContainer: {
        flex: 1,
    },

    actionButton: {
        width: width * 0.3,
        height: width * 0.3,
        backgroundColor: '#5b94c7',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: width * 0.03,
        marginRight: width * 0.02,
    },

    selectedActionButton: {
        position: 'absolute',
        top: height * 0.1,
        width: width * 0.3,
        left: width * 0.025,
        height: width * 0.3,
        backgroundColor: '#5b94c7',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: width * 0.03,
        marginRight: width * 0.02,
    },

    selectedReactionButton: {
        position: 'absolute',
        left: width * 0.675,
        top: height * 0.1,
        width: width * 0.3,
        height: width * 0.3,
        backgroundColor: '#5b94c7',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: width * 0.03,
        marginRight: width * 0.02,
    },

    textButton: {
        fontSize: width * 0.05,
        color: 'white',
        fontFamily: 'Nexa',
    },

    arrowImage: {
        position: 'absolute',
        left: width * 0.35,
        resizeMode: 'contain',
        width: width * 0.3,
    },

    createArea: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: height * 0.325,
        left: width * 0.2,
        width: '60%',
        height: '12.5%',
        backgroundColor: '#3f72af',
        borderRadius: width * 0.03,
    },
});