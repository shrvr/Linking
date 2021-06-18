import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HeaderLeft from "../HeaderLeft";
import HomeScreen from "../HomeScreen";
import Places from "../Places_Category/Places";

const Stack = createStackNavigator();

const HomePage = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => <HeaderLeft />,

        headerStyle: {
          backgroundColor: "#fff", //Set Header color
        },
        headerTintColor: "#000", //Set Header text color
        headerTitleStyle: {
          fontWeight: "bold", //Set Header text style
          marginLeft: 80,
        },
      }}
    >
      <Stack.Screen name="Main Page" component={HomeScreen} />
      <Stack.Screen name="Places" component={Places} />
    </Stack.Navigator>
  );
};
export default HomePage;
