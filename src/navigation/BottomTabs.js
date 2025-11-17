import React, { useMemo } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Pressable,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";

// 🔹 Screens
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ChatScreen from "../screens/ChatScreen";
import FavoriteScreen from "../screens/FavoriteScreen";

// Dummy screen for center FAB space
const EmptyScreen = () => null;

// -------------------
// 🎨 Theme Constants
// -------------------
const THEME = {
  primary: "#EF2A39",
  white: "#FFFFFF",
  inactive: "#f8c4c4",
  active: "#FFFFFF",
  shadow: "#000",
};

const Tab = createBottomTabNavigator();

// -------------------
// 🔸 Custom Tab Bar
// -------------------
const CustomTabBar = ({ state, descriptors, navigation, fabIconName = "add", fabOnPress }) => {
  if (state.routes[state.index].name === "Chats") return null;
  const { width } = useWindowDimensions();

  const TAB_BAR_WIDTH = width;
  const TAB_BAR_HEIGHT = 65;
  const FAB_SIZE = 80;
  const TAB_BAR_OFFSET = 1;
  const NOTCH_RADIUS = FAB_SIZE / 2;

  // 🎯 Create middle curve (notch)
  const path = useMemo(() => {
    const notchWidth = FAB_SIZE + 50;
    const center = TAB_BAR_WIDTH / 2;
    const leftStart = center - notchWidth / 2;
    const rightEnd = center + notchWidth / 2;

    return `
      M 0 0
      L ${leftStart} 0
      C ${leftStart + 35} 0, ${center - NOTCH_RADIUS} ${NOTCH_RADIUS}, ${center} ${NOTCH_RADIUS}
      C ${center + NOTCH_RADIUS} ${NOTCH_RADIUS}, ${rightEnd - 35} 0, ${rightEnd} 0
      L ${TAB_BAR_WIDTH} 0
      L ${TAB_BAR_WIDTH} ${TAB_BAR_HEIGHT}
      L 0 ${TAB_BAR_HEIGHT}
      Z
    `;
  }, [NOTCH_RADIUS, TAB_BAR_WIDTH]);

  // 🔹 Middle index for 5 tabs (Home, Profile, Add, Chat, Fav)
  const middleIndex = Math.floor(state.routes.length / 2);

  return (
    <View
      style={[
        styles.tabBarContainer,
        { width: TAB_BAR_WIDTH, bottom: TAB_BAR_OFFSET, height: TAB_BAR_HEIGHT },
      ]}
    >
      {/* Background Curve */}
      <Svg width={TAB_BAR_WIDTH} height={TAB_BAR_HEIGHT} style={StyleSheet.absoluteFill}>
        <Path d={path} fill={THEME.primary} />
      </Svg>

      {/* Floating Middle Button */}
      <Pressable
        style={styles.fab}
        onPress={() => {
          if (fabOnPress) return fabOnPress();
          const fabRoute = state.routes[middleIndex];
          const event = navigation.emit({
            type: "tabPress",
            target: fabRoute.key,
            canPreventDefault: true,
          });
          if (!event.defaultPrevented)
            navigation.navigate(fabRoute.name, fabRoute.params);
        }}
      >
        <Ionicons name={fabIconName} size={32} color={THEME.white} />
      </Pressable>

      {/* Bottom Tab Icons */}
      <View style={styles.tabItemsContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          // Middle dummy tab (FAB space)
          if (index === middleIndex)
            return <View key={route.key} style={styles.tabItem} />;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              onLongPress={() =>
                navigation.emit({ type: "tabLongPress", target: route.key })
              }
              style={styles.tabItem}
            >
              {options.tabBarIcon &&
                options.tabBarIcon({
                  focused: isFocused,
                  color: isFocused ? THEME.active : THEME.inactive,
                  size: 26,
                })}
              {isFocused && <View style={styles.activeDot} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

// -------------------
// 🔹 Main Bottom Tabs
// -------------------
const BottomTabs = () => {
  return (
    // <SafeAreaView style={{ flex: 1, backgroundColor: "#EF2A39" }}>
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} fabIconName="add" />}
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: THEME.active,
          tabBarInactiveTintColor: THEME.inactive,
          tabBarStyle: {
            backgroundColor: THEME.primary,
            height: 80,
            position: "absolute",
            bottom: 0,
          },
          tabBarIcon: ({ color, focused }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            } else if (route.name === "Chats") {
              iconName = focused ? "chatbubble" : "chatbubble-ellipses-outline";
            } else if (route.name === "Favorites") {
              iconName = focused ? "heart" : "heart-outline";
            }
            return <Ionicons name={iconName} size={24} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        {/* Dummy middle screen for FAB notch */}
        <Tab.Screen
          name="Add"
          component={EmptyScreen}
          options={{ tabBarButton: () => null }}
        />
        <Tab.Screen name="Chats" component={ChatScreen} />
        <Tab.Screen name="Favorites" component={FavoriteScreen} />
      </Tab.Navigator>
    // </SafeAreaView>
  );
};

// -------------------
// 🧩 Styles
// -------------------
const styles = StyleSheet.create({
  tabBarContainer: {
    position: "absolute",
    alignSelf: "center",
    elevation: 8,
    shadowColor: THEME.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  tabItemsContainer: {
    flexDirection: "row",
    height: "100%",
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    top: -35,
    alignSelf: "center",
    width: 65,
    height: 65,
    borderRadius: 72 / 2,
    backgroundColor: THEME.primary,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    elevation: 10,
    shadowColor: THEME.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: THEME.active,
    position: "absolute",
    bottom: 8,
  },
});

export default BottomTabs;
