import React, { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles.js";

export default function Home() {
  const navigation = useNavigation();

  const [result, setResult] = useState();
  const [date, setDate] = useState();
  const [dataList, setDataList] = useState([]);


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
    //今はテスト用に5秒以下にしている
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
            setResult(`${hours}:${minutes}:${seconds}:${milliseconds}`);
            setDate(Date(time));
            setDataList((prevResults) => {
              return [...prevResults, { result: result, date:date }]
            });
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
          <Text>タイトルテキスト</Text>
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
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("設定")}
          >
            <Text style={styles.buttonText}>設定</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("記録", dataList
            )}
          >
            <Text style={styles.buttonText}>記録</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="light" />
      </View>
    </SafeAreaView>
  );
}
