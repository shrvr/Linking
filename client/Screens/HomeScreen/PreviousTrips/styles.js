import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    },
    list: {
        margin: 10,
    },
    item: {
        padding: 10,
        margin: 10,
        borderColor: '#bbb',
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 1,
        borderRadius: 10,
        height: 120,
        flexDirection: 'row',
        alignItems: 'center',
        fontWeight: 'bold',
        justifyContent: 'space-between',
        shadowOpacity: 1,
        shadowColor: "#000",
        elevation: 8,
        shadowRadius: 5,
        shadowOffset: { width: 1, height: 1 },
        backgroundColor: 'white'
    },
    verticleLine: {
        height: '100%',
        width: 1,
        backgroundColor: '#D3D3D3',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 20,
    },
    text2: {
        textAlign: 'center',
        fontSize: 20,
        textAlignVertical: 'center',
        color: '#02a3bb',
        fontWeight: 'bold',
        padding: 10
    },
    Button2: {
        padding: 10,
    }

});

export default styles;