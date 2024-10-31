import 'react-native-gesture-handler'
import React ,{useEffect} from "react";
import * as Notifications from "expo-notifications";
import * as SQLite from "expo-sqlite";
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
  React.useEffect(() => {
    requestPermissionsAsync();
  });
  useEffect(() => {
    async function insertData() {
      try {
        const db = await SQLite.openDatabaseAsync("test.db");
        await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
        INSERT INTO test (value, intValue) VALUES ('test1', 123);
        INSERT INTO test (value, intValue) VALUES ('test2', 456);
        INSERT INTO test (value, intValue) VALUES ('test3', 789);
        `);
        const rows = await db.getAllAsync("SELECT * FROM test");
        console.log("rows", rows);
      } catch (error) {
        console.log("Error:", error);
      }
    }
    insertData();
  }, []);
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
