import {
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../../theme/colors";
import CustomButton from "../../components/shared/CustomButton";
import AboutUsModal from "../../components/AboutUsModal";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";
import app from "../../../firebaseConfig";

const auth = getAuth(app);

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [currentUser, setCurrentUser] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Get the current user
    const user = auth.currentUser;
    setCurrentUser(user);
    console.log("user--------", user.displayName);
    console.log("user--------", user.email);
  }, []);

  const onSignOutPressed = async () => {
    try {
      await signOut(auth);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const onAboutUsPressed = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.root}>
      <Image
        source={require("../../../assets/images/avatar.jpeg")}
        style={styles.avatarContainer}
      />
      <Text style={styles.emailText}>{currentUser?.email}</Text>

      <Pressable style={styles.emailText} onPress={onAboutUsPressed}>
        <Text>About Us</Text>
      </Pressable>
      <CustomButton
        text={"Signout"}
        onPress={onSignOutPressed}
        loadingState={false}
      />

      <AboutUsModal
        isModalVisible={isModalVisible}
        onClosePressed={onAboutUsPressed}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    flex: 1,
    marginTop: 100,
  },
  avatarContainer: {
    height: 200,
    width: 200,
    borderRadius: 100,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  emailText: {
    marginBottom: 50,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
});
