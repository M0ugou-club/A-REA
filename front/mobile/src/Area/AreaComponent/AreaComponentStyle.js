import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  outerContainer: {
    alignItems: "center",
    marginBottom: height * 0.02,
    borderRadius: width * 0.05,
  },

  areaContainer: {
    display: "flex",
    padding: width * 0.05,
    paddingTop: height * 0.01,
    paddingBottom: height * 0.01,
    paddingLeft: width * 0.1,
    width: width * 0.9,
    height: height * 0.1,
    borderRadius: width * 0.05,
    gap: height * 0.02,
    justifyContent: "center",
    flexDirection: "row",
    elevation: 5,
  },

  logoAction: {
    width: width * 0.1,
    height: width * 0.1,
    marginLeft: -width * 0.05,
  },

  logoReaction: {
    width: width * 0.1,
    height: width * 0.1,
    marginLeft: "-7%",
    marginBottom: "-7%",
    borderRadius: width,
  },

  arrowImage: {
    resizeMode: "contain",
    width: width * 0.30,
    paddingLeft: width * 0.05,
  },

  area: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    paddingLeft: width * 0.05,
  },

  areaTitle: {
    fontFamily: "Nexa",
    fontSize: width * 0.05,
    marginLeft: width * 0.05,
    color: "#FFFFFF",
  },

  drawer: {
    overflow: "hidden",
    width: width * 0.9,
    borderRadius: width * 0.05,
    padding: width * 0.05,
    paddingTop: height * 0.02,
    paddingBottom: height * 0.02,
    marginTop: height * 0.01,
  },

  descriptionText: {
    fontFamily: "Nexa",
    fontSize: width * 0.04,
    color: "#FFFFFF",
  }
});
