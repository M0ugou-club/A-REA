import { Text, View, TouchableOpacity} from 'react-native';
import styles from './HomeStyle';
import NavigationBar from '../NavigationBar/NavigationBar'
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import '../isLogged';
import isLogged from '../isLogged';

export default function Home() {

    const [token, setToken] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        isLogged(navigation);
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
