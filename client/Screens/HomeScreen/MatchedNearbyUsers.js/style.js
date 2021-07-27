import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: 'center',
    },
    card: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginVertical: 4,
        // padding: 8,
    },
    card_body: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card_info: {
        paddingHorizontal: 16,
    },
    fullName: {
        fontSize: 20,
        textTransform: 'capitalize',
        color: 'black',
    },
    ratings: {
        fontSize: 14,
        color: 'grey',
    },
    text2: {
        marginVertical: 128,
        color: 'grey',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '700'
    }
})
export default styles;