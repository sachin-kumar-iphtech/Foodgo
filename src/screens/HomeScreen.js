import React, { useState ,useEffect,useRef} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  Animated
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import burgerJson from "../data/burgers.json";

const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("1");
  const [burgerList,setBurgerList]=useState([]);
  const [filterdList,setFilteredList]=useState([]);
  //for filter 
  const [foodType, setFoodType] = useState(null); // veg / nonveg / null
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

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
  
  // useEffect for fetching json data
  useEffect(() => {
    const mapped = burgerJson.map(item => ({
      ...item,
      image:IMAGES[item.image]
    }));
  
    setBurgerList(mapped);
    setFilteredList(mapped);
  }, []);
//useEffect end 
// FOOD TYPE FILTER FUNCTION
const applyFoodType = (type) => {
  setFoodType(type);

  let updatedList = [...burgerList];

  // SEARCH FILTER
  if (searchText.trim() !== "") {
    updatedList = updatedList.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.sub.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  // FOOD TYPE FILTER: veg / nonveg
  if (type !== null) {
    updatedList = updatedList.filter((item) => item.type === type);
  }

  setFilteredList(updatedList);
};

// text input filter logic
const handleSearch = (text) => {
  setSearchText(text);

  const query = text.toLowerCase();

  // Agar empty ho → saara data wapas
  if (query === "") {
    setFilteredList(burgerList);
    return;
  }

  // Filter logic
  const result = burgerList.filter(item =>
    item.name.toLowerCase().includes(query) ||
    item.sub.toLowerCase().includes(query)
  );

  setFilteredList(result);
};
// end
//filter popup logic
const openPopup = () => {
  setShowFilterPopup(true);

  Animated.parallel([
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }),
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 8,
      useNativeDriver: true,
    }),
  ]).start();
};

const closePopup = () => {
  Animated.parallel([
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }),
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }),
  ]).start(() => setShowFilterPopup(false));
};
//haldleCategorySelect
const handleCategorySelect = (id) => {
  setSelectedCategory(id);

  let updated = [...burgerList]; // All items

  // Selected category ka object uthao
  const selected = categories.find(c => c.id === id);

  // Agar category All nahi hai → filter items
  if (selected.title !== "All") {
    updated = updated.filter(item => item.category === selected.title.toLowerCase());
  }

  // Agar search text already filled hai → search bhi apply ho
  if (searchText.trim() !== "") {
    updated = updated.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.sub.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  // Agar veg/nonveg filter active hai
  if (foodType !== null) {
    updated = updated.filter(item => item.type === foodType);
  }

  setFilteredList(updated);
};


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
    { id: "3", title: "Wraps", bgColor: "#F3F4F6", textColor: "#6A6A6A" },
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
            onChangeText={handleSearch}
          />
        </View>
        <TouchableOpacity  onPress={openPopup}>
        <View style={styles.filterBtn}>
          {/* <Image
            source={require("../../assets/settings-sliders.png")}
            style={{ resizeMode: "cover",height:25,width:25}}
          /> */}
          <Ionicons name="options" size={25} color="white" />
        </View>
        </TouchableOpacity>
        

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
    onPress={() => handleCategorySelect(item.id)}
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
      {filterdList.length === 0 && (
  <View style={{ alignItems: "center", marginTop: 40 }}>
    <Text style={{ fontSize: 18, color: "#6A6A6A", fontWeight: "600" }}>
      Item not found
    </Text>
  </View>
)}

      {/*  Burger List */}
      <FlatList
        data={filterdList}
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
         
{/* filter popup*/}
{showFilterPopup && (
  <Animated.View
    style={[
      styles.popupOverlay,
      { opacity: opacityAnim }
    ]}
  >
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={closePopup}
      activeOpacity={1}
    />

    <Animated.View
      style={[
        styles.popupBox,
        {
          transform: [{ scale: scaleAnim }],
        }
      ]}
    > 
    <View style={{width:"100%",height:1,backgroundColor:"lightgray",marginTop:10}}></View>
      <Text style={styles.popupTitle}>Filter By</Text>

      <TouchableOpacity 
        style={styles.popupItem} 
        onPress={() => { applyFoodType("veg"); closePopup(); }}
      >
        <Text style={styles.popupText}>Veg</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.popupItem}
        onPress={() => { applyFoodType("nonveg"); closePopup(); }}
      >
        <Text style={styles.popupText}>Non-Veg</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.popupItem, { backgroundColor: "#FFE5E5" }]}
        onPress={() => { applyFoodType(null); closePopup(); }}
      >
        <Text style={[styles.popupText, { color: "red" }]}>Clear Filter</Text>
      </TouchableOpacity>
    </Animated.View>
  </Animated.View>
)}


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
    top:10
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    top: 45,
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
    marginTop: 25,
    columnGap: 10,
    marginBottom:15
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
    elevation:10,
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
    left: 15,
    color:"#3C2F2F",
  },
  cardSub: {
    left: 15,
    color:"#3C2F2F",
    fontSize:13
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
  // filter popup
  popupOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)", // for  transparent bg
    justifyContent: "flex-end",
  },
  
  popupBox: {
    backgroundColor: "white",
    width: "100%",
    height:"48%",
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius:0,
    borderTopRightRadius:25,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    position:"absolute",
    zIndex:999
    
  
  },
  
  popupTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#3C2F2F",
    marginBottom: 15,
    marginTop:25
  },
  
  popupItem: {
    padding: 15,
    backgroundColor: "#F7F7F7",
    borderRadius: 12,
    marginVertical: 8,
  },
  
  popupText: {
    fontSize: 16,
    color: "#3C2F2F",
    fontWeight: "600",
  },
  
});

export default HomeScreen;
