import { LogBox } from "react-native";
LogBox.ignoreLogs([
  "InteractionManager has been deprecated",
]);

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import RegisterScreen from "./src/screens/RegisterScreen";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ForgetScreen from "./src/screens/ForgetScreen";
import SplashScreen from "./src/screens/SplashScreen";
import AuthCheckScreen from "./src/screens/AuthCheckScreen";
import BottomTabs from "./src/navigation/BottomTabs";
import Product1Screen from "./src/screens/Product1Screen";
import Product2Screen from "./src/screens/Product2Screen";
import Product3Screen from "./src/screens/Product3Screen";
import Product4Screen from "./src/screens/Product4Screen";
import PaymentScreen from "./src/screens/PaymentScreen";
import ProductDetails from "./src/screens/ProductDetails";
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* 1️⃣ Show Splash first */}
        <Stack.Screen name="Splash" component={SplashScreen} />

        {/* 2️⃣ Check AsyncStorage login */}
        <Stack.Screen name="AuthCheck" component={AuthCheckScreen} />

        {/* 3️⃣ Actual screens */}
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Forget" component={ForgetScreen} />
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
      
        <Stack.Screen name="Home" component={BottomTabs} />
        <Stack.Screen name="Product1Screen" component={Product1Screen}/>
        <Stack.Screen name="Product2Screen" component={Product2Screen}/>
        <Stack.Screen name="Product3Screen" component={Product3Screen}/>
        <Stack.Screen name="Product4Screen" component={Product4Screen}/>
        <Stack.Screen name="PaymentScreen" component={PaymentScreen}/>
        <Stack.Screen name="ProductDetails" component={ProductDetails} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
