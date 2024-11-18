import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions, Animated } from "react-native";
import LottieView from "lottie-react-native";
import splashAnimation from "../../assets/svg/splashAnimation.json"; // Adjusted import path

const { width } = Dimensions.get("window");

const SplashAnimation = () => {
  const translateX = new Animated.Value(width); // Start from the right side of the screen

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: -400, // Move to the left side of the screen
      duration: 5000, // Duration of the animation
      useNativeDriver: true,
    }).start();
  }, [translateX]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ translateX }] }}>
        {/* <LottieView source={splashAnimation} autoPlay loop={false} /> */}

        <LottieView
          autoPlay
          loop={true}
          style={{
            width: 200,
            height: 200,
          }}
          source={splashAnimation}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden", // Hide overflow to prevent the animation from showing outside the view
  },
});

export default SplashAnimation;
