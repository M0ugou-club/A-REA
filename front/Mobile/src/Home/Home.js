import isLogged from '../isLogged';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import styles from './HomeStyle';
import NavigationBar from '../NavigationBar/NavigationBar';

export default function Home() {

    const navigation = useNavigation();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        isLogged(navigation);
    
        const getUsersInfos = async () => {
            try {
                const token = await AsyncStorage.getItem('accessToken');
                const response = await fetch("http://inox-qcb.fr:8000/users", {
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
        getUsersInfos();
    }, [navigation]);

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
                <TouchableOpacity onPress={handleKayzen} >
                    <Image source={require('../../assets/kayzenDocu.png')} style={styles.kayzenDocu} />
                </TouchableOpacity>
                <View style={styles.tutorielContainer}>
                    <Text style={styles.tutorielTitle}>Tutoriel</Text>
                </View>
            </View>
            <NavigationBar></NavigationBar>
        </View>
    );
}