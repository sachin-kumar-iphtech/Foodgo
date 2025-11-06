import React from "react";
import {Text, View, ScrollView, TouchableOpacity,Buttons,Image,StyleSheet,TextInput} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Formik } from "formik";
import * as Yup from "yup";
const ForgetScreen=({navigation})=>{
    const validationSchema = Yup.object().shape({
        phone: Yup.string()
          .required("Phone number is required")
          .matches(/^[0-9]{10}$/, "Phone must be 10 digits"),
       
      });
    return(
        <View style={{flex:1,backgroundColor:"white"}}>
            <TouchableOpacity
      style={styles.backButton}
      onPress={() => navigation.goBack()}
    >
      <Ionicons name="arrow-back" size={28} color="#0d0475" />
    </TouchableOpacity>
<View style={{flex:1,alignItems:"center",marginTop:200}}>


    <Image
  source={require("../../assets/forget1.png")}
  style={{ width: 150, height: 150}}
/>
<Text style={{fontSize:27,fontWeight:700,paddingTop:20}}>Forget Password</Text>
<Text style={{fontSize:15,paddingTop:15,textAlign:"center"}}>We need your registered number for forget!{"\n"}password</Text>
<Formik
              initialValues={{  phone: ""}}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log("Form Data:", values);
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.formContainer}>
                  

                  {/* Phone with icon */}
                  <View style={styles.inputRow}>
                    <MaterialIcons name="phone" size={20} color="#666" style={styles.leftIcon} />
                    <TextInput
                      placeholder="Enter Number"
                      style={styles.inputWithIcon}
                      keyboardType="phone-pad"
                      maxLength={10}
                      value={values.phone}
                      onChangeText={handleChange("phone")}
                      onBlur={handleBlur("phone")}
                    />
                  </View>
                  {touched.phone && errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
                  <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.btnText}>Submit</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
</View>
</View>
    )
}
const styles = StyleSheet.create({
    
    
   
   
  
   
    button: {
      backgroundColor: "#0d0475",
      padding: 12,
      borderRadius: 30,
      marginTop: 20,
    },
    btnText: { color: "#fff", textAlign: "center", fontWeight: "600" },
    error: { color: "red", fontSize: 12, marginTop: 3 },
    orText: {
      padding: 25,
      textAlign: "center",
      fontSize: 15,
      color: "#333",
    },
   
   
   
  
    // new styles for icon inputs
    inputRow: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#666",
      borderRadius: 30,
      marginTop: 12,
      paddingHorizontal: 12,
      height: 50,
      width:"90%",
      backgroundColor: "white",
    },
    leftIcon: {
      marginRight: 8,
    },
    inputWithIcon: {
      flex: 1,
      fontSize: 16,
      paddingVertical: 0,
    },
    rightIcon: {
      marginLeft: 8,
      padding: 6,
    },
    //back button
    backButton: {
        position: "absolute",
        top: 50,       // adjust for status bar height
        left: 20,
        zIndex: 10,
        borderRadius: 20,
        padding: 6,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        elevation: 0,
      },
      
  });
export default ForgetScreen;