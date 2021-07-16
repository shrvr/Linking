import React from 'react'
import { View, ScrollView, Text , TouchableOpacity } from 'react-native';

// importing stylesheet
import styles from './style';

// importing icons
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { getConversations, postConversation} from "../../api/index";


const CardComp =  (props) => {

    const routeToChatWindow = async () => {
            console.log(props.matchedUserID)

            try{
                const allConversations  = await getConversations();
                const  foundUser = allConversations.find( (conversation) => {
                    return conversation.members.includes(props.matchedUserID)
                })
                console.log(foundUser)
                if(foundUser == undefined){
                    console.log("inside if")
                    const newConversation = await postConversation({
                        "receiverId": props.matchedUserID
                    })
                    console.log(newConversation)
                    props.navigateTo.push("ChatWindow", {
                        senderID: newConversation.members[0] == props.matchedUserID ? newConversation.members[1] : newConversation.members[0],
                        receiverID: props.matchedUserID,
                        conversationID: newConversation._id
                    })
                }else{
                    console.log("inside else")
                    props.navigateTo.push("ChatWindow", {
                        senderID: foundUser.members[0] == props.matchedUserID ? foundUser.members[1] : foundUser.members[0],
                        receiverID: props.matchedUserID,
                        conversationID: foundUser._id
                    })
                }
            }catch(e) {
                console.log(e)
            }
           


    }

    return (
        <View style={styles.card}>
            <View style={styles.card_body}> 
                <FontAwesome name="user-circle" size={56} color="#02a3bb" />
                <View style={styles.card_info}>
                    <Text style={styles.fullName}>{props.fname} {props.lname}</Text>
                    <Text style={styles.ratings}>Age: {props.age} years</Text>
                </View>
            </View>
            <TouchableOpacity
                onPress={routeToChatWindow}>
                <MaterialIcons name="chat" size={40} color="#02495d" />
            </TouchableOpacity>
        </View>
    )
}

export default CardComp;
