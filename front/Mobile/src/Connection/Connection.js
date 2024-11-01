import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from './ConnectionStyle';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationBar from '../NavigationBar/NavigationBar';
import * as WebBrowser from 'expo-web-browser';
import { TextInput } from 'react-native-gesture-handler';

export default function Connection() {

    const [platforms, setPlatforms] = useState([]);
    const [fetchUrl, setFetchUrl] = useState('');
    const [reload, setReload] = useState(false);

    const icons = {
        Spotify: require('../../assets/Icons/Spotify.png'),
        Youtube: require('../../assets/Icons/Youtube.png'),
        Reddit: require('../../assets/Icons/Reddit.png'),
        X: require('../../assets/Icons/X.png'),
        OpenMeteo: require('../../assets/Icons/OpenMeteo.png'),
        Twitch: require('../../assets/Icons/Twitch.png'),
    };

    useEffect(() => {
        const getFetchUrl = async () => {
            try {
                const url = await AsyncStorage.getItem('fetchUrl');
                setFetchUrl(url);
            } catch (e) {
                console.log(e);
            }
        };
        getFetchUrl();
    }, []);

    useEffect(() => {
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
        getData();
    }, [fetchUrl, reload]);

    const handleUrlChange = async (url) => {
        try {
            await AsyncStorage.setItem('fetchUrl', url);
            setFetchUrl(url);
            setReload(prev => !prev);
        } catch (e) {
            console.log(e);
        }
    }

    const handlePress = async (platform) => {
        const authToken = await AsyncStorage.getItem('accessToken');
        const authUrl = fetchUrl + '/oauth/' + platform + '?token=' + authToken;

        let result = await WebBrowser.openBrowserAsync(authUrl);
    }

    return (
        <View style={styles.globalContainer}>
            <View style={styles.pageContentContainer}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Services' Connection</Text>
                    <View style={styles.separator} />
                </View>
                <View style={styles.listPlatformsContainer}>
                {platforms.map((platform, index) => (
                    <TouchableOpacity key={index} style={styles.connectServiceButton} onPress={() => handlePress(platform)}>
                        <Image source={icons[platform]} style={styles.icon} />
                        <Text style={styles.connectText}>Se Connecter</Text>
                    </TouchableOpacity>
                ))}
                </View>
            </View>
            <NavigationBar />
        </View>
    );
}