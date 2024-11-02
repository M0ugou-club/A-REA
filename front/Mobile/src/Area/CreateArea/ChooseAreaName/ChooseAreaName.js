import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useCallback, useState } from 'react';
import styles from './ChooseAreaNameStyle';
import NavigationBar from '../../../NavigationBar/NavigationBar';
import isLogged from '../../../isLogged';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import { getFetchUrl } from '../../../getFetchUrl';

export default function ChooseAreaName() {
    const navigation = useNavigation();
    const route = useRoute();
    const { area } = route.params;
    const [areaName, setAreaName] = useState('');
    const [areaDescription, setAreaDescription] = useState('');
    const [fetchUrl, setFetchUrl] = useState('');

    useFocusEffect(
        useCallback(() => {
            const initializeFetchUrl = async () => {
                const url = await getFetchUrl();
                setFetchUrl(url);
            };
        
            initializeFetchUrl();
            isLogged(navigation);
        }, [navigation])
    );

    async function handleFinish() {
        const token = await AsyncStorage.getItem('accessToken');
        try {
            const response = await fetch(fetchUrl + '/areas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token,
                },
                body: JSON.stringify({
                    area_title: areaName,
                    area_description: areaDescription,
                    action_name: area.action_name,
                    action_description: area.action_description,
                    action_type: area.action_type,
                    action_platform: area.action_platform,
                    reaction_name: area.reaction_name,
                    reaction_description: area.reaction_description,
                    reaction_type: area.reaction_type,
                    reaction_platform: area.reaction_platform,
                }),
            });
            if (response.status === 200) {
                navigation.navigate('Area');
            } else {
                alert('Error creating area:', response.status);
                console.log('Error creating area:', response.status);
            }
        } catch (error) {
            console.error('Error creating area:', error);
        }
    }

    return(
        <View style={styles.globalContainer}>
            <View style={styles.pageContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder='Choose a name'
                    onChangeText={setAreaName}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Choose a description'
                    onChangeText={setAreaDescription}
                />
                <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
                    <Text style={styles.finishButtonText}>Finish</Text>
                </TouchableOpacity>
            </View>
            <NavigationBar />
        </View>
    );
}