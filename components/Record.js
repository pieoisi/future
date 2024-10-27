import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles.js";

const Record = () => {
  const [items, setItems] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();

  // 受け取ったパラメータを取得
  const { time, when } = route.params || {};

  

   const renderItem = ({ item }) => (
     <View style={styles.itemContainer}>
       <Text style={styles.itemText}>
         {item.item} ,{item.date}
       </Text>
     </View>
   );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Record</Text>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};



export default Record;
