import React,{useState}from "react";
import { View, Text, TouchableOpacity,Image} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import TouchProgressBar from "../components/TouchProgressBar"; 

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
          marginTop: 40,
          marginLeft: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={25} color="#000" />
      </TouchableOpacity>
      <Ionicons name="search" size={25} color="#000"  style={{top:-20, left:350}}/>

      {/* Your main content */}
      <View>
       <Image
              source={require("../../assets/image9.png")}
              style={{resizeMode: "contain",margin:"auto",height:320,width:350}}
                     /> 
                     <Text style={{color:"#3C2F2F", fontSize:25,fontWeight:"600",left:20}}>Cheeseburger Wendy's Burger</Text>
                     <Text style={{left:20,top:10,color:"#FF9633"}}>★  <Text style={{color:"#6A6A6A"}}>4.9  ⎼⎼  26  mins</Text></Text>
                     <Text style={{fontSize:17,paddingHorizontal:20,lineHeight:"171.7%",top:20,fontWeight:"300",color:"#6A6A6A",fontFamily:"roboto"}}>The Cheeseburger Wendy's Burger is a classic fast food burger that packs a punch of flavor in every bite. Made with a juicy beef patty cooked to perfection, it's topped with melted American cheese, crispy lettuce, ripe tomato, and crunchy pickles.</Text>
      </View>
      <View style={{flexDirection:"row"}}>
      <View style={{margin:20,paddingTop:10}}>
        <Text style={{fontSize:17,color:"rgba(60, 47, 47, 1)",paddingVertical:10}}>Spicy</Text>
      <TouchProgressBar />
      <Text style={{color:"green", fontSize:15,fontWeight:500,top:20}}>Mild</Text>
      <Text style={{color:"#EF2A39",fontSize:15,fontWeight:600,left:120}}>Hot</Text>
      </View>
      <View style={{margin:20,paddingTop:8,elevation:5}}>
        <Text style={{paddingTop:"15",left:40,fontSize:17,color:"rgba(60, 47, 47, 1)"}}>Portion</Text>
        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",top:10,left:30}}>
          <TouchableOpacity style={{height:40,width:40,backgroundColor:"#EF2A39",borderRadius:10,justifyContent:"center",alignItems:"center",elevation:5,shadowColor:"orange"}} onPress={decrement}><Text style={{color:"white",fontSize:30,fontWeight:"bold"}}>-</Text></TouchableOpacity>
          <Text style={{left:10,fontSize:20}}>{count}</Text>
          <TouchableOpacity style={{height:40,width:40,backgroundColor:"#EF2A39",borderRadius:10,justifyContent:"center",alignItems:"center",left:20,elevation:5,shadowColor:"orange"}} onPress={()=>setCount(count+1)}><Text style={{color:"white",fontSize:20,fontWeight:"bold"}}>+</Text></TouchableOpacity>
        </View>
      </View>
      
      </View>
      <View style={{flexDirection:"row",top:30}}><TouchableOpacity style={{backgroundColor:"#EF2A39",height:70,width:104,borderRadius:20,alignItems:"center",justifyContent:"center",marginStart:20}}><Text style={{color:"#FFFFFF",fontSize:22,fontWeight:"600"}}>${count*4.12}</Text></TouchableOpacity> 
      <TouchableOpacity onPress={() => navigation.navigate("PaymentScreen")} style={{backgroundColor:"rgba(60, 47, 47, 1)",height:70,width:200,borderRadius:20,justifyContent:"center",alignItems:"center",marginHorizontal:40,}}><Text style={{color:"white",fontSize:18,fontWeight:"600"}}>ORDER NOW</Text></TouchableOpacity></View>
      
    </View>
  );
};

export default Product1Screen;
