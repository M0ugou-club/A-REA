import { Text, View, TouchableOpacity} from 'react-native';
import styles from './AreaStyle';
import NavigationBar from '../NavigationBar/NavigationBar'

export default function Home() {
    return (
        <View style={styles.globalContainer}>
            <View style={styles.pageContentContainer}>
                <View>
                </View>
            </View>
            <NavigationBar></NavigationBar>
        </View>
    );
}
