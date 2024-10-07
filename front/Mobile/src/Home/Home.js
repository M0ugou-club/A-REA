import { Text, View, TouchableOpacity} from 'react-native';
import styles from './HomeStyle';
import NavigationBar from '../NavigationBar/NavigationBar'

export default function Home() {
    return (
        <View style={styles.globalContainer}>
            <View style={styles.pageContentContainer}>
                <Text>Home Page</Text>
            </View>
            <NavigationBar></NavigationBar>
        </View>
    );
}
