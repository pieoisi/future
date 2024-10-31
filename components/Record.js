import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
} from "react-native";
import { Divider, Text, useTheme } from "@rneui/themed";
import { useRoute } from "@react-navigation/native";
import styles from "../styles.js";

const Record = () => {
  const route = useRoute();

  // 受け取ったパラメータを取得
  const dataList = route.params;




  const renderItem = ({ item }) => {
    console.log(item);
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <Text>{item.result}{"\n"}</Text>
          <Text>{item.date}</Text>
        </View>
        <Divider />
      </View>
    );
  };

  return (
    <View>
      <View>
        <FlatList data={dataList} renderItem={renderItem} />
      </View>
      <Text>
        {dataList}
      </Text>
    </View>
  );
};

export default Record;
