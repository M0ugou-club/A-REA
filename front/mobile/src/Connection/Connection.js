import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from './ConnectionStyle';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationBar from '../NavigationBar/NavigationBar';
import * as WebBrowser from 'expo-web-browser';

export default function Connection() {

    const [platforms, setPlatforms] = useState([]);
    const [platformsState, setPlatformsState] = useState({});
    const [fetchUrl, setFetchUrl] = useState('');
    const [reload, setReload] = useState(false);
    const navigation = useNavigation();

    const icons = {
        Spotify: require('../../assets/Icons/Spotify.png'),
        Youtube: require('../../assets/Icons/Youtube.png'),
        Reddit: require('../../assets/Icons/Reddit.png'),
        X: require('../../assets/Icons/X.png'),
        OpenMeteo: require('../../assets/Icons/OpenMeteo.png'),
        Twitch: require('../../assets/Icons/Twitch.png'),
    };

    useFocusEffect(
        useCallback(() => {
            const getFetchUrl = async () => {
                try {
                    const url = await AsyncStorage.getItem('fetchUrl');
                    setFetchUrl(url);
                } catch (e) {
                    console.log(e);
                }
            };
            getFetchUrl();
        }, [reload])
    );

    useFocusEffect(
        useCallback(() => {
            if (!fetchUrl) return;

            const getData = async () => {
                try {
                    const token = await AsyncStorage.getItem('accessToken');
                    const response = await fetch(fetchUrl + '/enums/platforms', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ` + token,
                        }
                    });
                    const data = await response.json();
                    setPlatforms(data);
                } catch (e) {
                    console.log('Error occurred:', e);
                }
            }

            const getTokensState = async () => {
                try {
                    const token = await AsyncStorage.getItem('accessToken');
                    const response = await fetch(fetchUrl + '/tokens/state', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ` + token,
                        }
                    });
                    const data = await response.json();
                    setPlatformsState(data);
                } catch (e) {
                    console.log('Error occurred:', e);
                }
            }

            getData();
            getTokensState();
        }, [fetchUrl, reload])
    );

    const handlePress = async (platform) => {
        const authToken = await AsyncStorage.getItem('accessToken');
        const authUrl = fetchUrl + '/oauth/' + platform + '?token=' + authToken;

        await WebBrowser.openBrowserAsync(authUrl);
    }

    const handleDisconnectService = async (platform) => {
        try {
            const token = await AsyncStorage.getItem('accessToken');
            const response = await fetch(fetchUrl + '/tokens/platform/' + platform, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ` + token,
                }
            });
            await response.json();
            if (response.status === 200) {
                setPlatformsState({...platformsState, [platform]: false});
                setReload(prevReload => !prevReload);
            }
        } catch (e) {
            console.log('Error occurred:', e);
        }
    }

    const handleDisconnect = async () => {
        await AsyncStorage.removeItem('accessToken');
        navigation.navigate('Login');
    }

    return (
        <View style={styles.globalContainer}>
            <View style={styles.pageContentContainer}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Services' Connection</Text>
                    <View style={styles.separator} />
                </View>
                <View style={styles.listPlatformsContainer}>
                {platforms.map((platform, index) => {
                    if (platform === 'OpenMeteo') return null;
                    return (
                        <TouchableOpacity key={index} style={styles.connectServiceButton} onPress={() => platformsState[platform] ? handleDisconnectService(platform) : handlePress(platform)}>
                            <Image source={icons[platform]} style={styles.icon} />
                            <Text style={styles.connectText}>
                                {platformsState[platform] ? 'Se Déconnecter' : 'Se Connecter'}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
                </View>
                <View style={styles.disconnectContainer}>
                    <TouchableOpacity
                        style={styles.disconnectButton}
                        onPress={() => handleDisconnect()}
                    >
                        <Text style={styles.disconnectText}>Déconnexion</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <NavigationBar />
        </View>
    );
}