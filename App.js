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

export default function App() {
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
          <TouchableOpacity style={styles.button} onPress={this.pressSettings}>
            <Text style={styles.buttonText}>設定</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
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
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
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

  const milliseconds = `0${(time % 1000) / 10}`.slice(-2);
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f8ff",
  },
  container: {
    flex: 1,
    paddingTop: 20,
  },
  titleText: {
    fontSize: 50,
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
  stopwatchText: {},
  buttonContainer: {
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 100,
  },
  button: {
    backgroundColor: "#ffdab9",
    paddingHorizontal: 20,
    paddingVertical: 15,
    margin: 10,
    borderRadius: 13,
  },
  buttonText: {
    color: "white",
    fontWeight: "900",
    fontSize: 16,
  },
});
