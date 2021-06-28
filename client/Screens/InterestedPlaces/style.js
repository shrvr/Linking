import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 4,
    padding: 8,
    // borderWidth: 2,
    // borderColor: 'orange',
  },
  card_body: {
    width: '60%',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "justify",
    // borderWidth: 2,
    // borderColor: 'orange',
  },
  card_body_controls: { 
    width: '40%',
    flexDirection: "row",
    justifyContent: "space-between",
    // borderWidth: 2,
    // borderColor: 'green',
  },
  card_info: {
    flex: 7,
  },
  placeName: {
    fontSize: 16,
    textTransform: "capitalize",
    color: "black",
  },
  locationName: {
    fontSize: 16,
    color: "grey",
  },
});
export default styles;
