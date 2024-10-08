import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import styles from './CreateAreaPageStyle';
import NavigationBar from '../../NavigationBar/NavigationBar';

export default function CreateAreaPage() {
    const [selectedAction, setSelectedAction] = useState('');
    const [selectedReaction, setSelectedReaction] = useState('');

    const actionList = [
        "Action 1",
        "Action 2",
        "Action 3",
        "Action 4",
        "Action 5",
        "Action 6",
    ];

    const reactionList = [
        "Reaction 1",
        "Reaction 2",
        "Reaction 3",
        "Reaction 4",
        "Reaction 5",
    ];

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
                        {actionList.map((action, index) => (
                            <TouchableOpacity key={index} style={styles.actionButton} onPress={() => handleActionPress(action)}>
                                <Text style={styles.textButton}>{action}</Text>
                            </TouchableOpacity>
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
                        {reactionList.map((reaction, index) => (
                            <TouchableOpacity key={index} style={styles.actionButton} onPress={() => handleReactionPress(reaction)}>
                                <Text style={styles.textButton}>{reaction}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>
            <NavigationBar />
        </View>
    );
}
