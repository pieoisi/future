import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Divider,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "../styles.js";

const Record = () => {
  const [items, setItems] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();

  // 受け取ったパラメータを取得
  const { resultText, dateText } = route.params;
  //ここで毎回ItemListを初期化してしまっているので何度代入しても配列に最新のものしか代入されない
  //最初からasync-storageを参照するようにする
  const ItemList = [];
  ItemList.push({
    result: resultText,
    date: dateText,
  });

  const renderItem = ({ item }) => {
    console.log(item);
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <Text>{item.time}{"\n"}</Text>
          <Text>{item.today}</Text>
        </View>
        <Divider />
      </View>
    );
  };

  return (
    <View>
      <View>
        <FlatList data={ItemList} renderItem={renderItem} />
      </View>
      <Text>
        {resultText}
        {"\n"}
        {dateText}
        {"\n"}
        {JSON.stringify(ItemList)}
        {"\n"}
        {}
      </Text>
    </View>
  );
};

export default Record;
