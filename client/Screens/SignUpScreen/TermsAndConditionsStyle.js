import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const { width, height} = Dimensions.get("screen");

const TermsAndConditionsStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#02a3bb",
  },
  title: {
    color: "white",
    fontSize: 35,
    fontWeight: "700",
  },
  footer: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 14,
  },
  textPoints: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 14
  },
  screenScrollable: {
    marginTop: 15,
    marginBottom: 15,
    height: height * .7
  }
});

export default TermsAndConditionsStyle;
