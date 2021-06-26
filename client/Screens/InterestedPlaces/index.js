import React, { useState, useEffect } from "react";
import { View, ScrollView, FlatList } from 'react-native';

// importing stylesheet
import styles from './style';

import CardComp from './CardComp';
import { getAllPlaces } from "../../api/index";

export default function InterestedPlaces() {
    const [allPlaces, setAllPlaces] = useState([]);
    useEffect(() => {
        (async () => {
            const places = await getAllPlaces();
            setAllPlaces(places);
        })
            ();
    }, [allPlaces]);

    return (
        <View style={styles.container}>
            <FlatList
                data={allPlaces}
                keyExtractor={item => item._id.toString()}
                renderItem={({ item }) => {
                    return <CardComp
                        _trip={item._id}
                        share={item.share}
                        pname={item.name}
                        plocation={item.vicinity}
                    />
                }}
            />
        </View>
    );
}
