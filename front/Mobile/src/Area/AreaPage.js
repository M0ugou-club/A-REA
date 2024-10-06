import { View, ScrollView } from 'react-native';
import styles from './AreaPageStyle';
import NavigationBar from '../NavigationBar/NavigationBar';
import AreaComponent from './AreaComponent/AreaComponent';

export default function Home() {
    return (
        <View style={styles.globalContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.pageContentContainer}>
                    <AreaComponent />
                    <AreaComponent />
                    <AreaComponent />
                    <AreaComponent />
                    <AreaComponent />
                    <AreaComponent />
                    <AreaComponent />
                </View>
            </ScrollView>
            <NavigationBar />
        </View>
    );
}