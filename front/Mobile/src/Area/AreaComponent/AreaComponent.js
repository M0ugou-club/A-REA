import React, { useState } from 'react';
import { Text, View, Image, Switch } from 'react-native';
import styles from './AreaComponentStyle';

export default function AreaComponent() {

    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={styles.areaContainer}>
            <View style={styles.areaHeader}>
                <Text style={styles.areaTitle}>Area 1</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#ffffff" : "#"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    style={styles.switch}
                />
            </View>
            <View style={styles.area}>
                <Image style={styles.logoApi} source={{ uri: 'https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png' }} />
                <Image style={styles.arrowImage} source={ require('../../../assets/arrow.png') } />
                <Image style={styles.logoApi} source={{ uri: 'https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png' }} />
            </View>
        </View>
    );
}