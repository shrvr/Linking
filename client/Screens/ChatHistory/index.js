import React, { useState, useEffect} from 'react';
import { View, Text, Image,FlatList } from 'react-native';
import { AvatarGenerator } from 'random-avatar-generator';

// for time formmating
import moment from 'moment';

// importing stylesheet
import styles from './style';
// importing icons
import { FontAwesome } from '@expo/vector-icons';

import CardComp from './CardComp';


import { getConversations, GetUser, GetUserbyId, getLatestMessage } from "../../api/index";


export default function ChatHistory( {navigation} ) {

    const generator = new AvatarGenerator();

    const [contactNames, setContactNames] = useState([]);

    useEffect( () => {

      const fetchConversations = async () => {
        const conversations = await getConversations();
        console.log("all conv",conversations);

        const user_details = [];
        conversations.map( async (conversation) => {
            const user_loggedIn = await GetUser();
            const userIDChattedWith = conversation.members.find( user => user !== user_loggedIn._id)

            const user = await GetUserbyId(userIDChattedWith)

            const latestMessage = await getLatestMessage({conversationId: conversation._id})

            let name, lastMessage, time;
            if(latestMessage.length == 0) {
              name = user.firstName+" "+user.lastName;
              lastMessage = "";
              time = "";
            }else{
              name = user.firstName+" "+user.lastName;
              lastMessage = latestMessage[0].text;
              time = moment(latestMessage[0].createdAt).fromNow();
            }
            user_details.push({name, 
                               lastMessage, 
                               time, 
                               imgURI: generator.generateRandomAvatar(), 
                               conversationId: conversation._id,
                               senderID: user_loggedIn._id,
                               receiverID: user._id,
                              })
            setContactNames(user_details)
          
          })

      }
      
      fetchConversations();
    }, [])

    return (
        <View  style={styles.container}>
            
            <FlatList 
                data={contactNames}
                keyExtractor={(item) => item.time}
                renderItem={ ( {item} ) => {
                    return (
                        <CardComp 
                            userImg = {item.imgURI}
                            username = {item.name}
                            messagetime = {item.time}
                            messagetext = {item.lastMessage}
                            navigateTo={navigation}
                            converID = {item.conversationId}
                            senderID = {item.senderID}
                            receiverID = {item.receiverID}

                        />
                    )
                }}
            />
        </View>
    );
}
