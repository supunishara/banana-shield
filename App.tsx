import { StatusBar } from "expo-status-bar";
import { AppNavigator } from "./src/navigation";
import {
  Platform,
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import FlashMessage from "react-native-flash-message";
import { useEffect } from "react";
import { messaging } from "./firebaseConfig";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

export default function App() {
  useEffect(() => {
    const requestNotificationPermission = async () => {
      if (Platform.OS === "android") {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
          );

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Notification permission granted");
            // Get the token
            const token = await getToken(messaging);
            console.log("FCM Token:", token);
          } else {
            console.log("Notification permission denied");
          }
        } catch (error) {
          console.error("Error requesting notification permission", error);
        }
      } else {
        // For iOS, permissions are handled differently
        const token = await getToken(messaging);
        console.log("FCM Token:", token);
      }
    };

    requestNotificationPermission();

    // Handle foreground messages
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      // Handle the message
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppNavigator />
      <FlashMessage position="top" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
