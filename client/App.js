import React, { useReducer, useEffect } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "./Screens/SignInScreen/SignIn";
import SignUp from "./Screens/SignUpScreen/SignUp";
import TermsAndConditions from "./Screens/SignUpScreen/TermsAndConditions";

import { createDrawerNavigator } from "@react-navigation/drawer";
import HomePage from "./Screens/HomeScreen/HomePage";
import MyProfile from "./Screens/HomeScreen/MyProfile";
import MyTrips from "./Screens/HomeScreen/MyTrips";
import SignOut from "./Screens/HomeScreen/SignOut";
import MapView from "./Screens/MapViewScreen";

import * as UsersAPI from "./api/index";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
export const AuthContext = React.createContext();

function DrawerRoutes() {
  return (
    <Drawer.Navigator initialRouteName="HomePage">
      <Drawer.Screen name="Home" component={HomePage} />
      <Drawer.Screen name="Profile" component={MyProfile} />
      <Drawer.Screen name="My Trips" component={MyTrips} />
      <Drawer.Screen name="SignOut" component={SignOut} />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await UsersAPI.getStorage();
      } catch (e) {
        console.log(e);
      }

      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        try {
          const token = await UsersAPI.signIn(data);
          await UsersAPI.setStorage(token._user);
          dispatch({ type: "SIGN_IN", token: token._user });
        } catch (error) {
          console.log(error);
        }
      },
      signOut: async () => {
        await UsersAPI.logout();
        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (data) => {
        try {
          const token = await UsersAPI.signUp(data);
          await UsersAPI.setStorage(token._user);
          dispatch({ type: "SIGN_IN", token: token._user });
        } catch (error) {
          console.log(error);
        }
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator headerMode="float">
          {state.userToken == "" ||
          state.userToken == null ||
          state.userToken == undefined ? (
            <React.Fragment>
              <Stack.Screen
                options={{ headerShown: false }}
                name="SignIn"
                component={SignIn}
              />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen
                name="TermsAndConditions"
                component={TermsAndConditions}
              />
            </React.Fragment>
          ) : (
            <Stack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={DrawerRoutes}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
