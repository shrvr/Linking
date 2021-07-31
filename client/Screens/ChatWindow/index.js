import React, { useState, useEffect, useCallback, useRef } from "react";
import { GiftedChat, Bubble, Send, InputToolbar } from "react-native-gifted-chat";
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import {io} from "socket.io-client";
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
  const { conversationID, senderID, receiverID } = route.route.params;
   
  const [messages, setMessages] = useState([]);
  const [arrivalMsg, setArrivalMsg] = useState(null);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io("ws://enigmatic-temple-22499.herokuapp.com",{ transports: ['websocket', 'polling', 'flashsocket'] });
    socket.current.on("getMessage", (data) => {
      setArrivalMsg(data.text)
    })
  }, [])

  useEffect(() => {
    if(arrivalMsg !== null) {
      console.log(arrivalMsg.text)
      setMessages((previousMessages) =>
        GiftedChat.append( arrivalMsg, previousMessages)
      );
    }  
  }, [arrivalMsg])

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
                    name: "user",
                }
            }
        })
        console.log(formattedChats);
        setMessages( formattedChats );
        socket.current.emit("addUser", senderID)
        socket.current.on("getUsers", users=>{
          console.log(users)
        })
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
            name: "user",
          }
        }, previousMessages)
      );
      socket.current.emit("sendMessage", {
        senderId: senderID,
        receiverId: receiverID,
        text: {
          _id: 1,
          text: toBePosted.text,
          createdAt: toBePosted.createdAt,
          user: {
            _id: 2,
          }
        }
      })
      console.log(messages)
    }
    toPost();
  }, []);


  const scrollToBottomComponent = () => {
    return(
      <AntDesign name="downcircle" size={32} color="#4285F4" />
    )
  }

  const renderBubble = (props) => {
    return (
      <Bubble 
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#4285F4"
          },
          
          left:{
            backgroundColor: "#F0F8FF"
          }
        }}
        textStyle={{
          right: {
            color: "#fff"
          }    
        }} 
      />
    )
  }

  const renderSend = () => {
    return (
      <View style={{ padding: 0}}>
          <MaterialCommunityIcons name="send-circle" size={48} color="#4285F4" />
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
          
        }}
        inverted={false}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        renderBubble={renderBubble}
        listViewProps={{
          style: {
            backgroundColor: 'white',
            padding: 0,
            // margin:8
          },
        }}
        // alwaysShowSend
        // renderSend={renderSend}
      />
    </View>
  );
}