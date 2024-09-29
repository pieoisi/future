import { StyleSheet } from "react-native";
export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f8ff",
  },
  container: {
    flex: 1,
    paddingTop: 20,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 70,
  },

  stopwatchImage: {
    width: 60,
    height: 60,
  },
  titleContainer: {
    flex: 0.2,
    backgroundColor: "#fffacd",

    alignItems: "center",
  },
  stopwatchContainer: {
    backgroundColor: "#F0F0F0",
    alignItems: "center",
  },
  stopwatchText: {
    fontFamily: "Open Sans Light",
  },
  buttonContainer: {
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 100,
  },
  button: {
    backgroundColor: "#ffdab9",
    paddingHorizontal: 30,
    paddingVertical: 22,
    margin: 10,
    borderRadius: 18,
  },
  buttonText: {
    color: "white",
    fontWeight: "900",
    fontSize: 24,
  },
  modal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0, 0.8)",
    alignItems: "center",
    justifyContent: "center",
  },
});
