import { StyleSheet } from "react-native";

const signInPageStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    height: "40%",
    backgroundColor: "#02a3bb",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 40,
    fontWeight: "700",
  },
  sub_title: {
    color: "white",
    marginTop: 5,
    fontSize: 24,
  },
  body: {
    width: "100%",
    height: "60%",
    paddingHorizontal: 16,
    paddingVertical: 48,
  },
  comnfieldViewStyle: {
    flexDirection: "row",
    borderRadius: 8,
    borderBottomWidth: 0.8,
    borderBottomColor: "#02a3bb",
    padding: 8,
    margin: 8,
  },
  comnTextInputStyle: {
    width: "72%",
    marginLeft: 8,
    fontSize: 16,
    letterSpacing: 0.2,
  },
  errMsg: {
    color: "red",
    letterSpacing: 0.4,
    fontSize: 16,
    marginHorizontal: 16,
  },
  button: {
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
  signUpView: {
    margin: 8,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  txt_signUpView: {
    fontSize: 16,
    textAlign: "center",
    color: "grey",
    fontWeight: "500",
  },
  txt_signUpLink: {
    color: "#02495d",
    fontWeight: "700",
    fontSize: 16,
    textDecorationLine: "underline",
    letterSpacing: 0.8,
  },
});

export default signInPageStyle;
