import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions, Animated } from "react-native";
import LottieView from "lottie-react-native";
import registerAnimation from "../../assets/svg/register.json"; // Adjusted import path

const { width } = Dimensions.get("window");

const RegisterAnimation = () => {
  return (
    <View style={styles.container}>
      <Animated.View>
        <LottieView
          autoPlay
          loop={true}
          style={{
            width: 100,
            height: 100,
          }}
          source={registerAnimation}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden", // Hide overflow to prevent the animation from showing outside the view
  },
});

export default RegisterAnimation;
