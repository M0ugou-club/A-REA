import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from './LoginPopupStyle';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';

export default function LoginPopup() {

    const navigation = useNavigation();

    async function onLogout() {
        try {
            await AsyncStorage.removeItem('accessToken');
            navigation.navigate('Login');
        } catch (error) {
            alert('Error:', error);
        }
    }

    const handleSpotifyLogin = async () => {
        const authToken = await AsyncStorage.getItem('accessToken');
        const authUrl = 'http://inox-qcb.fr:8000/oauth/Spotify?token=' + authToken;

        let result = await WebBrowser.openBrowserAsync(authUrl);
    };

    return (
        <View style={styles.popupLoginContainer}>
            <View style={styles.headerPopup}>
                <Text style={styles.usernameText}>Username</Text>
                <Text style={styles.emailText}>email.template@inox.qcb</Text>
            </View>
            <View style={styles.separator}></View>
            <View style={styles.utilsButtonContainer}>
                <TouchableOpacity style={styles.utilsButton}>
                    <Image source={require('../../../assets/user.png')} />
                    <Text style={styles.textUtilsButton}>Mon Profile</Text>
                    <Image source={require('../../../assets/chevron-right.png')} style={styles.chevron} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.utilsButton}>
                    <Image source={require('../../../assets/setting.png')} />
                    <Text style={styles.textUtilsButton}>Paramètres</Text>
                    <Image source={require('../../../assets/chevron-right.png')} />
                    </TouchableOpacity>
                <TouchableOpacity style={styles.utilsButton} onPress={handleSpotifyLogin}>
                    <Image source={{ uri: 'https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png' }} style={styles.apiLogo} />
                    <Text style={styles.textUtilsButton}>Se Connecter</Text>
                    <Image source={require('../../../assets/chevron-right.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.utilsButton}>
                    <Image source={{ uri : 'https://cdn.iconscout.com/icon/free/png-256/free-discord-logo-icon-download-in-svg-png-gif-file-formats--social-media-pack-logos-icons-3073764.png?f=webp&w=128' }} style={styles.apiLogo} />
                    <Text style={styles.textUtilsButton}>Se Connecter</Text>
                    <Image source={require('../../../assets/chevron-right.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.utilsButton}>
                    <Image source={{ uri : 'https://cdn.iconscout.com/icon/free/png-512/free-twitter-logo-icon-download-in-svg-png-gif-file-formats--social-media-logos-pack-icons-189787.png?f=webp&w=512' }} style={styles.apiLogo} />
                    <Text style={styles.textUtilsButton}>Se Connecter</Text>
                    <Image source={require('../../../assets/chevron-right.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.utilsButton} onPress={onLogout}>
                    <Image source={require('../../../assets/log-out.png')} />
                    <Text style={styles.textUtilsButton}>Se déconnecter</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}