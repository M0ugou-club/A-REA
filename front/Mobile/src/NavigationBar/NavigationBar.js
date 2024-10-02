import { Text, View, TouchableOpacity} from 'react-native';
import styles from './NavigationBarStyle';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const navigation = useNavigation();

    return (
        <View style={styles.navigationBarContainer}>
            <TouchableOpacity style={styles.navigationButton} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.textNavigationButton}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navigationButton} onPress={() => navigation.navigate('Area')}>
                <Text style={styles.textNavigationButton}>A-Rea</Text>
            </TouchableOpacity>
        </View>
    );
}
