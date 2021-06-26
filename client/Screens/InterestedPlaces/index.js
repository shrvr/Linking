import React from 'react';
import { View, ScrollView, FlatList } from 'react-native';

// importing stylesheet
import styles from './style';

import CardComp from './CardComp';

const dataSource = [
    {
        id: 0,
        placename: "McDonald's",
        placelocation: "Windsor"
    },
    {
        id: 1,
        placename: "Starbucks",
        placelocation: "Toronto"
    },
    {
        id: 2,
        placename: "Domino's Pizza",
        placelocation: "Brampton"
    },
    {
        id: 3,
        placename: "Harbour Front",
        placelocation: "Toronto"
    },
    {
        id: 4,
        placename: "Wendy's",
        placelocation: "New Delhi"
    },
    {
        id: 5,
        placename: "Blue Mountain",
        placelocation: "Ontario"
    },
    {
        id: 6,
        placename: "CN Tower",
        placelocation: "Toronto"
    },
    {
        id: 7,
        placename: "Tim Hortons",
        placelocation: "YorkVille"
    },
    {
        id: 8,
        placename: "Art Museum",
        placelocation: "Toronto"
    },
    {
        id: 9,
        placename: "Art Museum",
        placelocation: "Toronto"
    },
    {
        id: 10,
        placename: "Art Museum",
        placelocation: "Toronto"
    },
]

export default function InterestedPlaces() {
    return (
        <View style={styles.container}>
            <FlatList
                data={dataSource}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => {
                    return <CardComp
                        pname={item.placename}
                        plocation={item.placelocation}
                    />
                }}
            />
        </View>
    );
}
