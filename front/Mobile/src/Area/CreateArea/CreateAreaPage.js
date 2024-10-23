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
    const [area, setArea] = useState({
        area_title: "",
        area_description: "",
        action_name: "",
        action_description: "",
        action_type: "",
        action_platform: "",
        reaction_name: "",
        reaction_description: "",
        reaction_type: "",
        reaction_platform: "",
    });
    const navigation = useNavigation();

    useEffect(() => {
        isLogged(navigation);
        const fetchActions = async () => {
            try {
                const token = await AsyncStorage.getItem('accessToken');
                const response = await fetch('http://inox-qcb.fr:8000/enums/actions', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + token,
                    },
                });
                if (response.status === 200) {
                    const data = await response.json();
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
                const response = await fetch('http://inox-qcb.fr:8000/enums/reactions', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + token,
                    },
                });
                if (response.status === 200) {
                    const data = await response.json();
                    setReactionList(data);
                } else {
                    console.error('Error fetching reactions:', response.status);
                }
            } catch (error) {
                console.error('Error fetching reactions:', error);
            }
        }
        fetchActions();
        fetchReactions();
    }, [navigation]);

    const handleActionPress = (action, platform, actionKey) => {
        setSelectedAction(action);
        setArea(prevArea => ({
            ...prevArea,
            action_name: action,
            action_type: actionKey,
            action_platform: platform,
        }));
        console.log(area);
    };

    const handleReactionPress = (reaction, platform, reactionKey) => {
        setSelectedReaction(reaction);
        setArea(prevArea => ({
            ...prevArea,
            reaction_name: reaction,
            reaction_type: reactionKey,
            reaction_platform: platform,
        }));
        console.log(area);
    };

    function handleCreateArea() {
        navigation.navigate('ChooseAreaName', { area });
    }

    return (
        <View style={styles.globalContainer}>
            <View style={styles.pageContainer}>
                <View style={styles.actionContainerWrapper}>
                    <ScrollView contentContainerStyle={styles.actionContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
                        {Object.keys(actionList).map((platform) => (
                            Object.keys(actionList[platform]).map((actionKey, index) => (
                                <TouchableOpacity key={`${platform}-${index}`} style={styles.actionButton} onPress={() => handleActionPress(actionList[platform][actionKey], platform, actionKey)}>
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
                    <TouchableOpacity style={styles.createArea} onPress={handleCreateArea}>
                        <Text style={styles.textButton}>Create A-Rea</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.reactionContainerWrapper}>
                    <ScrollView contentContainerStyle={styles.reactionContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
                        {Object.keys(reactionList).map((platform) => (
                            Object.keys(reactionList[platform]).map((reactionKey, index) => (
                                <TouchableOpacity key={`${platform}-${index}`} style={styles.actionButton} onPress={() => handleReactionPress(reactionList[platform][reactionKey], platform, reactionKey)}>
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