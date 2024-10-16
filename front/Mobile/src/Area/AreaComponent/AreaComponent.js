import React, { useState } from 'react';
import { Text, View, Image, Switch } from 'react-native';
import styles from './AreaComponentStyle';

export default function AreaComponent({ data }) {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const platforms = {
        Spotify: 'https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png',
        Discord: 'https://cdn.iconscout.com/icon/free/png-256/free-discord-logo-icon-download-in-svg-png-gif-file-formats--social-media-pack-logos-icons-3073764.png?f=webp&w=128',
        Twitter: 'https://cdn.iconscout.com/icon/free/png-512/free-twitter-logo-icon-download-in-svg-png-gif-file-formats--social-media-logos-pack-icons-189787.png?f=webp&w=512'
    };

    return (
        <View style={styles.areaContainer}>
            <View style={styles.areaHeader}>
                <Text style={styles.areaTitle}>{data.title}</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#ffffff" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    style={styles.switch}
                />
            </View>
            <View style={styles.area}>
                <Image style={styles.logoApi} source={{ uri: platforms[data.action.platform] }} />
                <Image style={styles.arrowImage} source={ require('../../../assets/arrow.png') } />
                <Image style={styles.logoApi} source={{ uri: platforms[data.reactions.platform] }} />
            </View>
        </View>
    );
}