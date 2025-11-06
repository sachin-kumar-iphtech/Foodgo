import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Formik } from "formik";
import * as Yup from "yup";

const RegisterScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Minimum 3 characters required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Phone must be 10 digits"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Minimum 6 characters required"),
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#0d0475" }}>
      <Text style={styles.headerText}>Create an Account</Text>

      <View style={styles.whiteContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
            <Text style={styles.infoText}>
              Create an account so you can manage your personal finances
            </Text>

            <Formik
              initialValues={{ name: "", phone: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log("Form Data:", values);
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.formContainer}>
                  {/* Name with icon */}
                  <View style={styles.inputRow}>
                    <MaterialIcons name="person" size={20} color="#666" style={styles.leftIcon} />
                    <TextInput
                      placeholder="Enter Your Name"
                      style={styles.inputWithIcon}
                      value={values.name}
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                    />
                  </View>
                  {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

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

                  {/* Password with lock icon and eye toggle */}
                  <View style={styles.inputRow}>
                    <MaterialIcons name="lock" size={20} color="#666" style={styles.leftIcon} />
                    <TextInput
                      placeholder="Enter Password"
                      style={styles.inputWithIcon}
                      secureTextEntry={!showPassword}
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(prev => !prev)} style={styles.rightIcon}>
                      <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color="#666" />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

                  <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.btnText}>Sign Up</Text>
                  </TouchableOpacity>

                  <Text style={styles.orText}>Sign Up with</Text>

                  {/* Social Login */}
                  <View style={styles.socialContainer}>
                    <View style={styles.socialButton}>
                      <Image source={require("../../assets/facebook.png")} style={styles.socialImageLarge} />
                    </View>
                    <View style={styles.socialButton}>
                      <Image source={require("../../assets/google.png")} style={styles.socialImage} />
                    </View>
                    <View style={styles.socialButton}>
                      <Image source={require("../../assets/apple.png")} style={styles.socialImage} />
                    </View>
                  </View>

                  {/* Already have account */}
                  <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{ marginTop: 60 }}>
                    <Text style={styles.signUpText}>
                      Already have an account?
                      <Text style={styles.signUpLink}> Login</Text>
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
  headerText: {
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
  infoText: {
    textAlign: "center",
    padding: 25,
    fontSize: 15,
    color: "#333",
  },
  formContainer: { paddingHorizontal: 20 },

  // old `input` style removed to avoid double borders. Use inputRow + inputWithIcon instead.
  input: {
    // kept for reference - not used by new fields
  },

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
  socialImage: { width: 25, height: 25, borderRadius: 50 },
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

export default RegisterScreen;
