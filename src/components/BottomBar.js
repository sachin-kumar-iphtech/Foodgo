import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const BottomBar = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconRow}>
        <TouchableOpacity>
          <Ionicons name="home-outline" size={26} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="person-outline" size={26} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="book-outline" size={26} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="heart-outline" size={26} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 70,
    backgroundColor: "#EF2A39", // <- replace this with your own color later
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "90%",
    height: "100%",
  },
});

export default BottomBar;
