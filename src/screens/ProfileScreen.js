import React from "react";
import { View, Text,TouchableOpacity ,Image,TextInput} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";
const ProfileScreen = ({ navigation }) => {
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
    <View style={{backgroundColor:"#EF2A39",height:"100%",width:"100%"}}>
     <View style={{top:30,flexDirection:"row",justifyContent:"space-between"}}>
      <View style={{justifyContent:"flex-start"}}>
         <Image
            source={require("../../assets/image16.png")}
            style={{ height:160,width:100,opacity:0.4,top:20}}
          />
      </View>
      <View style={{height:160, width:150,backgroundColor:"red",borderRadius:20,top:40,justifyContent:"center",alignItems:"center",zIndex:2}}>
      <Image
            source={require("../../assets/image14.png")}
            style={{ height:153,width:143,borderRadius:18,}}
          />
      </View>
      <View style={{justifyContent:"flex-end"}}>
      <Ionicons name="settings" size={24} color="white"  style={{left:55,opacity:0.9}}/>
      <Image
            source={require("../../assets/image15.png")}
            style={{ height:160,width:110,opacity:0.4,top:-15}}
          />
      </View>
     </View>
      {/* <TouchableOpacity style={{backgroundColor:"red", width:60,height:30,borderRadius:50}} onPress={handleLogout}>
        <Text style={{color:"white",textAlign:"center",padding:5}}>Logout</Text>
      </TouchableOpacity> */}
      <View style={{backgroundColor:"#FFFFFF",height:"100%",width:"100%",borderTopLeftRadius:30,borderTopRightRadius:30,top:-20}}>
        <View style={{top:80,}}>
          <View style={{}}>
          <Text style={{color:"#808080",marginStart:60,fontWeight:"600",fontSize:15,top:13,zIndex:2,height:24,width:55,backgroundColor:"white",paddingStart:7}}>Name</Text>
          <TextInput value="Sophia Patel" editable={false} style={{borderWidth:2,borderColor:"#E1E1E1",width:"85%",borderRadius:20,paddingStart:45,fontWeight:"800",color:"#3C2F2F",marginHorizontal:30,height:55}}></TextInput>
          </View>
          <View style={{}}>
          <Text style={{color:"#808080",marginStart:60,fontWeight:"600",fontSize:15,top:13,zIndex:2,height:24,width:55,backgroundColor:"white",paddingStart:7}}>Email</Text>
          <TextInput value="sophiapatel@gmail.com" editable={false} style={{borderWidth:2,borderColor:"#E1E1E1",width:"85%",borderRadius:20,paddingStart:45,fontWeight:"800",color:"#3C2F2F",marginHorizontal:30,height:55}}></TextInput>
          </View>
          <View style={{}}>
          <Text style={{color:"#808080",marginStart:60,fontWeight:"600",fontSize:15,top:13,zIndex:2,height:24,width:130,backgroundColor:"white",paddingStart:7}}>Delivery Address</Text>
          <TextInput value="123 Main St Apartment 4A,New York, NY" editable={false} style={{borderWidth:2,borderColor:"#E1E1E1",width:"85%",borderRadius:20,paddingStart:45,fontWeight:"800",color:"#3C2F2F",marginHorizontal:30,height:55}}></TextInput>
          </View>
          <View style={{}}>
          <Text style={{color:"#808080",marginStart:60,fontWeight:"600",fontSize:15,top:13,zIndex:2,height:24,width:110,backgroundColor:"white",paddingStart:7}}>Password  <Ionicons name="lock-closed" size={20} color="#808080" /></Text>
          <TextInput value="● ● ● ● ● ● ● ● ●" editable={false} style={{borderWidth:2,borderColor:"#E1E1E1",width:"85%",borderRadius:20,paddingStart:45,fontWeight:"800",fontSize:20,color:"#3C2F2F",marginHorizontal:30,height:55}}></TextInput>
          </View>
          <View style={{backgroundColor:"#E1E1E1",width:315,height:1,top:40,left:40}}></View>
          <TouchableOpacity style={{top:80,left:40}}><Text style={{fontSize:20,color:"#808080",fontWeight:"500"}}>Payment Details                             <Text><Ionicons name="chevron-forward" size={22} color="#777" /></Text></Text></TouchableOpacity>
          <TouchableOpacity style={{top:110,left:40}}><Text style={{fontSize:20,color:"#808080",fontWeight:"500"}}>Order History                                  <Text><Ionicons name="chevron-forward" size={22} color="#777" /></Text></Text></TouchableOpacity>
          {/* <TouchableOpacity onPress={handleLogout} style={{top:50,left:40}}><Text style={{fontSize:20,color:"#808080",fontWeight:"500"}}>LogOut</Text></TouchableOpacity> */}
          
           
          
         
        </View>

      </View>
    </View>
  );
};

export default ProfileScreen;
