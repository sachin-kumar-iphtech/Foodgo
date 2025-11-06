
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Formik } from "formik";
import * as Yup from "yup";

const LoginScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Phone must be 10 digits"),

    password: Yup.string()
      .required("Password is required")
      .min(6, "Minimum 6 characters required"),
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#0d0475" }}>
      <Text style={styles.welcomeText}>Welcome Back !</Text>

      <View style={styles.whiteContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
            <Text style={styles.logoText}>
              ☀︎ afri<Text style={{ color: "red" }}>valley ♕</Text>
            </Text>

            <Text style={styles.infoText}>
              Please login with your personal information
            </Text>

            <Formik
              initialValues={{ phone: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log("Form Data:", values);
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.formContainer}>
                  <View style={styles.inputRow}>
                   <MaterialIcons name="phone" size={22} color="#666" style={styles.leftIcon} />
                  {/* Phone Input */}
                  <TextInput
                    placeholder="Enter Number"
                    style={styles.inputWithIcon}
                    keyboardType="numeric"
                    maxLength={10}
                    value={values.phone}
                    onChangeText={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                  />
                  </View>
                  {touched.phone && errors.phone && (
                    <Text style={styles.error}>{errors.phone}</Text>
                  )}
                      <View style={styles.inputRow}>
                   <MaterialIcons name="lock" size={22} color="#666" style={styles.leftIcon} />
                  {/* Password Input */}
                  <TextInput
                    placeholder="Enter Password"
                    style={styles.inputWithIcon}
                    secureTextEntry
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                  />
                  <TouchableOpacity
                   onPress={() => setShowPassword(!showPassword)}
                   style={styles.rightIcon}
                  >
                 <Ionicons
                 name={showPassword ? "eye" : "eye-off"}
                 size={22}
                color="#666"
                />
               </TouchableOpacity>
             </View>
                  {touched.password && errors.password && (
                    <Text style={styles.error}>{errors.password}</Text>
                  )}
                  <TouchableOpacity onPress={()=>navigation.navigate("Forget")}>
                  <Text style={styles.forgetText}>Forget Password?</Text>
                  </TouchableOpacity>


                  <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.btnText}>Login</Text>
                  </TouchableOpacity>

                  <Text style={styles.orText}>Login with</Text>

                  {/* Social Login Buttons */}
                  <View style={styles.socialContainer}>
                    <View style={styles.socialButton}>
                      <Image
                        source={require("../../assets/facebook.png")}
                        style={styles.socialImageLarge}
                      />
                    </View>
                    <View style={styles.socialButton}>
                      <Image
                        source={require("../../assets/google.png")}
                        style={styles.socialImage}
                      />
                    </View>
                    <View style={styles.socialButton}>
                      <Image
                        source={require("../../assets/apple.png")}
                        style={styles.socialImage}
                      />
                    </View>
                  </View>

                  {/* Sign Up */}
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                    style={{ marginTop: 70 }}
                  >
                    <Text style={styles.signUpText}>
                      Don't have an account?
                      <Text style={styles.signUpLink}> Sign up</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeText: {
    textAlign: "center",
    marginTop: 80,
    fontSize: 28,
    fontWeight: "700",
    color: "white",
  },
  whiteContainer: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    marginTop: 80,
    borderTopLeftRadius: 130,
    paddingTop: 30,
  },
  logoText: {
    textAlign: "center",
    fontSize: 27,
    color: "blue",
  },
  infoText: {
    textAlign: "center",
    padding: 20,
    fontSize: 15,
    color: "#333",
  },
  formContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#666",
    padding: 12,
    borderRadius: 30,
    marginTop: 12,
  },
  button: {
    backgroundColor: "#0d0475",
    padding: 12,
    borderRadius: 30,
    marginTop: 20,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 3,
  },
  forgetText: {
    color: "blue",
    padding: 5,
    marginTop: 5,
  },
  orText: {
    padding: 25,
    textAlign: "center",
    fontSize: 15,
    color: "#333",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  socialButton: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  socialImage: { width:25, height: 25, borderRadius: 50 },
  socialImageLarge: { width: 45, height: 45, borderRadius: 50 },
  signUpText: {
    textAlign: "center",
    fontSize: 15,
    color: "#333",
  },
  signUpLink: {
    fontSize: 17,
    color: "blue",
    fontWeight: "500",
  },
  //input row
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#666",
    borderRadius: 30,
    marginTop: 12,
    paddingHorizontal: 12,
    height: 50,
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
  
});

export default LoginScreen;
