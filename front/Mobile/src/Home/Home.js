import { Text, View, TouchableOpacity} from 'react-native';
import styles from './HomeStyle';
import NavigationBar from '../NavigationBar/NavigationBar'
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {

    const [token, setToken] = useState('');

    useEffect(() => {
        async function checkToken() {
            const token = await AsyncStorage.getItem('accessToken');
            if (token) {
                setToken(token);
            }
        }
        checkToken();
    });

    return (
        <View style={styles.globalContainer}>
            <View style={styles.pageContentContainer}>
                {token ? <Text>Token: {token}</Text> : null}
            </View>
            <NavigationBar></NavigationBar>
        </View>
    );
}
