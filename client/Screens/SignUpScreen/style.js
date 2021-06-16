import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("screen");
const background_width = width * 1.2;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#02a3bb",
    marginBottom: 50,
  },
  footer: {
    flex: 4,
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 40,
    fontWeight: "700",
  },
  sub_title: {
    color: "white",
    fontSize: 20,
  },
  text: {
    marginTop: 7,
    marginBottom: -7,
    alignSelf: "center",
    fontSize: 20,
  },
  block: {
    padding: 15,
    borderRadius: 8,
    borderBottomWidth: 0.8,
    borderBottomColor: "#02a3bb",
    flexDirection: "row",
  },
  terms: {
    margin: 7,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  block_icon: {
    marginRight: 15,
  },
  block_text: {
    width: background_width * 0.5,
  },
  btn_text: {
    fontSize: 22,
    color: "white",
  },
  sign_up: {
    marginTop: 25,
    width: background_width * 0.5,
    height: 40,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#A9A9A9",
    borderRadius: 20,
    backgroundColor: "#02495d",
  },
  terms_text: {
    color: "grey",
  },
  terms_link: {
    color: "#02495d",
    textDecorationLine: "underline",
  },
  errMsg: {
    color: "red",
    letterSpacing: 0.4,
    fontSize: 16,
    marginHorizontal: 16,
  },
});

export default style;
