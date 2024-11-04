import React, { useState } from "react";
import { View, SafeAreaView, FlatList } from "react-native";
import { ListItem, Divider } from "@rneui/themed";
import { useRoute } from "@react-navigation/native";
import styles from "../styles.js";

const Record = () => {
  const route = useRoute();
  // Get received parameters
  const stateData = route.params;

  const [dataList, setDataList] = useState();

  setDataList(stateData);

  renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.result}</ListItem.Title>
        <ListItem.Subtitle>{item.date}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
      <Divider />
    </ListItem>
  );

  return (
    <SafeAreaView>
      <View>
        <FlatList data={dataList} renderItem={renderItem} />
      </View>
    </SafeAreaView>
  );
};

export default Record;
