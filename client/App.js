import React, { useState } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "./Screens/SignInScreen/SignIn";
import SignUp from "./Screens/SignUpScreen/SignUp";

import { createDrawerNavigator } from "@react-navigation/drawer";
import HomePage from "./Screens/HomeScreen/HomePage";
import MyProfile from "./Screens/HomeScreen/MyProfile";
import MyTrips from "./Screens/HomeScreen/MyTrips";
import SignOut from "./Screens/HomeScreen/SignOut";


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


export default function App() {

  const [userToken, setUserToken] = useState("");

  return (
      <NavigationContainer>
          {userToken == null | userToken == "" ?
        <Stack.Navigator headerMode="float">
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
        :

        <Drawer.Navigator initialRouteName="HomePage">
          <Drawer.Screen name="Home" component={HomePage} />
          <Drawer.Screen name="Profile" component={MyProfile} />
          <Drawer.Screen name="My Trips" component={MyTrips} />
          <Drawer.Screen name="SignOut" component={SignOut} />

        </Drawer.Navigator>
      }
    </NavigationContainer>
  );
}
