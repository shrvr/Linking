import React, { useState } from 'react'
import { View, ScrollView, Text , Switch, TouchableOpacity } from 'react-native';

// importing stylesheet
import styles from './style';

// importing icons
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const CardComp = (props) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <View style={styles.card}>
            <View style={styles.card_body}> 
                <Entypo name="location-pin" size={40} color="#02a3bb" />
                <View style={styles.card_info}>
                    <Text style={styles.placeName}>{props.pname}</Text>
                    <Text style={styles.locationName}>{props.plocation}</Text>
                </View>
            </View>
            <TouchableOpacity>
                <Switch
                    trackColor={{ false: "#767577", true: "#02a3bb" }}
                    thumbColor={isEnabled ? "#02495d" : "#f4f3f4"}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <AntDesign name="search1" size={30} color="#02495d" />
            </TouchableOpacity>
            <TouchableOpacity>
                <AntDesign name="delete" size={30} color="#02495d" />
            </TouchableOpacity>
        </View>
    )
}

export default CardComp;
