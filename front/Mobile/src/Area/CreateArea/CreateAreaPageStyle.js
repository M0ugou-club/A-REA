import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  globalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: height * 0.1,
  },
  pageContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  areaContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  selectionButton: {
    width: width * 0.4,
    paddingVertical: 15,
    backgroundColor: "#007BFF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  selectionButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  arrowImage: {
    width: 30,
    height: 30,
  },
  createArea: {
    marginTop: 30,
    width: width * 0.9,
    paddingVertical: 15,
    backgroundColor: "#28A745",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  createAreaText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  navbar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
