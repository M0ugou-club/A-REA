import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import styles from "./ReactionListPageStyle";
import { getFetchUrl } from "../../../getFetchUrl";

const platformIcons = {
  Deezer: require("../../../../assets/Icons/Deezer.png"),
  Discord: require("../../../../assets/Icons/Discord.png"),
  OpenMeteo: require("../../../../assets/Icons/OpenMeteo.png"),
  Spotify: require("../../../../assets/Icons/Spotify.png"),
  Reddit: require("../../../../assets/Icons/Reddit.png"),
  Twitch: require("../../../../assets/Icons/Twitch.png"),
  X: require("../../../../assets/Icons/X.png"),
  Youtube: require("../../../../assets/Icons/Youtube.png"),
};

export default function ReactionListPage() {
  const [reactionList, setReactionList] = useState({});
  const [colors, setColors] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    const fetchReactions = async () => {
      const fetchUrl = await getFetchUrl();
      const token = await AsyncStorage.getItem("accessToken");
      try {
        const response = await fetch(`${fetchUrl}/enums/reactions`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          setReactionList(data);
        } else {
          console.error("Error fetching reactions:", response.status);
        }
      } catch (error) {
        console.error("Error fetching reactions:", error);
      }
    };

    const fetchColors = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        const response = await fetch(
          "http://inox-qcb.fr:8000/enums/platforms_icons",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          setColors(data);
        } else if (response.status === 401) {
          console.log("GET - /colors - Unauthorized");
        }
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    };

    fetchColors();
    fetchReactions();
  }, []);

  const handleReactionSelect = (reaction, platform, reactionKey) => {
    navigation.navigate("CreateArea", {
      selectedReaction: {
        reaction,
        platform,
        reactionKey,
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={[styles.container]}>
      {Object.keys(reactionList).map((platform) =>
        Object.keys(reactionList[platform]).map((reactionKey, index) => (
          <TouchableOpacity
            key={`${platform}-${reactionKey}`}
            style={[
              styles.reactionButton,
              { backgroundColor: colors[platform]?.color || "#124" },
            ]}
            onPress={() =>
              handleReactionSelect(
                reactionList[platform][reactionKey],
                platform,
                reactionKey
              )
            }
          >
            <View
              style={[
                styles.iconBackground,
                { backgroundColor: platform === "X" || platform === "Reddit" ? "#FFF" : "#000" }, // Conditional background color
              ]}
            >
              <Image
                source={platformIcons[platform]}
                style={styles.platformIcon}
              />
            </View>
            <Text style={styles.textButton}>{reactionList[platform][reactionKey]}</Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}
