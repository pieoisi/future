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
  const { item, date } = route.params || {};

  //loadItems......今あるItemを取得している
  useEffect(() => {
    const loadItems = async () => {
      try {
        const savedItems = await AsyncStorage.getItem("items");
        if (savedItems !== null) {
          setItems(JSON.parse(savedItems));
        }
      } catch (e) {
        console.error("Failed to load items from storage.");
      }
    };
    loadItems();
  }, []);


  //recordがfocusされたとき、addItem
  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      if (item) {
        addItem(item);
      }
      if (date) {
        addItem(date); // todayもアイテムとして追加
      }
    });

    return () => {
      if (focusListener) {
        focusListener();
      }
    };
  }, [navigation, item, date]);

 const addItem = async (newItem, today) => {
   setItems((savedItems) => {
     const newItems = [...savedItems, { item: newItem, date: today }];

     saveItems(newItems);
     return newItems;
   });
 };

  const saveItems = async (itemsToSave) => {
    try {
      await AsyncStorage.setItem("items", JSON.stringify(itemsToSave));
    } catch (e) {
      console.error("Failed to save items to storage.");
    }
  };

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
