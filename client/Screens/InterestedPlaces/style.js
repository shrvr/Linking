import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 16,
        backgroundColor: "white",
    },
    card: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginHorizontal: 8,
        marginVertical: 4,
        padding: 8,
    },
    card_body: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card_info: {
        marginHorizontal: 10,
    },
    placeName: {
        fontSize: 20,
        textTransform: 'capitalize',
        color: 'black',
    },
    locationName: {
        fontSize: 16,
        color: 'grey',
    },
    
})
export default styles;