import React, { useState, useEffect } from 'react';

// importing stylesheet
import styles from './style';


import { Platform, Text, View, Switch, FlatList } from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import CardComp from './CardComp';

// importing getMatchedUsers() from client/api/index.js
import { getMatchedNearbyUsers, deleteUsersList } from "../../../api/index";

import * as NearbyUsers from '../../../api/index';

export default function MatchedNearbyUsers({ route, navigation }) {

    const [location, setLocation] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isEnabled, setIsEnabled] = useState(false);
    const [MatchedUsers, setMatchedUsers] = useState([]);

    useEffect(() => {
        if (isEnabled) {

            (async () => {
                if (Platform.OS === "android" && !Constants.isDevice) {
                    setErrorMsg("Something went wrong!");
                    return;
                } else if (Platform.OS === "ios" && !Constants.isDevice) {
                    setErrorMsg("Something went wrong!");
                    return;
                }
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    setErrorMsg("Permission to access location was denied");
                    return;
                }
                let location = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.Highest,
                });
                setLocation(location);
                setLatitude(location.coords.latitude);
                setLongitude(location.coords.longitude);
                console.log(longitude, latitude);
                NearbyUsers.getUserLocation({
                    longitude,
                    latitude
                });

            })
                ();
        }
    }, [latitude, longitude, isEnabled]);

    useEffect(() => {
        if (isEnabled) {
            async function fetchUsers() {
                const users = await getMatchedNearbyUsers();
                console.log(users);
                setMatchedUsers(users);
            }
            fetchUsers();
        }
        else {
            async function deleteUsers() {
                const users = await deleteUsersList();
                console.log(users);
                setMatchedUsers(users);
            }
            deleteUsers();
        }
    }, [MatchedUsers, isEnabled]);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: "center", paddingTop: 8 }}>
                <Text style={{ fontSize: 16 }}>Location: </Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#00008B" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            {isEnabled == true ?
                <FlatList
                    data={MatchedUsers}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => {
                        return <CardComp
                            fname={item.firstName}
                            lname={item.lastName}
                            age={item.age}
                            distance={item.distance}
                            navigateTo={navigation}
                            matchedUserID={item._id}
                        />
                    }}
                /> :
                null
            }
            {isEnabled == false ? <Text style={styles.text2}>Please enable location toggle to view matched users!</Text> : null}
        </View>
    );
}
