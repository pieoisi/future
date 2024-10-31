import 'react-native-gesture-handler'
import React ,{useEffect} from "react";
import * as Notifications from "expo-notifications";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Home from "./components/Home";
import Settings from "./components/Settings";
import Record from "./components/Record";


const Stack = createStackNavigator();


function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ホーム" component={Home} />
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




const requestPermissionsAsync = async () => {
  const { granted } = await Notifications.getPermissionsAsync();
  if (granted) {
    return;
  }

  await Notifications.requestPermissionsAsync();
};
