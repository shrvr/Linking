import React, { Component, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import styles from "./styles";


const UpcomingTrips = () => {

    const [tripList, setTripList] = useState([
        { date: '03/07/2021', place: 'Resturant A' },
        { date: '06/07/2021', place: 'Park A' },
        { date: '07/07/2021', place: 'Museum A' },
    ]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Upcoming Trips</Text>
            <View style={styles.list}>
                <FlatList
                    data={tripList}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={({ item }) => (
                    
                        <View style={styles.item}>

                            <Text style={{ marginRight: 20, marginLeft: 10 }}>{item.date}</Text>
                            <Text style={{ flexShrink: 1, marginLeft: 10, marginRight: 10 }}>{item.place}</Text>
                            <Button title="View Match" />

                        </View>
                    )}
                />
            </View>
        </View>
    )
}
export default UpcomingTrips;