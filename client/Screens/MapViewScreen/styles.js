import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    mapView: {
        flex: 1,
        justifyContent: "center",
        height: "50%",
        width: "100%"
    },
    placeList: {
        flex: 1,
        justifyContent: "center"
    },
    progress: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }, button: {
        padding: 10,
        marginHorizontal: 8,
        marginVertical: 16,
        borderRadius: 24,
        backgroundColor: "#02495d",
    },
    btntext: {
        fontSize: 20,
        letterSpacing: 0.8,
        color: "white",
        textAlign: "center",
    },
});