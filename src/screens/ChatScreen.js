import React,{useState}from "react";
import { View, Text, TouchableOpacity,Image} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import TouchProgressBar from "../components/TouchProgressBar"; 
import { TextInput } from "react-native-gesture-handler";

const Product1Screen = () => {
  
  const navigation = useNavigation();
  const[count,setCount]=useState(0);
  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Custom Back Button */}
      <TouchableOpacity
        style={{
          marginTop: 30,
          marginLeft: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={25} color="#000" />
      </TouchableOpacity>
      <Ionicons name="filter" size={25} color="#000"  style={{top:-20, left:350}}/>

      {/* Your main content */}
      <View style={{flexDirection:"row",left:20}}>
        <View style={{height:50,width:50,backgroundColor:"#3C2F2F",borderRadius:25,justifyContent:"center",alignItems:"center"}}><Ionicons name="person" size={24} color="#FFFFFF" /></View>
        <View style={{height:50,width:250,backgroundColor:"#F3F4F6",borderRadius:20,justifyContent:"center",alignItems:'center',left:15}}><Text style={{color:"#3C2F2F",fontFamily:"roboto",fontSize:17,fontWeight:700}}>Hi, how can I help you?</Text></View>
      </View>
      <View style={{flexDirection:"row",right:20,justifyContent:"flex-end",top:40}}>
      <View style={{height:130,width:250,backgroundColor:"#EF2A39",borderRadius:20,justifyContent:"center",alignItems:'center',right:20,padding:20}}><Text style={{color:"#ffffff",fontFamily:"roboto",fontSize:17,fontWeight:700}}>Hello i ordered two fried chicken burgers.can i know how much time it will get to arrive?</Text></View>
        <View style={{height:50,width:50,backgroundColor:"#EF2A39",borderRadius:25,justifyContent:"center",alignItems:"center"}}>
           <Image
            source={require("../../assets/image14.png")}
            style={{ resizeMode: "cover",height:46,width:46,borderRadius:50}}
          /> 
        </View>
        
      </View>
      <View style={{flexDirection:"row",left:20,top:80}}>
        <View style={{height:50,width:50,backgroundColor:"#3C2F2F",borderRadius:25,justifyContent:"center",alignItems:"center"}}><Ionicons name="person" size={24} color="#FFFFFF" /></View>
        <View style={{height:50,width:250,backgroundColor:"#F3F4F6",borderRadius:20,justifyContent:"center",alignItems:'center',left:15}}><Text style={{color:"#3C2F2F",fontFamily:"roboto",fontSize:17,fontWeight:700}}>Ok, please let me check!</Text></View>
      </View>
      <View style={{flexDirection:"row",right:20,justifyContent:"flex-end",top:110}}>
      <View style={{height:60,width:100,backgroundColor:"#EF2A39",borderRadius:20,justifyContent:"center",alignItems:'center',right:20,padding:20}}><Text style={{color:"#ffffff",fontFamily:"roboto",fontSize:17,fontWeight:700}}>Sure...</Text></View>
        <View style={{height:50,width:50,backgroundColor:"#EF2A39",borderRadius:25,justifyContent:"center",alignItems:"center"}}>
           <Image
            source={require("../../assets/image14.png")}
            style={{ resizeMode: "cover",height:46,width:46,borderRadius:50}}
          /> 
        </View>
        
      </View>
      <View style={{flexDirection:"row",left:20,top:140}}>
        <View style={{height:50,width:50,backgroundColor:"#3C2F2F",borderRadius:25,justifyContent:"center",alignItems:"center"}}><Ionicons name="person" size={24} color="#FFFFFF" /></View>
        <View style={{height:80,width:250,backgroundColor:"#F3F4F6",borderRadius:20,justifyContent:"center",alignItems:'center',left:15}}><Text style={{color:"#3C2F2F",fontFamily:"roboto",fontSize:17,fontWeight:700,paddingHorizontal:15}}>It'll get 25 minutes to arrive to your address</Text></View>
      </View>
      <View style={{flexDirection:"row",right:20,justifyContent:"flex-end",top:180}}>
      <View style={{height:80,width:250,backgroundColor:"#EF2A39",borderRadius:20,justifyContent:"center",alignItems:'center',right:20,padding:20}}><Text style={{color:"#ffffff",fontFamily:"roboto",fontSize:17,fontWeight:700}}>Ok, thanks you for your support</Text></View>
        <View style={{height:50,width:50,backgroundColor:"#EF2A39",borderRadius:25,justifyContent:"center",alignItems:"center"}}>
           <Image
            source={require("../../assets/image14.png")}
            style={{ resizeMode: "cover",height:46,width:46,borderRadius:50}}
          /> 
        </View>
        
      </View>
    {/* Bottom Input Section */}
<View style={{ 
  position: "absolute",
  bottom:10,
  alignSelf: "center"
}}>
  <View 
    style={{
      height: 70,
      width: 350,
      borderRadius: 20,
      backgroundColor: "#FFFFFF",
      elevation: 2,
      flexDirection: "row",
      alignItems: "center",
      paddingStart: 30,
      top:-30,
    }}
  >
    <TextInput 
      style={{ flex: 1, fontSize: 18,color:"#DBDADA",fontWeight:400 }}
      placeholder="Type here"
    />

    <TouchableOpacity 
      style={{
        backgroundColor: "#EF2A39",
        height: 70,
        width: 70,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10
      }}
    >
      <Text style={{ color: "#fff" }}><Ionicons name="send" size={24} color="#FFFFFF" />
      </Text>
    </TouchableOpacity>
  </View>
</View>

    </View>
  );
};

export default Product1Screen;
