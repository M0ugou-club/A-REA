import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 10,
  },
  reactionButton: {
    width: width * 0.9,
    paddingVertical: 20,
    paddingLeft: 15,
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    elevation: 3,
  },
  iconBackground: {
    borderRadius: 20,
    padding: 5,
    marginRight: 10,
  },
  platformIcon: {
    width: 30,
    height: 30,
  },
  textButton: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    flexShrink: 1,
  },
});