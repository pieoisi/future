import React from "react";
import { StyleSheet, Button, Text, View, SafeAreaView } from "react-native";
import styles from "../styles.js";

export default class Record extends React.Component {
  render() {
    return (
      <SafeAreaView>

        <View style={styles.container}>
          <Text>Record</Text>
        </View>
      </SafeAreaView>
    );
  }
}
