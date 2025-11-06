import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      // Remove login flag
      await AsyncStorage.removeItem("isLoggedIn");
      alert("Logged out successfully!");
      navigation.replace("Login"); // replace instead of navigate
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Home Screen </Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.btnText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 22, fontWeight: "600", marginBottom: 20 },
  button: {
    backgroundColor: "#0d0475",
    padding: 12,
    borderRadius: 30,
    width: 150,
  },
  btnText: { color: "#fff", textAlign: "center", fontWeight: "600" },
});

export default HomeScreen;
