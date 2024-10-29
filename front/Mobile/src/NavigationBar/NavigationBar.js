import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from './NavigationBarStyle';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function NavigationBar() {
    const navigation = useNavigation();
    const route = useRoute();

    return (
        <View styles={styles.screenColor}>
            <View style={styles.navigationBarContainer}>
                <TouchableOpacity style={styles.buttonNavigation} onPress={() => navigation.navigate('Home')}>
                    <Icon
                        name="home" 
                        style={[
                            styles.icon,
                            route.name === 'Home' && styles.iconChoosen
                    ]} />
                    <Text style={[
                            styles.textButton,
                            route.name === 'Home' && styles.textButtonChoosen
                    ]}>
                        Accueil
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonNavigation} onPress={() => navigation.navigate('CreateArea')}>
                    <Icon name="plus-circle"
                        style={[
                            styles.icon,
                            route.name === 'CreateArea' && styles.iconChoosen
                    ]} />
                    <Text
                        style={[
                            styles.textButton,
                            route.name === 'CreateArea' && styles.textButtonChoosen
                    ]}>
                        Créer
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonNavigation} onPress={() => navigation.navigate('Area')}>
                    <Icon name="navicon"
                        style={[
                            styles.icon,
                            route.name === 'Area' && styles.iconChoosen
                    ]} />
                    <Text
                        style={[
                            styles.textButton,
                            route.name === 'Area' && styles.textButtonChoosen
                    ]}>
                        Areas
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonNavigation} onPress={() => navigation.navigate('Connection')}>
                    <Icon name="user"
                        style={[
                            styles.icon,
                            route.name === 'Connection' && styles.iconChoosen
                    ]} />
                    <Text
                        style={[
                            styles.textButton,
                            route.name === 'Connection' && styles.textButtonChoosen
                    ]}>
                        Paramètres
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
