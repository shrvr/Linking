import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Animatable.View style={styles.header} animation="fadeInDownBig">
        <Animatable.Image
          source={require("../assets/home1.jpg")}
          style={styles.logo}
          resizeMode="contain"
        ></Animatable.Image>
      </Animatable.View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.text}>Let's Start Linking</Text>
        <Text style={styles.text1}>Make new friends!!</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.push("SignIn")}>
            <LinearGradient colors={["#C0C0C0", "#A9A9A9"]} style={styles.btn}>
              <Text style={styles.btn_text}>Lets Start</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}

const { height } = Dimensions.get("screen");
const background_height = height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  logo: {
    height: background_height * 0.74,
    // width: background_width,
  },
  text: {
    marginTop: 15,
    marginLeft: 20,
    fontSize: 40,
  },
  text1: {
    marginTop: 15,
    marginLeft: 20,
    fontSize: 20,
  },
  button: {
    alignItems: "flex-end",
  },
  btn: {
    height: 40,
    width: 150,
    borderRadius: 20,
    marginRight: 20,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  btn_text: {
    fontSize: 22,
  },
});
