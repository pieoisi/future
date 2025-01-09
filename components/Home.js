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

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // 初回レンダリング時のみ実行
  useEffect(() => {
    // ストレージをrefに代入
    (async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("my-key");
        return jsonValue != null ? JSON.parse(jsonValue) : [];
        //resultRefに、ストレージの内容を同期
        const resultRef = useRef(jsonValue);
      } catch (e) {
        // error reading value
        console.log("loading error");
      }
    })();
  }, []);

  function handleStart() {
    const startTime = Date.now();
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
            // 今回のタイマー結果をresultに代入
            const result = { result: time, date: Date.now() };
            // resultRefにresultをpush
            resultRef.current.push(result);
            (async (resultRef) => {
              try {
                const jsonValue = JSON.stringify(resultRef);
                // jsonValueをストレージに代入
              } catch (e) {
                // saving error
                console.log("saving error");
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
            {hours}:{minutes}:{seconds}
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
            onPress={() => navigation.navigate("記録", {storage:storageData})}
          />
        </View>
        <StatusBar style="light" />
      </View>
    </SafeAreaView>
  );
}
