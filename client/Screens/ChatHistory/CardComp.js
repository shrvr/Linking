import React,{useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, Switch } from 'react-native';
import { handleBlock } from  "../../api/index";
import Toast from 'react-native-root-toast';

// importing stylesheet
import styles from './style';
// importing icons
import { FontAwesome } from '@expo/vector-icons';




const CardComp = (props) => {
    const [isEnabled, setIsEnabled] = useState(props.toggleStatus);
    console.log("Is Enabled val",isEnabled)
    //     useEffect( async () => {
    //     let dataToPost = { to: props.receiverID , statusCheck: !isEnabled };
    //     const blockStatus = await handleBlock(dataToPost);
        
    //     console.log(blockStatus);
    // }, [isEnabled])

    useEffect(() => {
        (async () => {
            setIsEnabled(props.toggleStatus)
            console.log("as per backend",isEnabled);
        })
        ();
    }, []);

    // handleOnPress --> route to chat Window
    const handleOnPress = () => {
        
        if(!isEnabled) {
            if(props.chatAccessStatus){
                props.navigateTo.push("ChatWindow", 
                                    { conversationID: props.converID,
                                        senderID: props.senderID,
                                        receiverID: props.receiverID,
                                    });
            }else{
                Toast.show('Chat can no longer be accessed', {
                duration: Toast.durations.SHORT,
                position: -100
            });
            }
        }else{
            Toast.show('Please unblock user to chat', {
                duration: Toast.durations.SHORT,
                position: -100
            });
        }
    }


    
    const toggleSwitch = async () => {
        // console.log("bllock-status-before", isEnabled)
        setIsEnabled((previousState) => !previousState);
        
        // let dataToPost = { to: props.receiverID , statusCheck: !isEnabled };
        const res = await handleBlock({ to: props.receiverID , statusCheck: !isEnabled });
        console.log("posting to backend",res)
        // console.log(blockStatus);
        if (!isEnabled){
            Toast.show('User Blocked', {
                duration: Toast.durations.SHORT,
                position: -100
            });
            console.log("inside if",!isEnabled)
        }
        else{
            Toast.show('User is Unblocked', {
                duration: Toast.durations.SHORT,
                position: -100
            });
        // console.log("bllock-status-after", isEnabled)
            console.log("inside else",!isEnabled)
        }
    }

    return (
        <View>
            <TouchableOpacity
                // disabled={!props.chatAccessStatus}
                onPress={handleOnPress}>
                <View style={styles.card}>
                    <View style={styles.profilePic}>
                        <FontAwesome name="user-circle" size={56} color="#02a3bb" />
                    </View>
                    <View style={styles.card_body}> 
                        <View style={styles.card_body_1}>
                            <Text style={styles.uname}>{props.username}</Text>
                            <Text style={styles.msgTime}>{props.messagetime}</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#02a3bb" }}
                                thumbColor={isEnabled ? "#02495d" : "#f4f3f4"}
                                onValueChange={toggleSwitch}
                                value={isEnabled} />
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