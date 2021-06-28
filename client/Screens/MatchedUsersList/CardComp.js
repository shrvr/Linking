import React from 'react'
import { View, ScrollView, Text , TouchableOpacity } from 'react-native';

// importing stylesheet
import styles from './style';

// importing icons
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const CardComp = (props) => {
    return (
        <View style={styles.card}>
            <View style={styles.card_body}> 
                <FontAwesome name="user-circle" size={56} color="#02a3bb" />
                <View style={styles.card_info}>
                    <Text style={styles.fullName}>{props.fname} {props.lname}</Text>
                    <Text style={styles.ratings}>Age: {props.age} years</Text>
                </View>
            </View>
            <TouchableOpacity>
                <MaterialIcons name="chat" size={40} color="#02495d" />
            </TouchableOpacity>
        </View>
    )
}

export default CardComp;
