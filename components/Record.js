import React, { useState, useEffect} from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList, Divider } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "../styles.js";

const Record = () => {
  const [items, setItems] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();

  // 受け取ったパラメータを取得
  const { result, today } = route.params || {};

  const ItemList = [];
  ItemList.push({
    time: result,
    date: today,
  })


   const renderItem = ({item}) =>{
    console.log(item);
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <Text>{item.time}</Text>
          <Text>{item.today}</Text>
        </View>
        <Divider />
      </View>
    );
   }

  return (
    <View>
      {/* 1 */}
      <FlatList data={ItemList} renderItem={renderItem} />
    </View>
  );
};



export default Record;
