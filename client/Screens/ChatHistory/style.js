import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 8,
        backgroundColor: "white",
    },
    card:{
        flexDirection: "row",
        padding: 2,
    },
    card_body:{
        flex:1,
        margin: 8,
    },
    card_body_1:{
        flexDirection: "row",
        justifyContent: "space-between",
    },
    uname:{
        fontSize: 16,
        fontWeight: "700",
        color: 'black',
    },
    msgTime:{
        paddingTop: 5,
        fontSize: 12,
    },
    msg:{
        opacity: 0.6,
    },
    hr:{
        marginTop: 8,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
    },
    profilePic:{
        padding: 4,
    } 


});
export default styles;