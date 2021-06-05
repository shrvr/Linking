import React, { useState } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Components/Home";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Main from "./Components/Main";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./Components/HomePage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MyProfile from "./Components/MyProfile";
import MyTrips from "./Components/MyTrips";
import SignOut from "./Components/SignOut";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


export default function App() {

  const [userToken, setUserToken] = useState("abc");

  return (
      <NavigationContainer>
          {userToken == null | userToken == "" ?
        <Stack.Navigator headerMode="float">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Main" component={Main} />
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
