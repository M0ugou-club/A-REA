import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import styles from "./ActionListPageStyle";
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

export default function ActionListPage() {
  const [actionList, setActionList] = useState({});
  const [colors, setColors] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    const fetchActions = async () => {
      const fetchUrl = await getFetchUrl();
      const token = await AsyncStorage.getItem("accessToken");
      try {
        const response = await fetch(`${fetchUrl}/enums/actions`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          setActionList(data);
        } else {
          console.error("Error fetching actions:", response.status);
        }
      } catch (error) {
        console.error("Error fetching actions:", error);
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
    fetchActions();
  }, []);

  const handleActionSelect = (action, platform, actionKey) => {
    navigation.navigate("CreateArea", {
      selectedAction: {
        action,
        platform,
        actionKey,
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Object.keys(actionList).map((platform) =>
        Object.keys(actionList[platform]).map((actionKey, index) => (
          <TouchableOpacity
            key={`${platform}-${index}`}
            style={[
              styles.actionButton,
              { backgroundColor: colors[platform]?.color || "#124" },
            ]}
            onPress={() =>
              handleActionSelect(
                actionList[platform][actionKey],
                platform,
                actionKey
              )
            }
          >
            <View
              style={[
                styles.iconBackground,
                {
                  backgroundColor:
                    platform === "X" || platform === "Reddit" ? "#FFF" : "#000",
                },
              ]}
            >
              <Image
                source={platformIcons[platform]}
                style={styles.platformIcon}
              />
            </View>
            <Text style={styles.textButton}>
              {actionList[platform][actionKey]}
            </Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}
