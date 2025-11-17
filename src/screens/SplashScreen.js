import React, { useEffect } from "react";
import { View, Image, StyleSheet, StatusBar } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
        setTimeout(() => {
          if (isLoggedIn === "true") {
            navigation.replace("Home"); // ✅ already logged in
          } else {
            navigation.replace("Login"); // 🚪 not logged in
          }
        }, 2000); // splash duration
      } catch (error) {
        console.log("Error checking login status:", error);
        navigation.replace("Login");
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <LinearGradient
      colors={[
        "rgba(255, 147, 155, 1)", // light pink
        "rgba(239, 42, 57, 1)",   // deep red
      ]}
      locations={[0.0, 0.9]}
      start={{ x: 0.8, y: 0 }}
      end={{ x: 0.2, y: 1 }}
      style={styles.container}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Center Logo */}
      <View style={styles.centerContent}>
        <Image
          source={require("../../assets/Foodgo.png")}
          style={styles.logo}
        />
      </View>

      {/* Decorative bottom images */}
      <Image
        source={require("../../assets/image2.png")}
        style={styles.bottomLeft}
      />
      <Image
        source={require("../../assets/image1.png")}
        style={styles.bottomRight}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 180,
    height: 80,
    resizeMode: "contain",
  },
  bottomLeft: {
    position: "absolute",
    bottom: 0,
    left: -15,
    width: 240,
    height: 260,
    resizeMode: "contain",
  },
  bottomRight: {
    position: "absolute",
    bottom: -13,
    right: 0,
    left:150,
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});

export default SplashScreen;
