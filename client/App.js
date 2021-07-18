import React, { useReducer, useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './Screens/SignInScreen/SignIn';
import SignUp from './Screens/SignUpScreen/SignUp';
import TermsAndConditions from './Screens/SignUpScreen/TermsAndConditions';

import HomeScreen from './Screens/HomeScreen/HomeScreen';
import ProfilePage from './Screens/HomeScreen/ProfilePage';
import Places from './Screens/HomeScreen/Places_Category/Places';
import MapView from './Screens/MapViewScreen';
import InterestedPlaces from './Screens/InterestedPlaces';
import ChatHistory from './Screens/ChatHistory';
import MatchedUsersList from './Screens/MatchedUsersList';
import ChatWindow from './Screens/ChatWindow';
import * as UsersAPI from './api/index';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';

const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const InterestedPlacesStack = createStackNavigator();
const ChatHistoryStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
export const AuthContext = React.createContext();

function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomeScreen} />
            <HomeStack.Screen name="Places" component={Places} />
            <HomeStack.Screen name="MapView" component={MapView} />
        </HomeStack.Navigator>
    );
}

function ProfileStackScreen() {
    const { signOut } = React.useContext(AuthContext);
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen
                name="Profile"
                component={ProfilePage}
                options={{
                    headerRight: () => (
                        <MaterialIcons
                            name="logout"
                            size={24}
                            onPress={signOut}
                        />
                    ),
                }}
            />
        </ProfileStack.Navigator>
    );
}

function ChatHistoryStackScreen() {
    return (
        <ChatHistoryStack.Navigator>
            <ChatHistoryStack.Screen
                name="ChatHistory"
                component={ChatHistory}
            />
            <ChatHistoryStack.Screen
                name="ChatWindow"
                component={ChatWindow}
            />
        </ChatHistoryStack.Navigator>
    );
}

function InterestedPlacesStackScreen() {
    return (
        <InterestedPlacesStack.Navigator initialRouteName="Interested Places">
            <InterestedPlacesStack.Screen
                name="Interested Places"
                component={InterestedPlaces}
            />
            <InterestedPlacesStack.Screen
                name="MatchedUsersList"
                component={MatchedUsersList}
            />
            <InterestedPlacesStack.Screen
                name="ChatWindow"
                component={ChatWindow}
            />
        </InterestedPlacesStack.Navigator>
    );
}

function DrawerRoutes() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#ffffff"
            inactiveColor="#757575"
            barStyle={{ backgroundColor: '#000000' }}
        >
            <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="home" color={color} size={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="My Trips"
                component={InterestedPlacesStackScreen}
                options={{
                    tabBarLabel: 'Interested Places',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="place" color={color} size={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="Chat History"
                component={ChatHistoryStackScreen}
                options={{
                    tabBarLabel: 'Chat History',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="chat" color={color} size={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStackScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons
                            name="account-circle"
                            color={color}
                            size={24}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default function App() {
    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
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

            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async (data) => {
                try {
                    const token = await UsersAPI.signIn(data);
                    await UsersAPI.setStorage(token._user);
                    dispatch({ type: 'SIGN_IN', token: token._user });
                } catch (error) {
                    console.log(error);
                }
            },
            signOut: async () => {
                await UsersAPI.logout();
                dispatch({ type: 'SIGN_OUT' });
                Toast.show('Logged Out!', {
                    duration: Toast.durations.LONG,
                })
            },
            signUp: async (data) => {
                try {
                    const token = await UsersAPI.signUp(data);
                    await UsersAPI.setStorage(token._user);
                    dispatch({ type: 'SIGN_IN', token: token._user });
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        []
    );

    return (
        <RootSiblingParent>
            <AuthContext.Provider value={authContext}>
                <NavigationContainer>
                    <Stack.Navigator>
                        {state.userToken == '' ||
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
                                name="DrawerRoutes"
                                component={DrawerRoutes}
                            />
                        )}
                    </Stack.Navigator>
                </NavigationContainer>
            </AuthContext.Provider>
        </RootSiblingParent>
    );
}
