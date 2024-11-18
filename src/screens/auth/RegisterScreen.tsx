import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList, RootStackParamList } from "../../types/navigation";
import { CompositeNavigationProp } from "@react-navigation/native";
import FormInput from "../../components/shared/CustomInput";
import { useForm } from "react-hook-form";
import CustomButton from "../../components/shared/CustomButton";
import { useFonts } from "expo-font";
import colors from "../../theme/colors";
import { showMessage } from "react-native-flash-message";
import RegisterAnimation from "../../components/register-Animation";
import SplashAnimation from "../../components/splash-skate-Animation";
import app from "../../../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

type LoginScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<AuthStackParamList, "Login">,
  NativeStackNavigationProp<RootStackParamList>
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

type LoginData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const auth = getAuth(app);

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const { control, handleSubmit, reset, watch } = useForm<LoginData>();
  const [loading, setLoading] = useState(false);

  // Get the password value for validation
  const pwd = watch("password");

  const [loaded, error] = useFonts({
    "Poppins-Bold": require("../../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../../../assets/fonts/Poppins-Regular.ttf"),
  });

  const onRegisterPressed = async ({ email, password }: LoginData) => {
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User  registered successfully!");
      setLoading(false);
      showMessage({
        message: "Successfully created your account",
        description: "You will be redirected to Login Page, Please Log-In",
        type: "success",
      });

      // const timer = setTimeout(() => {
      //   navigation.navigate("Login");
      // }, 4000);
    } catch (error) {
      setLoading(false);
      showMessage({
        message: "Error",
        description: `${error.message}`,
        type: "danger",
      });
      console.error("Registration error:", error);
    }
  };

  const onLoginPressed = () => {
    navigation.navigate("Login");
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/blurred-login.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.root}>
          <RegisterAnimation />
          <FormInput
            name="email"
            placeholder="Email"
            secureTextEntry={true}
            control={control}
            rules={{
              required: "Email is required",
              pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
            }}
          />

          <FormInput
            name="password"
            placeholder="Password"
            secureTextEntry={false}
            control={control}
            rules={{
              required: "Password is required",
              minLength: {
                value: 3,
                message: "Password should be minimum 3 characters long",
              },
            }}
          />

          <FormInput
            name="confirmPassword"
            placeholder="Confirm Password"
            secureTextEntry={false}
            control={control}
            rules={{
              required: "Confirm Password is required",
              validate: (value: string) =>
                value === pwd || "Passwords do not match",
            }}
          />

          <CustomButton
            text={"Sign In"}
            onPress={handleSubmit(onRegisterPressed)}
            loadingState={loading}
          />

          <Text style={styles.registerPrimaryText}>
            Already have an account? Go back to {` `}
            <Text style={styles.registerSecondaryText} onPress={onLoginPressed}>
              Login
            </Text>
          </Text>

          <Text style={styles.lowerText}>BANANA SHIELD</Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  lowerText: {
    fontFamily: "Poppins-Bold",
    fontSize: 33,
    position: "absolute",
    bottom: 20,
    color: colors.textColor,
  },
  registerPrimaryText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: colors.black,
    marginTop: 12,
  },
  registerSecondaryText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: colors.blue,
    textDecorationLine: "underline",
  },
});

export default RegisterScreen;
