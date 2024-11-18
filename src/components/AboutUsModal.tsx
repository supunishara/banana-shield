import React from "react";
import Modal from "react-native-modal";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
  ImageBackground,
  ScrollView,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import colors from "../theme/colors";

interface ModalProps {
  isModalVisible: boolean;
  onClosePressed: () => void;
}

const AboutUsModal = ({ isModalVisible, onClosePressed }: ModalProps) => {
  return (
    <Modal isVisible={isModalVisible}>
      <ImageBackground
        source={require("../../assets/images/blurred-login.png")}
        style={styles.modalContainer}
        resizeMode="cover"
      >
        <ScrollView>
          <View style={{ alignItems: "flex-end" }}>
            <Pressable onPress={onClosePressed}>
              <AntDesign name="close" size={24} color="black" />
            </Pressable>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.titleText}>About Us</Text>
            <Image
              source={require("../../assets/images/aboutUs.png")}
              style={styles.aboutUsImage}
              resizeMode="cover"
            />
            <Text style={styles.descriptionHeadText}>
              Welcome to Banana Disease Detection System!{" "}
            </Text>

            <Text style={styles.descriptionFooterText}>
              We are a dedicated team of agricultural scientists, machine
              learning engineers, and software developers. Our goal is to
              provide banana farmers with an innovative solution for early
              detection and prevention of diseases that affect their crops.
              Through the use of advanced technologies such as image processing,
              machine learning, and spectroscopy, our system accurately
              identifies and classifies banana diseases. With our user-friendly
              interface, farmers can easily upload images of their banana plants
              or fruits for analysis. By leveraging our system, farmers can make
              informed decisions and take proactive measures to protect their
              crops and ensure sustainable agriculture practices.
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </Modal>
  );
};

export default AboutUsModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  titleText: {
    fontFamily: "Poppins-Bold",
    fontSize: 33,
    position: "absolute",
    color: colors.textColor,
  },
  detailContainer: {
    flex: 1,
    alignItems: "center",
  },
  aboutUsImage: {
    height: 250,
    width: 250,
    marginTop: 50,
  },
  descriptionHeadText: {
    fontFamily: "Poppins-Bold",
    fontSize: 13,
    color: colors.black,
    textAlign: "center",
  },
  descriptionFooterText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: colors.black,
    textAlign: "center",
    marginTop: 20,
  },
});
