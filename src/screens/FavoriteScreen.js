import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import burgerJson from "../data/burgers.json"; // your burger JSON file
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const FavoriteScreen = ({ navigation }) => {
  const [likedItems, setLikedItems] = useState([]);

  // Map string image names to actual require paths
  const IMAGES = {
    image6: require("../../assets/image6.png"),
    image5: require("../../assets/image5.png"),
    image4: require("../../assets/image4.png"),
    image3: require("../../assets/image3.png"),
    combo1: require("../../assets/combo1.png"),
    combo2: require("../../assets/combo2.png"),
    wrap1: require("../../assets/wrap1.jpeg"),
    wrap3: require("../../assets/wrap3.png"),
  };
  useFocusEffect(
    useCallback(() => {
      // Reload liked items whenever screen is focused
      loadLikedItems();
    }, [])
  );
  useEffect(() => {
    loadLikedItems();
  }, []);

  const loadLikedItems = async () => {
    try {
      const data = await AsyncStorage.getItem("likedItems");
      if (data) {
        const likedIds = JSON.parse(data);

        // Filter JSON based on liked IDs
        const likedProducts = burgerJson
          .filter((item) => likedIds.includes(item.id))
          .map((item) => ({ ...item, image: IMAGES[item.image] }));

        setLikedItems(likedProducts);
      }
    } catch (error) {
      console.log("Error loading favorites:", error);
    }
  };

  // Remove from favorites
  const toggleLike = async (id) => {
    try {
      const data = await AsyncStorage.getItem("likedItems");
      let likedIds = data ? JSON.parse(data) : [];

      // Remove if exists
      likedIds = likedIds.filter((itemId) => itemId !== id);
      await AsyncStorage.setItem("likedItems", JSON.stringify(likedIds));

      // Update UI
      setLikedItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log("Error updating favorites:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorite Products ❤️</Text>

      {likedItems.length === 0 ? (
        <View style={{ marginTop: 350, alignItems: "center" }}>
          <Text style={{ fontSize: 18, color: "#6A6A6A" }}>
            No Favorites Yet
          </Text>
        </View>
      ) : (
        <FlatList
          data={likedItems}
          numColumns={2}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.burgerList}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProductDetails", { productId: item.id })
              }
              style={styles.card}
            >
              <Image source={item.image} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardSub}>{item.sub}</Text>
              <Text style={styles.cardRating}>
                ★{" "}
                <Text style={{ color: "#3C2F2F", fontWeight: "bold", fontSize: 15 }}>
                  {item.rating}
                </Text>
              </Text>

              {/* Heart Icon */}
              <TouchableOpacity
                style={styles.heartIcon}
                onPress={() => toggleLike(item.id)}
              >
                <Text style={{ fontSize: 19, color: "#EF2A39" }}>❤️</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: 10,paddingTop:40 },
  header: { fontSize: 26, fontWeight: "700", textAlign: "center", marginTop: 10 },
  burgerList: { paddingHorizontal: 5, paddingTop: 15, rowGap: 20, paddingBottom: 80 },
  card: { height: 200, width: 180, backgroundColor: "white", borderRadius: 20, elevation: 2 },
  cardImage: { resizeMode: "contain", height: 121, width: 125, left: 25 },
  cardTitle: { fontWeight: "700", left: 15, color: "#3C2F2F" },
  cardSub: { left: 15, color: "#3C2F2F", fontSize: 13 },
  cardRating: { left: 20, top: 5, color: "#FF9633", fontSize: 20 },
  heartIcon: { position: "absolute", right: 15, bottom: 10 },
});

export default FavoriteScreen;
