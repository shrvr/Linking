import { StyleSheet } from "react-native";

const CardStyle = StyleSheet.create({
  container: {
    margin: 30,
    height: "20%",
    width: "70%",
    flexDirection: "column",
    borderRadius: 31,
    backgroundColor: "black",
  },
  image: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
  },
  textDesign: {
    fontSize: 20,
    padding: 5,
    textAlign: "center",
    color: "white",
    backgroundColor: "#000000a0",
  },
});
export default CardStyle;
