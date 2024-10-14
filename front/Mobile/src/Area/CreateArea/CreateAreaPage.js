import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useEffect, useState } from 'react';
import styles from './CreateAreaPageStyle';
import NavigationBar from '../../NavigationBar/NavigationBar';
import isLogged from '../../isLogged';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateAreaPage() {
    const [selectedAction, setSelectedAction] = useState('');
    const [selectedReaction, setSelectedReaction] = useState('');
    const [actionList, setActionList] = useState({});
    const [reactionList, setReactionList] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        isLogged(navigation);
        const fetchActions = async () => {
            try {
                const token = await AsyncStorage.getItem('accessToken');
                const response = await fetch('http://212.195.222.157:8000/enums/actions', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    },
                });
                if (response.status === 200) {
                    const data = await response.json();
                    console.log(data);
                    setActionList(data);
                } else {
                    console.error('Error fetching actions:', response.status);
                }
            } catch (error) {
                console.error('Error fetching actions:', error);
            }
        }
        const fetchReactions = async () => {
            try {
                const token = await AsyncStorage.getItem('accessToken');
                const response = await fetch('http://212.195.222.157:8000/enums/reactions', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    },
                });
                if (response.status === 200) {
                    const data = await response.json();
                    console.log(data);
                    setReactionList(data);
                } else {
                    console.error('Error fetching actions:', response.status);
                }
            } catch (error) {
                console.error('Error fetching actions:', error);
            }
        }
        fetchActions();
        fetchReactions();
    }, [navigation]);

    const handleActionPress = (action) => {
        setSelectedAction(action);
    };

    const handleReactionPress = (reaction) => {
        setSelectedReaction(reaction);
    };

    return (
        <View style={styles.globalContainer}>
            <View style={styles.pageContainer}>
                <View style={styles.actionContainerWrapper}>
                    <ScrollView contentContainerStyle={styles.actionContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
                        {Object.keys(actionList).map((platform) => (
                            Object.keys(actionList[platform]).map((actionKey, index) => (
                                <TouchableOpacity key={`${platform}-${index}`} style={styles.actionButton} onPress={() => handleActionPress(actionList[platform][actionKey])}>
                                    <Text style={styles.textButton}>{actionList[platform][actionKey]}</Text>
                                </TouchableOpacity>
                            ))
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.areaContainer}>
                    <View>
                        {selectedAction && (
                            <TouchableOpacity style={styles.selectedActionButton}>
                                <Text style={styles.textButton}>{selectedAction}</Text>
                            </TouchableOpacity>
                        )}
                        <Image source={require('../../../assets/arrow.png')} style={styles.arrowImage} />
                        {selectedReaction && (
                            <TouchableOpacity style={styles.selectedReactionButton}>
                                <Text style={styles.textButton}>{selectedReaction}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <TouchableOpacity style={styles.createArea}>
                        <Text style={styles.textButton}>Create A-Rea</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.reactionContainerWrapper}>
                    <ScrollView contentContainerStyle={styles.reactionContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
                        {Object.keys(reactionList).map((platform) => (
                            Object.keys(reactionList[platform]).map((reactionKey, index) => (
                                <TouchableOpacity key={`${platform}-${index}`} style={styles.actionButton} onPress={() => handleReactionPress(reactionList[platform][reactionKey])}>
                                    <Text style={styles.textButton}>{reactionList[platform][reactionKey]}</Text>
                                </TouchableOpacity>
                            ))
                        ))}
                    </ScrollView>
                </View>
            </View>
            <NavigationBar />
        </View>
    );
}