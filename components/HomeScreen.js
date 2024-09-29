
import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles.js";

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Title</Text>
        </View>
        <View style={styles.stopwatchContainer}>
          <Stopwatch style={styles.stopwatch} />
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
            onPress={() => navigation.navigate("記録")}
          >
            <Text style={styles.buttonText}>記録</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="light" />
      </View>
    </SafeAreaView>
  );
}

const Stopwatch = (props) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  function handleStart() {
    const startTime = Date.now() - time; // 経過時間を引いて補正
    intervalRef.current = setInterval(() => {
      setIsRunning(true);
      setTime(Date.now() - startTime);
    }, 10);
  }

  function handlePause() {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  }

  function handleReset() {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
  }

  const milliseconds = `0${(time % 1000) / 10}`.slice(1, 2);
  const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
  const minutes = `0${Math.floor(time / 60000) % 60}`.slice(-2);
  const hours = `0${Math.floor(time / 3600000)}`.slice(-2);

  return (
    <>
      <Text>Stopwatch</Text>
      <Text style={styles.stopwatchText}>
        {hours}:{minutes}:{seconds}:{milliseconds}
      </Text>
      {isRunning ? (
        <TouchableOpacity onPress={handlePause}>
          <Image
            style={styles.stopwatchImage}
            source={{
              uri: "https://placehold.jp/3d4070/ffffff/60x60.png?text=Stopwatch",
            }}
          ></Image>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleStart}>
          <Image
            style={styles.stopwatchImage}
            source={{
              uri: "https://placehold.jp/345454/ffffff/60x60.png?text=Stopwatch",
            }}
          ></Image>
        </TouchableOpacity>
      )}
      <Button onPress={handleReset} title="Reset"></Button>
    </>
  );
};


