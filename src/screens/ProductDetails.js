import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import TouchProgressBar from "../components/TouchProgressBar";
import productDetailsData from "../data/productDetails.json";
import  Images from "../constants/imageMapping";

const ProductDetails = ({ route }) => {
  const navigation = useNavigation();
  const { productId } = route.params;

  // Get product data from JSON
  const item = productDetailsData.find((p) => p.id === productId);

  if (!item) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No product data found!</Text>
      </View>
    );
  }

  const productImage = Images[item.image];

  // Quantity state
  const [count, setCount] = useState(0);

  const decrement = () => {
    if (count > 0) setCount(count - 1);
  };

  // const unitPrice = 4.12; 

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Custom Back Button */}
      <TouchableOpacity
        style={{
          marginTop: 40,
          marginLeft: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={25} color="#000" />
      </TouchableOpacity>
      <Ionicons
        name="search"
        size={25}
        color="#000"
        style={{ position: "absolute", top: 42, right: 20 }}
      />

      {/* Product Image and Info */}
      <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
        <Image
          source={productImage}
          style={{ resizeMode: "contain", height: 300, width: "100%",borderRadius:12 }}
        />
        <Text style={{ color: "#3C2F2F", fontSize: 25, fontWeight: "600", marginTop: 10 }}>
          {item.name} 
        </Text>
        <Text style={{color: "#3C2F2F", fontSize:18}}>{item.sub}</Text>
        <Text style={{ marginTop: 10, color: "#FF9633" }}>
          ★ <Text style={{ color: "#6A6A6A" }}>{item.rating} ⎼⎼ 26 mins</Text>
        </Text>
        {item.description && (
          <Text
            style={{
              fontSize: 17,
              lineHeight: 25,
              marginTop: 20,
              color: "#6A6A6A",
              fontWeight: "300",
            }}
          >
            {item.description}
          </Text>
        )}
      </View>

      {/* Spicy / Mild / Hot */}
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <View style={{ margin: 20, paddingTop: 10 }}>
          <Text style={{ fontSize: 17, color: "#3C2F2F", paddingVertical: 10 }}>
            Spicy
          </Text>
          <TouchProgressBar />
          <Text style={{ color: "green", fontSize: 15, fontWeight: "500", marginTop: 20 }}>
            Mild
          </Text>
          <Text style={{ color: "#EF2A39", fontSize: 15, fontWeight: "600", position: "absolute", left: 120, top: 80 }}>
            Hot
          </Text>
        </View>

        {/* Portion / Quantity */}
        <View style={{ marginTop:30, paddingTop: 8, elevation: 5 ,left:70}}>
          <Text style={{ fontSize: 17, color: "#3C2F2F", marginBottom: 10 }}>Portion</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              style={{
                height: 40,
                width: 40,
                backgroundColor: "#EF2A39",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                elevation: 5,
              }}
              onPress={decrement}
            >
              <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>-</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 20, marginHorizontal: 10 }}>{count}</Text>
            <TouchableOpacity
              style={{
                height: 40,
                width: 40,
                backgroundColor: "#EF2A39",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                elevation: 5,
              }}
              onPress={() => setCount(count + 1)}
            >
              <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Price and ORDER NOW */}
      <View style={{ flexDirection: "row", marginTop: 30, marginHorizontal: 20 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#EF2A39",
            height: 70,
            width: 104,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 22, fontWeight: "600" }}>
            ${ (count * item.price).toFixed(2) }
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("PaymentScreen")}
          style={{
            backgroundColor: "#3C2F2F",
            height: 70,
            width: 200,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 50,
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
            ORDER NOW
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductDetails;
