import React,{useState}from "react";
import { View, Text, TouchableOpacity,Image,StyleSheet,Modal} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";



const PaymentScreen = () => {
    const navigation = useNavigation();
    const [checked, setChecked] = useState(false);
    const [visible, setVisible] = useState(false);
  
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Custom Back Button */}
      <TouchableOpacity
        style={{
          marginTop: 34,
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
     <Text style={{fontSize:20,fontWeight:700,color:"#3C2F2F",paddingHorizontal:25}}>Order summary</Text>
     <View style={{flexDirection:"row",justifyContent:"space-between",paddingHorizontal:40,paddingVertical:10,marginTop:10}}>
        <View><Text style={{color:"#7D7D7D",fontFamily:"roboto",fontSize:18}}>Order</Text></View>
        <View><Text style={{color:"#7D7D7D",fontFamily:"roboto",fontSize:18}}>$16.48</Text></View>
     </View>
     <View style={{flexDirection:"row",justifyContent:"space-between",paddingHorizontal:40,paddingVertical:10}}>
        <View><Text style={{color:"#7D7D7D",fontFamily:"roboto",fontSize:18}}>Taxes</Text></View>
        <View><Text style={{color:"#7D7D7D",fontFamily:"roboto",fontSize:18}}>$0.3</Text></View>
     </View>
     <View style={{flexDirection:"row",justifyContent:"space-between",paddingHorizontal:40,paddingVertical:10}}>
        <View><Text style={{color:"#7D7D7D",fontFamily:"roboto",fontSize:18}}>Delivery fees</Text></View>
        <View><Text style={{color:"#7D7D7D",fontFamily:"roboto",fontSize:18}}>$1.5</Text></View>
     </View>
     <View style={{height:1,width:"85%",backgroundColor:"#F0F0F0",justifyContent:"center",marginHorizontal:35,marginVertical:20}}></View>
     <Text style={{fontSize:20,fontWeight:700,color:"#3C2F2F",paddingHorizontal:25}}>Total:</Text>
     <View style={{flexDirection:"row",justifyContent:"space-between",paddingHorizontal:40,paddingVertical:10}}>
        <View><Text style={{color:"#3C2F2F",fontFamily:"roboto",fontSize:14,fontWeight:"700"}}>Estimated delivery time:</Text></View>
        <View><Text style={{color:"#3C2F2F",fontFamily:"roboto",fontSize:14,fontWeight:"700"}}>15-30mins</Text></View>
     </View>
     <Text style={{fontSize:20,fontWeight:700,color:"#3C2F2F",paddingHorizontal:25,top:50}}>Payment methods</Text>
     <View style={{height:80,width:350,backgroundColor:"#3C2F2F",marginHorizontal:25,borderRadius:20,flexDirection:"row"}}>
        <Image
                  source={require("../../assets/mastercard.png")}
                  style={{height:60,width:100,top:10,left:20}}
                />
                <Text style={{color:"#FFFFFF",fontSize:14,fontFamily:"roboto",paddingVertical:20,left:40}}>Credit card {"\n"}<Text style={{color:"#808080"}}>5105 **** **** 0505</Text></Text>
                <View style={{ position: "relative",top:23,left:80 }}>
  <Ionicons name="ellipse" size={20} color="white" style={{ position: "absolute" ,top:6,left:6}} />
  <Ionicons name="ellipse-outline" size={32} color="white" />
</View>



     </View>
     <View style={{height:80,width:350,backgroundColor:"#F3F4F6",marginHorizontal:25,borderRadius:20,flexDirection:"row",top:20}}>
        <Image
                  source={require("../../assets/visa.png")}
                  style={{height:55,width:110,top:15,left:15}}
                />
                <Text style={{color:"#3C2F2F",fontSize:14,fontFamily:"roboto",paddingVertical:20,left:40}}>Debit card {"\n"}<Text style={{color:"#808080"}}>3566 **** **** 0505</Text></Text>
                <View style={{ position: "relative",top:23,left:75 }}>
  <Ionicons name="ellipse" size={20} color="white" style={{ position: "absolute" ,top:6,left:6}} />
  <Ionicons name="ellipse-outline" size={32} color="white" />
</View>



     </View>
     <View style={{flexDirection:"row",paddingHorizontal:25,top:50}}>
     <TouchableOpacity onPress={() => setChecked(!checked)}>
  <Ionicons
    name={checked ? "checkbox" : "checkbox-outline"}
    size={28}
    color="#EF2A39"
  />
</TouchableOpacity><Text style={{color:"#808080",fontSize:16,left:15,top:3}}>Save card details for future payments</Text>
     </View>
     <View style={{flexDirection:"row",position:"absolute",bottom:60,paddingHorizontal:25}}>
        <Text style={{color:"#808080",fontFamily:"Roboto",fontSize:18}}>Total price {"\n"}{"\n"}<Text style={{fontSize:32,color:"#EF2A39"}}>$ <Text style={{color:"#000000",fontSize:32,fontWeight:700}}>18.19</Text></Text></Text>
      
        <TouchableOpacity  onPress={() => setVisible(true)} style={{height:70,width:209,backgroundColor:"#3C2F2F",justifyContent:"center",alignItems:"center",borderRadius:20,top:15,left:33}}><Text style={{fontSize:18,fontWeight:600,color:"#FFFFFF"}}>Pay Now</Text></TouchableOpacity>
     </View>
     {/* modal popup */}
     <Modal
  transparent
  visible={visible}
  animationType="fade"
  onRequestClose={() => setVisible(false)}
>
  <View style={styles.overlay}>
    <View style={styles.popupContainer}>

      {/* Red Circle with Check Icon */}
      <View style={styles.iconCircle}>
      <FontAwesome5 name="check" size={35} color="white" solid />

      </View>

      {/* Success Text */}
      <Text style={styles.title}>Success  !</Text>

      {/* Description */}
      <Text style={styles.subText}>
        Your payment was successful.{"\n"}
        A receipt for this purchase has{"\n"}
        been sent to your email.
      </Text>

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setVisible(false)}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>

    </View>
  </View>
</Modal>

    </View>
    
  
  );
};
//modal style
const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
    },
    popupContainer: {
      width: 320,
      height:360,
      backgroundColor: "#fff",
      borderRadius: 20,
      padding: 25,
      alignItems: "center",
      elevation: 10,
    },
    iconCircle: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: "#EF2A39",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 15,
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#EF2A39",
      marginBottom: 10,
    },
    subText: {
      fontSize: 14,
      color: "#808080",
      textAlign: "center",
      marginBottom: 20,
      lineHeight: 20,
    },
    button: {
      backgroundColor: "#EF2A39",
      paddingVertical: 15,
      paddingHorizontal: 50,
      borderRadius: 15,
      top:15,
      height:60,
      width:220,
      justifyContent:"center",alignItems:"center"
    },
    buttonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
  });
  

export default PaymentScreen;
