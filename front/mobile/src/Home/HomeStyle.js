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
        gap: height * 0.028,
        paddingTop: height * 0.05,
    },

    kayzenDocu: {
        width: width * 0.95,
        height: height * 0.2,
        borderRadius: width * 0.03,
    },

    userInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: width * 0.35,
    },

    avatar: {
        width: width * 0.15,
        height: width * 0.15,
        borderRadius: width,
    },

    nameUserInfo: {
        fontSize: width * 0.05,
        fontFamily: 'Nexa',
        marginLeft: width * 0.01,
    },

    emailUserInfo: {
        fontSize: width * 0.03,
        fontFamily: 'Nexa',
        color: '#3D3D3D',
        backgroundColor: '#F3F3F3',
        paddingLeft: width * 0.02,
        paddingRight: width * 0.02,
        paddingBottom: width * 0.01,
        paddingTop: width * 0.01,
        borderRadius: width,
    },

    userEmailContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: width * 0.02,
    },

    tutorielContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        height: height * 0.35,
        width: width * 0.95,
        backgroundColor: '#F3F3F3',
        borderRadius: width * 0.03,
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
    },

    tutorielTitle: {
        fontSize: width * 0.05,
        fontFamily: 'Nexa',
        color: 'black',
    },

    headerInfo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.25,
        height: height * 0.075,
        backgroundColor: '#F3F3F3',
        borderRadius: width * 0.03,
    },

    headerInfoContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: width * 0.95,
        gap: width * 0.05,
    },

    headerInfoTitle: {
        fontSize: width * 0.04,
        fontFamily: 'Nexa',
        color: '#3D3D3D',
    },

    headerInfoInfo: {
        fontSize: width * 0.05,
        fontFamily: 'Nexa',
        color: '#3D3D3D',
    },

    tutoContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        height: height * 0.3,
    },

    gif: {
        resizeMode: 'contain',
        height: height * 0.3,
        width: width * 0.3,
    },

    tutoTextContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: height * 0.01,
        width: width * 0.5,
    },

    tutoText: {
        fontSize: width * 0.04,
        fontFamily: 'Nexa',
        color: '#3D3D3D',
    },
});
