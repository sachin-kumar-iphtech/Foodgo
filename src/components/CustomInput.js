import React from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

const CustomInput = ({
  iconName,
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
  touched,
  secureTextEntry,
  showPassword,
  setShowPassword,
  keyboardType = "default",
}) => {
  return (
    <View style={{ marginBottom: 10 }}>
      {/* Input Row */}
      <View style={styles.inputRow}>
        <MaterialIcons name={iconName} size={20} color="#666" style={styles.leftIcon} />

        <TextInput
          placeholder={placeholder}
          style={styles.inputWithIcon}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
        />

        {/* Show / Hide Password Button */}
        {setShowPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.rightIcon}>
            <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {/* Validation Error */}
      {touched && error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
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
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 3,
    marginLeft: 10,
  },
});

export default CustomInput;
