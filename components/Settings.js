import React, { useCallback, useState } from "react";
import { Button, View, Alert, SafeAreaView, Text } from "react-native";
import * as Notifications from "expo-notifications";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "../styles.js";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    //通知を受け取る時に音が鳴らさないようにしたいなら、
    //shouldPlaySoundをfalseにして下さい。
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function (props) {
  const [selectedTime, setSelectedTime] = useState(new Date());
  let notificationTitle = null;

  const scheduleNotificationAsync = useCallback(async (hour, minute) => {
    if (minute !== 0) {
      notificationTitle = hour + "時" + minute + "分です";
    } else {
      notificationTitle = hour + "時です"
    }
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: notificationTitle,
          body: "お風呂に入りましょう！",
        },
        trigger: {
          hour,
          minute,
          repeats: true,
          sound: 'default',
          channelId: "new-emails",
        },
      });
    } catch (error) {
      console.error("通知のスケジュールに失敗しました:", error);
      Alert.alert("エラー", "通知のスケジュールに失敗しました。");
    }
  }, []);

  const onPressDone = useCallback(async () => {
    try {
      // ①現在設定されているスケジュールを全て削除
      await Notifications.cancelAllScheduledNotificationsAsync();

      const selectedHour = selectedTime.getHours();
      const selectedMinute = selectedTime.getMinutes();

      // ②選択された時間で通知をスケジュール
      await scheduleNotificationAsync(selectedHour, selectedMinute);

      Alert.alert("OK", "通知がスケジュールされました。");
    } catch (error) {
      console.error("スケジュール処理に失敗しました:", error);
      Alert.alert("エラー", "通知の設定に失敗しました。");
    }
  }, [scheduleNotificationAsync, selectedTime]);

  return (
    <Settings
      {...props}
      onPressDone={onPressDone}
      selectedTime={selectedTime}
      setSelectedTime={setSelectedTime}
    />
  );
}

class Settings extends React.Component {
  render() {
    const { onPressDone, selectedTime, setSelectedTime } = this.props;
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.settingsContainer}>
          <View style={styles.marginView}>
            <Text style={styles.titleText}>通知設定</Text>
          </View>
          <View style={styles.marginView}>
            <Text style={styles.explainText}>
              時間を変更した後、{"\n"}「保存」を押してください。
            </Text>
          </View>
          <View style={styles.marginView}>
            <DateTimePicker
              mode="time"
              minuteInterval={1}
              display="default"
              value={selectedTime}
              onChange={(event, date) => {
                if (date !== undefined) {
                  setSelectedTime(date);
                }
              }}
            />
          </View>
          <View style={styles.marginView}>
            <Button
              title="保存"
              onPress={() => {
                onPressDone();
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
