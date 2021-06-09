import { useNavigation } from "@react-navigation/core";
import React, { Component, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import styles from "./styles";


const PreviousTrips = () => {

    const [tripList, setTripList] = useState([]);
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Previous Trips</Text>
            { tripList && tripList.length ?
                <View style={styles.list}>
                    <FlatList

                        data={tripList}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={({ item }) => (

                            <View style={styles.item}>

                                <Text style={{ marginRight: 20, marginLeft: 10 }}>{item.date}</Text>
                                <Text style={{ flexShrink: 1, marginLeft: 10, marginRight: 10 }}>{item.place}</Text>

                            </View>
                        )}
                    />
                </View>
                :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.text2}>No Previous Trips</Text>
                    <Button style={styles.Button2} title="Plan your Travel" onPress={() => { navigation.navigate('Main Page') }} />
                </View>
            }
        </View>
    )
}
export default PreviousTrips;