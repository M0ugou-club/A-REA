import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './AreaPageStyle';
import NavigationBar from '../NavigationBar/NavigationBar';
import AreaComponent from './AreaComponent/AreaComponent';

export default function Home() {

    const navigation = useNavigation();

    return (
        <View style={styles.globalContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.pageContentContainer}>
                    <View style={styles.areaComponentContainer}>
                        <AreaComponent />
                        <AreaComponent />
                        <AreaComponent />
                        <AreaComponent />
                        <AreaComponent />
                        <AreaComponent />
                        <AreaComponent />
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity
                style={styles.addAreaButtonContainer}
                onPress={() => navigation.navigate('CreateArea')}
            >
                <Image style={styles.addAreaButton} source={require('../../assets/add.png')} />
            </TouchableOpacity>
            <NavigationBar />
        </View>
    );
}