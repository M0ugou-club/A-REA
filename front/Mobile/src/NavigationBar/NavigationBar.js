import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from './NavigationBarStyle';
import { useNavigation } from '@react-navigation/native';
import LoginPopup from './LoginPopup/LoginPopup';

export default function NavigationBar() {
    const navigation = useNavigation();
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    return (
        <View>
            {isPopupVisible && <LoginPopup />}
            <View>
                <View style={styles.navigationBarContainer}>
                    <TouchableOpacity style={styles.navigationButton} onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.textNavigationButton}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navigationButton} onPress={() => navigation.navigate('Area')}>
                        <Text style={styles.textNavigationButton}>A-Rea</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.userButton} onPress={togglePopup}>
                        <Image source={require('../../assets/template-user.png')} style={styles.userButtonImage} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}