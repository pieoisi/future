import React, { useState, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Button,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles.js";

export default function Home() {
  const navigation = useNavigation();
  const [stateData, setStateData] = useState([]);

  //storageからデータを読み込み、stateDataに代入
  (async () => {
    try {
      console.log("l25 in-try");
      // 何もしない
      const value = await AsyncStorage.getItem("my-key");
      if (value !== null) {
        await setStateData(JSON.parse(value));
        console.log("l29 success");
      } else {
        console.log("value is null");
      }
    } catch (e) {
      // error reading value
      console.log("l32" + e.message);
    }
  })();

  const [resultText, setResultText] = useState();
  const [dateText, setDateText] = useState();
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  function handleStart() {
    const startTime = Date.now() - time;
    intervalRef.current = setInterval(() => {
      setIsRunning(true);
      setTime(Date.now() - startTime);
    }, 10);
  }

  function handlePause() {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    if (parseInt(seconds, 10) < 5) {
      Alert.alert(
        "現在のタイムは5分以下です",
        "5分以下だと記録に残りません。終了してよろしいですか？",
        [
          {
            text: "NO",
            onPress: handleStart,
          },
          {
            text: "OK",
            onPress: () => {
              clearInterval(intervalRef.current);
              setTime(0);
            },
          },
        ]
      );
    } else {
      Alert.alert("タイマーを終了しますか？", "記録に残ります。", [
        {
          text: "NO",
          onPress: handleStart,
        },
        {
          text: "OK",
          onPress: () => {
            setResultText((prevState) => {
              return (prevState = `${hours}:${minutes}:${seconds}:${milliseconds}`);
            });
            setDateText((prevState) => {
              return (prevState = Date(time));
            });
            //setStateDataで{resultTextとDateTextをresult dateの中に代入したもの}をstateDataに追加

            setStateData((prevList) => {
              return [...prevList, { result: resultText, date: dateText }];
            });

            (async (stateData) => {
              try {
                const jsonSaveValue = JSON.stringify(stateData);
                await AsyncStorage.setItem("my-key", jsonSaveValue);
                console.log("storage-save success");
              } catch (e) {
                // saving error
                console.log("l83 " + e.message);
              }
            })();

            Alert.alert("お疲れさまでした！", Date(time));
            clearInterval(intervalRef.current);
            setTime(0);
          },
        },
      ]);
    }
  }

  function handleReset() {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
  }

  const milliseconds = `00${Math.floor(time)}`.slice(-3, -1);
  const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
  const minutes = `0${Math.floor(time / 60000) % 60}`.slice(-2);
  const hours = `0${Math.floor(time / 3600000)}`.slice(-2);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Image
            source={require("../assets/AcYXlgqfOd9m7DH1727664233_1727664266.png")}
            style={styles.titleImage}
          ></Image>
        </View>
        <View style={styles.stopwatchContainer}>
          <Text style={styles.stopwatchText}>
            {hours}:{minutes}:{seconds}:{milliseconds}
          </Text>
          {isRunning ? (
            <Button
              onPress={handlePause}
              title="Pause"
              style={styles.buttonText}
            ></Button>
          ) : (
            <Button onPress={handleStart} title="Start"></Button>
          )}
          <Button onPress={handleReset} title="Reset"></Button>
          <Text></Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="設定"
            style={styles.button}
            onPress={() => navigation.navigate("設定")}
          />
          <Button
            title="記録"
            style={styles.button}
            onPress={() => navigation.navigate("記録", stateData)}
          />
        </View>
        <StatusBar style="light" />
      </View>
    </SafeAreaView>
  );
}
