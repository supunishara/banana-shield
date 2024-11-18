import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Control, Controller, Path } from "react-hook-form";
import Ionicons from "@expo/vector-icons/Ionicons";

interface ICustomInput<ContentType> {
  control: Control<ContentType, object>;
  name: Path<ContentType>;
  rules?: {};
  placeholder?: string;
  secureTextEntry?: boolean;
}

function CustomInput<ContentType>({
  control,
  name,
  rules = {},
  placeholder = "",
  secureTextEntry = false,
}: ICustomInput<ContentType>) {
  const [showPassword, setShowPassword] = useState(secureTextEntry);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View
            style={[
              styles.container,
              { borderColor: error ? "red" : "#e8e8e8" },
            ]}
          >
            <TextInput
              value={value as string}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.input}
              secureTextEntry={!showPassword}
            />

            {!secureTextEntry && (
              <Pressable
                onPress={togglePasswordVisibility}
                style={styles.iconContainer}
              >
                <Ionicons
                  name={!showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="gray"
                />
              </Pressable>
            )}
          </View>
          {error && (
            <Text style={{ color: "red", alignSelf: "stretch" }}>
              {error.message || "Error"}
            </Text>
          )}
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    flexDirection: "row",
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    height: 50,
  },
  iconContainer: {
    paddingHorizontal: 10,
  },
});

export default CustomInput;
