import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import styles from './CreateAreaPageStyle';
import NavigationBar from '../../NavigationBar/NavigationBar';

export default function CreateAreaPage() {

    const actionList = [
        "Action 1",
        "Action 2",
        "Action 3",
        "Action 4",
        "Action 5",
        "Action 6",
    ]

    const reactionList = [
        "Reaction 1",
        "Reaction 2",
        "Reaction 3",
        "Reaction 4",
        "Reaction 5",
    ]

    return (
        <View style={styles.globalContainer}>
            <View style={styles.pageContainer}>
                <View style={styles.actionContainer}>
                    {actionList.map((action, index) => {
                        return (
                            <TouchableOpacity key={index} style={styles.actionButton}>
                                <Text style={{ fontSize: 20, color: 'white' }}>{action}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
                <View style={styles.areaContainer}></View>
                <View style={styles.reactionContainer}></View>
            </View>
            <NavigationBar />
        </View>
    );
}