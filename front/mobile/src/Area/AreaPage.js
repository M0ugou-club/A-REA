import { View, ScrollView, TouchableOpacity, Image } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import styles from "./AreaPageStyle";
import NavigationBar from "../NavigationBar/NavigationBar";
import AreaComponent from "./AreaComponent/AreaComponent";
import isLogged from "../isLogged";
import { useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFetchUrl } from "../getFetchUrl";

export default function Home() {
  const navigation = useNavigation();
  const [areas, setAreas] = useState([]);
  const [colors, setColors] = useState([]);

  useFocusEffect(
    useCallback(() => {
      isLogged(navigation);
      const fetchAreas = async () => {
        const fetchUrl = await getFetchUrl();
        try {
          const token = await AsyncStorage.getItem("accessToken");
          const response = await fetch(`${fetchUrl}/areas`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          });
          if (response.status === 200) {
            const data = await response.json();
            setAreas(data);
          } else if (response.status === 401) {
            console.log("GET - /areas - Unauthorized");
          }
        } catch (error) {
          console.error("Error fetching areas:", error);
        }
      };
      const fetchColors = async () => {
        const fetchUrl = await getFetchUrl();
        try {
          const token = await AsyncStorage.getItem("accessToken");
          const response = await fetch(
            `${fetchUrl}/enums/platforms_icons`,
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
      fetchAreas();
    }, [navigation])
  );

  function handleAddAreaButton() {
    navigation.navigate("CreateArea");
  }

  return (
    <View style={styles.globalContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.pageContentContainer}>
          <View style={styles.areaComponentContainer}>
            {areas.map((area) => (
              <AreaComponent key={area._id} data={area} colors={colors} />
            ))}
          </View>
        </View>
      </ScrollView>
      <NavigationBar />
    </View>
  );
}
