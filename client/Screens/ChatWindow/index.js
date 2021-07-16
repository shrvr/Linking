import React, { useState, useEffect, useCallback } from "react";
import { GiftedChat } from "react-native-gifted-chat";

import { getChats, postChats } from "../../api/index";

import {
  Text,
  View,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";

export default function ChatWindow(route) {

  // fetching converID from current sent route
  const { conversationID, senderID } = route.route.params;
   
  const [messages, setMessages] = useState([]);
  useEffect(() => {

    async function fetchChats(){
        const chats = await getChats({conversationId: conversationID});
        console.log(chats);
        
        const formattedChats = chats.map( (chat) => {
             return {
                _id: chat.sender == senderID ? 2 : 1,
                text: chat.text,
                createdAt: chat.createdAt,
                user: {
                    _id: chat.sender == senderID  ? 1 : 2,
                    name: "gurjit",
                }
            }
        })
        console.log(formattedChats);
        setMessages( formattedChats );
    }
    fetchChats();

    
  }, []);

  const onSend = useCallback((nMessages = []) => {
      console.log("len-msg",nMessages)

      let toBePosted;
      async function toPost(){
        toBePosted = await postChats({
            "conversationId": conversationID,
            "sender": senderID,
            "text": nMessages[0].text
        })

        setMessages((previousMessages) =>
        GiftedChat.append( {
          _id: 2,
          text: toBePosted.text,
          createdAt: toBePosted.createdAt,
          user: {
            _id: 1,
            name: "gurjit",
          }
        }, previousMessages)
    
    );
    console.log(messages)
      }
      toPost();
        
    
  }, []);


  return (
    <View style={{ flex: 1 }}>
      
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
          
        }}
        inverted={false}
        
      />
    </View>
  );
}