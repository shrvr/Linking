import React, { Component } from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UpcomingTrips from "../UpcomingTrips";
import PreviousTrips from "../PreviousTrips";
import { createStackNavigator } from "@react-navigation/stack";
import BackArrow from "../BackArrow";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const TabStack = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Upcoming" component={UpcomingTrips} />
            <Tab.Screen name="Previous" component={PreviousTrips} />
        </Tab.Navigator>
    )
}


const MyTrips = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#fff', //Set Header color

                },
                headerLeft: () => <BackArrow />,
                headerTintColor: '#000', //Set Header text color
                headerTitleStyle: {
                    fontWeight: 'bold', //Set Header text style
                    marginLeft: 100
                },
            }}
        >
            <Stack.Screen name="Trips" component={TabStack} />
        </Stack.Navigator>
    )
}
export default MyTrips;