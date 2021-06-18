import { StyleSheet } from "react-native";

const CardStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  image: {
    height: 200,
    width: 300,
    margin: 10,
    opacity: 0.9,
    textAlign: "center",
    justifyContent: "center",
  },
  textDesign: {
    fontSize: 25,
    padding: 5,
    color: "white",
    backgroundColor: "#000000a0",
    textAlign: "center",
    justifyContent: "center",
  },
});
export default CardStyle;
