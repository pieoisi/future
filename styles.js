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
  titleImage: {
    width: 400,
    height: 100,
  },
  settingsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  marginView: {
    margin: 10,
  },
  explainText: {
    fontSize: 18,
    fontFamily: "Hiragino Kaku Gothic",
  },
  stopwatchImage: {
    width: 60,
    height: 60,
  },
  titleContainer: {
    flex: 0.2,
    /*backgroundColor: "#fffacd",*/

    alignItems: "center",
  },
  stopwatchContainer: {
    /*backgroundColor: "#F0F0F0",*/
    alignItems: "center",
  },
  stopwatchText: {
    fontSize: 50,
    fontFamily: "Hiragino Kaku Gothic Pro",
    marginBottom: 10,
  },
  buttonContainer: {
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 100,
  },
  titleText: {
    fontSize: 30,
    fontFamily: "Hiragino Kaku Gothic",
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
  divider: {
    height: 1, // 区切り線の高さ
    width: "100%", // 幅を100%にすることで画面全体に表示
    backgroundColor: "#ccc", // 線の色を指定
    marginVertical: 10, // 上下に少し余白を入れる（任意）
  },
});
