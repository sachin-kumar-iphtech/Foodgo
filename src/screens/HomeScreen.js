import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";

const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("1");


  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("isLoggedIn");
      alert("Logged out successfully!");
      navigation.replace("Login");
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  const categories = [
    { id: "1", title: "All", bgColor: "#EF2A39", textColor: "#F5F5F5" },
    { id: "2", title: "Combos", bgColor: "#F3F4F6", textColor: "#6A6A6A" },
    { id: "3", title: "Sliders", bgColor: "#F3F4F6", textColor: "#6A6A6A" },
    { id: "4", title: "Classic", bgColor: "#F3F4F6", textColor: "#6A6A6A" },
  ];

  const burgerData = [
    {
      id: "1",
      name: "Cheeseburger",
      sub: "Wendy's Burger",
      rating: "4.9",
      color:"#3C2F2F",
      image: require("../../assets/image6.png"),
      navigate: "Product1Screen",
    },
    {
      id: "2",
      name: "Hamburger",
      sub: "Veggie Burger",
      rating: "4.8",
      image: require("../../assets/image5.png"),
      navigate: "Product2Screen",
    },
    {
      id: "3",
      name: "Hamburger",
      sub: "Chicken Burger",
      rating: "4.6",
      image: require("../../assets/image4.png"),
      navigate: "Product3Screen",
    },
    {
      id: "4",
      name: "Hamburger",
      sub: "Fried Chicken Burger",
      rating: "4.5",
      image: require("../../assets/image3.png"),
      navigate: "Product4Screen",
    },
    {
      id: "5",
      name: "Cheeseburger",
      sub: "Wendy's Burger",
      rating: "4.9",
      image: require("../../assets/image6.png"),
      // navigate: "Product1Screen",
    },
    {
      id: "6",
      name: "Hamburger",
      sub: "Veggie Burger",
      rating: "4.8",
      image: require("../../assets/image5.png"),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.top}>
        <Text style={styles.topLeft}>Foodgo</Text>
        <Image
          source={require("../../assets/dp.png")}
          style={styles.topRight}
        />
      </View>

      <Text style={{ paddingHorizontal: 20, fontSize: 18, color:"#6A6A6A",top:10,
 }}>
        Order Your favorite food!
      </Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={25} color="#3C2F2F" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor="#3C2F2F"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <View style={styles.filterBtn}>
          {/* <Image
            source={require("../../assets/settings-sliders.png")}
            style={{ resizeMode: "cover",height:25,width:25}}
          /> */}
          <Ionicons name="options" size={25} color="white" />
        </View>
      </View>

      {/* Categories */}
      <View style={{ marginTop: 60}}>
      <FlatList
  data={categories}
  horizontal
  keyExtractor={(item) => item.id.toString()}
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.categoryList}
  renderItem={({ item }) => (
    <TouchableOpacity
      onPress={() => setSelectedCategory(item.id)}
      style={[
        styles.categoryItem,
        {
          backgroundColor:
            selectedCategory === item.id ? "#EF2A39" : "#F3F4F6",
        },
        item.title === "Combos" && { width: 120 },
        (item.title === "Sliders" || item.title === "Classic") && {
          width: 120,
        },
      ]}
    >
      <Text
        style={{
          color: selectedCategory === item.id ? "#FFFFFF" : "#6A6A6A",
          fontSize: 15,
          fontWeight: "600",
        }}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  )}
/>

      </View>

      {/*  Burger List */}
      <FlatList
        data={burgerData}
        numColumns={2}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.burgerList, { marginTop: 10 }]}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              item.navigate && navigation.navigate(item.navigate)
            }
            style={styles.card}
          >
            <Image source={item.image} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSub}>{item.sub}</Text>
            <Text style={styles.cardRating}>
              ★ <Text style={{ color: "#3C2F2F",fontWeight:"bold",fontSize:15 }}>{item.rating}</Text>
            </Text>
            <Text style={styles.heartIcon}>
              <Ionicons name="heart-outline" size={24} color="#3C2F2F"/>
            </Text>
            {/* <Image
            source={require("../../assets/heart1.png")}
            style={{ resizeMode: "cover",height:22,width:22, top:-20,left:130}}
          /> */}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingBottom: 10,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 17,
    marginTop: 35,
  },
  topLeft: {
    fontFamily: "cursive",
    fontSize: 45,
    fontWeight: "900",
    color: "#3C2F2F" ,
    lineHeight:"134.7%",

  },
  topRight: {
    height: 60,
    width: 60,
    resizeMode: "contain",
    top:20
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    top: 40,
    shadowColor:"#FFFFFF",
    shadowOpacity:"0.5%"
  },
  searchBox: {
    width: "84%",
    borderRadius: 20,
    height: 50,
    elevation: 5,
    shadowOpacity:0.2,
    shadowColor:"#3C2F2F",
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: 15,
    fontWeight:"800",
    color:"#3C2F2F",
    height:24,width:24,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: "#3C2F2F",
    marginLeft: 13,
    fontWeight:"500"
  },
  filterBtn: {
    width: 50,
    height: 50,
    backgroundColor: "#EF2A39",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation:5,
  },
  categoryList: {
    paddingHorizontal: 10,
    marginTop: 20, // smaller gap
    columnGap: 10,
    marginBottom:12
  },
  categoryItem: {
    height: 50,
    width: 70,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor:"#6A6A6A",
    backgroundColor:"#F3F4F6",
    shadowOpacity:0.5,
    elevation:6,
  },
  burgerList: {
    paddingHorizontal: 10,
    paddingTop: 15,
    rowGap: 30,
    paddingBottom: 80,
    
  },
  card: {
    height: 200,
    width: 180,
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 2,
  },
  cardImage: {
    resizeMode: "contain",
    height: 121,
    width: 125,
    left: 25,
  },
  cardTitle: {
    fontWeight: "700",
    left: 20,
    color:"#3C2F2F",
  },
  cardSub: {
    left: 20,
    color:"#3C2F2F",
  },
  cardRating: {
    left: 20,
    top:5,
    color: "#FF9633",
    fontSize:20
  },
  heartIcon: {
    position: "absolute",
    right: 15,
    bottom: 10,
    fontWeight:"bold",
  },
});

export default HomeScreen;
