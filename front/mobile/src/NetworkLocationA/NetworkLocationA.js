import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Assurez-vous d'importer l'icône
import styles from './NetworkLocationStyleA';
import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function NetworkLocationA() {
    const [networkName, setNetworkName] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    useFocusEffect(
        useCallback(() => {
            setIsVisible(false);
            const fetchUrl = async () => {
                const storedUrl = await AsyncStorage.getItem('fetchUrl');
                if (storedUrl) {
                    setNetworkName(storedUrl);
                }
            };
            fetchUrl();
        }, [])
    );

    const handlePress = async (url) => {
        if (url) {
            try {
                await AsyncStorage.setItem('fetchUrl', url);
            } catch (e) {
                console.log(e);
            }
        } else {
            console.log('Network name is undefined or empty');
        }
    }

    return (
        <View>
            <TouchableOpacity onPress={() => setIsVisible(!isVisible)} style={styles.questionCircleButton}>
                <Icon name="question-circle" style={styles.questionCircle} />
            </TouchableOpacity>
            {isVisible && (
                <View style={styles.popup}>
                    <TextInput
                        placeholder="Network name"
                        style={styles.input}
                        value={networkName}
                        onChangeText={setNetworkName}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handlePress(networkName)}
                    >
                        <Text style={styles.textButton}>Enregistrer</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}