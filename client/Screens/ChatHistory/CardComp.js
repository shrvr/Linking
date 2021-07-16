import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

// importing stylesheet
import styles from './style';
// importing icons
import { FontAwesome } from '@expo/vector-icons';




const CardComp = (props) => {

    // handleOnPress --> route to chat Window
    const handleOnPress = () => {
        props.navigateTo.push("ChatWindow", 
                              { conversationID: props.converID,
                                senderID: props.senderID,
                                receiverID: props.receiverID,
                                userImg: props.userImg });
    }

    return (
        <View>
            <TouchableOpacity
                onPress={handleOnPress}>
                <View style={styles.card}>
                    <View style={styles.profilePic}>
                        
                        <Image 
                            style={{width: 48, height: 48}}
                            source={{
                                uri: `${props.userImg}`,
                            }}/>
                    </View>
                    <View style={styles.card_body}> 
                        <View style={styles.card_body_1}>
                            <Text style={styles.uname}>{props.username}</Text>
                            <Text style={styles.msgTime}>{props.messagetime}</Text>
                        </View>
                        <Text style={styles.msg} numberOfLines={1}>{props.messagetext}</Text>
                        <View style={styles.hr}></View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}
export default CardComp;