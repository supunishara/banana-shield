import React, { useState, useEffect } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import SplashSkateAnimation from "../../components/splash-skate-Animation";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import app from "../../../firebaseConfig";

const auth = getAuth(app);

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    const getUser = async () => {
      try {
        const user = auth.currentUser;
        console.log("user-----user----22", user);

        timer = setTimeout(() => {
          if (user) {
            navigation.navigate("Main");
          } else {
            navigation.navigate("Login");
          }
        }, 5000);
      } catch (e) {
        // error reading value
      }
    };

    getUser();
    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground
      source={require("../../../assets/images/leave-splash.png")}
      style={styles.container}
      resizeMode="cover"
    >
      {/* <SplashWalkingAnimation /> */}
      <SplashSkateAnimation />
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
