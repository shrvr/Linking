import React, { useState, useEffect } from 'react';
import { View, ScrollView, FlatList} from 'react-native';

// importing stylesheet
import styles from './style';

import CardComp from './CardComp';

// importing getMatchedUsers() from client/api/index.js
import { getMatchedUsers } from "../../api/index";

export default function MatchedUserList({ route, navigation }) {

    // fetching tripID from current sent route
    const { tripId } = route.params;

    const [MatchedUsers, setMatchedUsers] = useState([]);
 
    useEffect(() => {
        async function fetchUsers(){
            const users = await getMatchedUsers(tripId);
            setMatchedUsers(users);
        }
        fetchUsers();
    }, [MatchedUsers]);


    return (
        <View style={styles.container}>
                <FlatList 
                    data={MatchedUsers}
                    keyExtractor={item => item._id}
                    renderItem={ ( {item} ) => {
                        return <CardComp 
                            fname={item.firstName}
                            lname={item.lastName}
                            age={item.age}
                        />
                    }}
                />
        </View>
    );
}
