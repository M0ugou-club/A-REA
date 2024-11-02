import React, { useState, useRef } from "react";
import { Text, View, Image, TouchableOpacity, Animated } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./AreaComponentStyle";

export default function AreaComponent({ data, colors }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerHeight = useRef(new Animated.Value(0)).current;
  const drawerOpacity = useRef(new Animated.Value(0)).current; // Opacity for fade effect

  const platformIcons = {
    Deezer: require("../../../assets/Icons/Deezer.png"),
    Discord: require("../../../assets/Icons/Discord.png"),
    OpenMeteo: require("../../../assets/Icons/OpenMeteo.png"),
    Spotify: require("../../../assets/Icons/Spotify.png"),
    Reddit: require("../../../assets/Icons/Reddit.png"),
    Twitch: require("../../../assets/Icons/Twitch.png"),
    X: require("../../../assets/Icons/X.png"),
    Youtube: require("../../../assets/Icons/Youtube.png"),
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
            source={platformIcons[data.action.platform]}
          />
          <Image
            style={styles.logoReaction}
            source={platformIcons[data.reactions.platform]}
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
