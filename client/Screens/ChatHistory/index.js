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

  
  const [contactNames, setContactNames] = useState([]);

  // const [toggle, setToggle] = useState(false);
  // let toggle = false;
  // const [allowChatAccess, setAllowChatAccess] = useState(true);
  // let allowChatAccess = true;

    
    useEffect( () => {
      
      const fetchConversations = async () => {
        const conversations = await getConversations();
        console.log("all conv",conversations);
        
        const user_details = [];
        conversations.map( async (conversation) => {
            
            let allowChatAccess = true;
            let toggle = false;


            const user_loggedIn = await GetUser();
            const userIDChattedWith = conversation.members.find( user => user !== user_loggedIn._id)

            const userChattedWith = await GetUserbyId(userIDChattedWith)

            const latestMessage = await getLatestMessage({conversationId: conversation._id})

            let name, lastMessage, time;
            if(latestMessage.length == 0) {
              name = userChattedWith.firstName+" "+userChattedWith.lastName;
              lastMessage = "";
              time = "";
            }else{
              name = userChattedWith.firstName+" "+userChattedWith.lastName;
              lastMessage = latestMessage[0].text;
              time = moment(latestMessage[0].createdAt).fromNow();
            }
            

            // manage user block status
            if('blockStatus' in conversation){

              //checking if atleast in one onject, status == true.  
              if (conversation.blockStatus.some( (ele) => { return ele.status === true } )) {
                // dont allow access to chat off for both
                console.log("before",allowChatAccess);
                allowChatAccess = false;
                console.log("after",allowChatAccess);
              }

              //handle toggle status
              // conversation.blockStatus.map( (ele) => {
                for(let ele=0; ele<conversation.blockStatus.length; ele++){
                    toggle = false;
                
                    if(conversation.blockStatus[ele].blockee == "from"){
                      console.log("inside blokee==from")
                      if(conversation.blockStatus[ele].status == true) {
                        toggle = true;
                        break;
                        // console.log("toggleSet=true",toggle)
                      }
                      else{
                        toggle = false;
                        console.log("inside blokee==to")
                      }
                    }
                    // else if(conversation.blockStatus[ele].blockee == "to"){
                    //   if(conversation.blockStatus[ele].status)
                    // }
                  }
                
              // }) 
            }
            
            const userDataToPost = {
                name, 
                lastMessage, 
                time, 
                conversationId: conversation._id,
                senderID: user_loggedIn._id,
                receiverID: userChattedWith._id,
                allowChatAccess: allowChatAccess,
                toggle: toggle
              }
            user_details.push(userDataToPost)
            
            // resetting the variables


            // console.log("contactNames",contactNames)
                              
            // console.log("user-Details whole array",user_details)
            setContactNames(prevState => [...prevState, userDataToPost])
          })
            console.log("contactNames",contactNames)
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
                            username = {item.name}
                            messagetime = {item.time}
                            messagetext = {item.lastMessage}
                            navigateTo={navigation}
                            converID = {item.conversationId}
                            senderID = {item.senderID}
                            receiverID = {item.receiverID}
                            toggleStatus = {item.toggle}
                            chatAccessStatus = {item.allowChatAccess}
                        />
                    )
                }}
            />
        </View>
    );
}
