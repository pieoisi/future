import 'react-native-gesture-handler'
import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./components/HomeScreen";
import Settings from "./components/Settings";
import Record from "./components/Record";


// 正しい構文であることを確認してください
const Stack = createStackNavigator();


function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ホーム" component={HomeScreen} />
      <Stack.Screen name="設定" component={Settings} />
      <Stack.Screen name="記録" component={Record} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}




