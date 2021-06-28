import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 4,
    padding: 8,
  },
  card_body: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  card_info: {
    flex: 7,
  },
  placeName: {
    fontSize: 20,
    textTransform: "capitalize",
    color: "black",
  },
  locationName: {
    fontSize: 16,
    color: "grey",
  },
});
export default styles;
