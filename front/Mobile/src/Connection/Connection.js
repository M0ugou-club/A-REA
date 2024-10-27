import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from './ConnectionStyle';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationBar from '../NavigationBar/NavigationBar';
import * as WebBrowser from 'expo-web-browser';

export default function Connection() {

    const [platforms, setPlatforms] = useState([]);

    const icons = {
        Spotify: require('../../assets/Icons/Spotify.png'),
        Deezer: require('../../assets/Icons/Deezer.png'),
        Youtube: require('../../assets/Icons/Youtube.png'),
        Discord: require('../../assets/Icons/Discord.png'),
        Reddit: require('../../assets/Icons/Reddit.png'),
        X: require('../../assets/Icons/X.png'),
        OpenMeteo: require('../../assets/Icons/OpenMeteo.png'),
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const token = await AsyncStorage.getItem('accessToken');
                const response = await fetch('http://inox-qcb.fr:8000/enums/platforms', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ` + token,
                    }
                });
                const data = await response.json();
                console.log(data);
                setPlatforms(data);
            } catch (e) {
                console.log(e);
            }
        }
        getData();
    }, []);

    const handlePress = async (platform) => {
        const authToken = await AsyncStorage.getItem('accessToken');
        const authUrl = 'http://inox-qcb.fr:8000/oauth/' + platform + '?token=' + authToken;

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
