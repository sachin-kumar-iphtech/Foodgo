import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthCheckScreen = ({ navigation }) => {
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedIn = await AsyncStorage.getItem("isLoggedIn");
        if (loggedIn === "true") {
          navigation.replace("Home");
        } else {
          navigation.replace("Login");
        }
      } catch (e) {
        console.log("Error checking login:", e);
        navigation.replace("Login");
      }
    };

    setTimeout(checkLoginStatus, 1000); // small delay for smooth transition
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <ActivityIndicator size="large" color="#0d47a1" />
    </View>
  );
};

export default AuthCheckScreen;
