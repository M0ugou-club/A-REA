import React, { useState, useRef } from "react";
import { Text, View, Image, TouchableOpacity, Animated } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./AreaComponentStyle";

export default function AreaComponent({ data, colors }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerHeight = useRef(new Animated.Value(0)).current;
  const drawerOpacity = useRef(new Animated.Value(0)).current; // Opacity for fade effect

  const platforms = {
    Spotify:
      "https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png",
    Discord:
      "https://cdn.iconscout.com/icon/free/png-256/free-discord-logo-icon-download-in-svg-png-gif-file-formats--social-media-pack-logos-icons-3073764.png?f=webp&w=128",
    Twitter:
      "https://cdn.iconscout.com/icon/free/png-512/free-twitter-logo-icon-download-in-svg-png-gif-file-formats--social-media-logos-pack-icons-189787.png?f=webp&w=512",
  };

  const color = colors[data.action.platform]?.color || "#FFFFFF";
  const areaTitle = `${data.action.platform} & ${data.reactions.platform}`;

  const toggleDrawer = () => {
    if (isDrawerOpen) {
      Animated.parallel([
        Animated.timing(drawerHeight, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(drawerOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(drawerHeight, {
          toValue: 100,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(drawerOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
    setIsDrawerOpen(!isDrawerOpen);
  };

  const description =
    "Action: " + data.action.title + "\nReaction: " + data.reactions.title;

  return (
    <View style={[styles.outerContainer, { backgroundColor: color }]}>
      <View style={[styles.areaContainer, { backgroundColor: color }]}>
        <View style={styles.area}>
          <Image
            style={styles.logoAction}
            source={{ uri: platforms[data.action.platform] }}
          />
          <Image
            style={styles.logoReaction}
            source={{ uri: platforms[data.reactions.platform] }}
          />
          <Text style={styles.areaTitle}>{areaTitle}</Text>
        </View>
        <TouchableOpacity style={styles.arrowbutton} onPress={toggleDrawer}>
          <Icon
            name={isDrawerOpen ? "expand-less" : "expand-more"}
            size={24}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>
      <Animated.View
        style={[
          styles.drawer,
          {
            height: drawerHeight,
            opacity: drawerOpacity,
            backgroundColor: color,
          },
        ]}
      >
        <Text style={styles.descriptionText}>{description}</Text>
      </Animated.View>
    </View>
  );
}
