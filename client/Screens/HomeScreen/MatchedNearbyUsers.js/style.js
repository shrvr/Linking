import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "white",
        alignItems: 'center'
    },
    card: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginHorizontal: 8,
        marginVertical: 4,
        padding: 8,
        // borderBottomWidth: 0.1,
        // borderBottomColor: '#808080',
    },
    card_body: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card_info: {
        marginHorizontal: 16,
    },
    fullName: {
        fontSize: 20,
        textTransform: 'capitalize',
        color: 'black',
    },
    ratings: {
        fontSize: 16,
        color: 'grey',
    },
    text2: {
        marginTop: 250,
        color: 'grey',
        fontSize: 20
    }
})
export default styles;