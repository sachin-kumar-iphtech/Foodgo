import React from "react";
import { View, Text ,TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const FavoriteScreen = ({navigation}) => {
  const handleLogout = async () => {
    try {
      
      await AsyncStorage.removeItem("isLoggedIn");
      alert("Logged out successfully!");
      navigation.replace("Login"); 
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{fontSize:25}}>Favorite Screen</Text>
       <TouchableOpacity onPress={handleLogout} style={{backgroundColor:"#EF2A39",height:40,width:100,justifyContent:"center",alignItems:"center",borderRadius:20}}><Text style={{fontSize:20,color:"white",fontWeight:"500"}}>LogOut</Text></TouchableOpacity>
    </View>
  );
};

export default FavoriteScreen;
