import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      {/* Curve background */}
      <View style={styles.curvedBackground} />

      {/* Tab buttons */}
      <View style={styles.tabRow}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          // icons
          let iconName;
          if (route.name === "Home") iconName = "home-outline";
          else if (route.name === "Chats") iconName = "chatbubble-outline";
          else if (route.name === "Favorites") iconName = "heart-outline";
          else if (route.name === "Profile") iconName = "person-outline";

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              style={styles.tabButton}
            >
              <Ionicons
                name={iconName}
                size={26}
                color={isFocused ? "#fff" : "#f8c4c4"}
              />
              <Text
                style={[
                  styles.label,
                  { color: isFocused ? "#fff" : "#f8c4c4" },
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  curvedBackground: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 70,
    backgroundColor: "#EF2A39",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 25,
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 10,
    marginTop: 3,
  },
});

export default CustomTabBar;
