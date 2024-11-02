import isLogged from '../isLogged';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import styles from './HomeStyle';
import NavigationBar from '../NavigationBar/NavigationBar';
import { getFetchUrl } from '../getFetchUrl';
import NetworkLocationA from '../NetworkLocationA/NetworkLocationA';

export default function Home() {

    const navigation = useNavigation();
    const [userInfo, setUserInfo] = useState(null);
    const [fetchUrl, setFetchUrl] = useState('');
    const [servicesNumber, setServicesNumber] = useState(0);
    const [actionsNumber, setActionsNumber] = useState(0);
    const [reactionsNumber, setReactionsNumber] = useState(0);

    useFocusEffect(
        useCallback(() => {
            const initializeFetchUrl = async () => {
                const url = await getFetchUrl();
                setFetchUrl(url);
            };
        
            initializeFetchUrl();
        }, [])
    );

    useFocusEffect(
        useCallback(() => {
            if (!fetchUrl) return;

            isLogged(navigation);
        
            const getUsersInfos = async () => {
                try {
                    const token = await AsyncStorage.getItem('accessToken');
                    const response = await fetch(fetchUrl + "/users", {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + token,
                        },
                    });
                    const data = await response.json();
                    setUserInfo(data);
                } catch (error) {
                    console.error('Error:', error);
                }
            };

            const getServicesNumber = async () => {
                try {
                    setServicesNumber(0);
                    const token = await AsyncStorage.getItem('accessToken');
                    const response = await fetch(fetchUrl + "/enums/platforms", {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + token,
                        },
                    });
                    const data = await response.json();
                    setServicesNumber(data.length);
                } catch (error) {
                    console.error('Error:', error);
                }
            };

            const getActionsNumber = async () => {
                try {
                    setActionsNumber(0);
                    const token = await AsyncStorage.getItem('accessToken');
                    const response = await fetch(fetchUrl + "/enums/actions", {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + token,
                        },
                    });
                    const data = await response.json();
                    let total = 0;
                    if (typeof data === 'object' && data !== null) {
                        for (const platform in data) {
                            if (typeof data[platform] === 'object' && data[platform] !== null) {
                                total += Object.keys(data[platform]).length;
                            } else {
                                console.warn(`data[${platform}] n'est pas un objet ou est invalide :`, data[platform]);
                            }
                        }
                    } else {
                        console.error("Data n'est pas un objet valide :", data);
                        return;
                    }
                    setActionsNumber(total);
                } catch (error) {
                    console.error('Error:', error);
                }
            }

            const getReactionsNumber = async () => {
                try {
                    setReactionsNumber(0);
                    const token = await AsyncStorage.getItem('accessToken');
                    const response = await fetch(fetchUrl + "/enums/reactions", {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + token,
                        },
                    });
                    const data = await response.json();
                    let total = 0;
                    if (typeof data === 'object' && data !== null) {
                        for (const platform in data) {
                            if (typeof data[platform] === 'object' && data[platform] !== null) {
                                total += Object.keys(data[platform]).length;
                            } else {
                                console.warn(`data[${platform}] n'est pas un objet ou est invalide :`, data[platform]);
                            }
                        }
                    } else {
                        console.error("Data n'est pas un objet valide :", data);
                        return;
                    }
                    setReactionsNumber(total);
                } catch (error) {
                    console.error('Error:', error);
                }
            };

            getUsersInfos();
            getServicesNumber();
            getActionsNumber();
            getReactionsNumber();
        }, [navigation, fetchUrl])
    );

    const handleKayzen = () => {
        Linking.openURL('https://www.youtube.com/watch?v=wrFsapf0Enk');
    };

    return (
        <View style={styles.globalContainer}>
            <View style={styles.pageContentContainer}>
                { userInfo &&
                    <View style={styles.userInfo}>
                        <View style={styles.userEmailContainer}>
                            <Text style={styles.nameUserInfo}>{userInfo.name} ({userInfo.username})</Text>
                            <Text style={styles.emailUserInfo}>{userInfo.email}</Text>
                        </View>
                        <View>
                            <Image source={require('../../assets/template-user.png')} style={styles.avatar} />
                        </View>
                    </View>
                }
                <View style={styles.headerInfoContainer}>
                    <View style={styles.headerInfo}>
                        <Text style={styles.headerInfoTitle}>Services</Text>
                        <Text style={styles.headerInfoInfo}>{servicesNumber}</Text>
                    </View>
                    <View style={styles.headerInfo}>
                        <Text style={styles.headerInfoTitle}>Actions</Text>
                        <Text style={styles.headerInfoInfo}>{actionsNumber}</Text>
                    </View>
                    <View style={styles.headerInfo}>
                        <Text style={styles.headerInfoTitle}>Réactions</Text>
                        <Text style={styles.headerInfoInfo}>{reactionsNumber}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={handleKayzen} >
                    <Image source={require('../../assets/kayzenDocu.png')} style={styles.kayzenDocu} />
                </TouchableOpacity>
                <View style={styles.tutorielContainer}>
                    <Text style={styles.tutorielTitle}>Tutoriel</Text>
                </View>
            </View>
            <NavigationBar></NavigationBar>
            <NetworkLocationA />
        </View>
    );
}