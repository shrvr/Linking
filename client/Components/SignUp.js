import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
export default function SignUp({ navigation }) {
  return (
    <View style={styles.container}>
      <Animatable.View style={styles.header} animation="fadeInDownBig">
        <ImageBackground
          source={require("../assets/sign_up.jpg")}
          style={styles.logo}
          resizeMode="contain"
          //   blurRadius={1}
        ></ImageBackground>
        {/* <Text style={styles.logo_text}>Welcome!</Text> */}
      </Animatable.View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text placeHolder="your email" style={styles.text}>
          Username
        </Text>
        <View style={styles.block}>
          <AntDesign name="user" size={24} color="black" style={styles.icon} />
          <TextInput autoCapitalize="none" style={styles.id}></TextInput>
        </View>
        <Text style={styles.text}>Password</Text>
        <View style={styles.block}>
          <AntDesign name="lock" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.password}
            secureTextEntry={true}
            autoCapitalize="none"
          ></TextInput>
        </View>
        <Text style={styles.text}>Confirm Password</Text>
        <View style={styles.block}>
          <AntDesign name="lock" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.password}
            secureTextEntry={true}
            autoCapitalize="none"
          ></TextInput>
        </View>
        <View style={styles.block}>
          <TouchableOpacity
            onPress={() => navigation.push("Main")}
            style={styles.sign_up}
          >
            <Text style={styles.btn_text}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* <LinearGradient
          colors={["#20011f", "#61045f"]}
          style={styles.btn}
        ></LinearGradient> */}
      </Animatable.View>
    </View>
  );
}

const { width } = Dimensions.get("screen");
const background_width = width * 1.2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "105%",
    height: "105%",
    opacity: 0.5,
  },

  // logo_text: {
  //   position: "absolute",
  //   fontSize: 35,
  //   color: "white",
  //   fontWeight: "bold",
  //   marginLeft: 25,
  //   alignSelf: "stretch",
  // },
  footer: {
    flex: 2,
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    // justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 20,
    paddingTop: 30,
  },
  block: {
    flexDirection: "row",
  },
  id: {
    width: background_width * 0.5,
    borderBottomWidth: 1,
  },
  password: {
    width: background_width * 0.5,
    borderBottomWidth: 1,
  },
  icon: {
    padding: 5,
  },
  btn: {
    height: 40,
    width: background_width * 0.5,
    borderRadius: 20,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  btn_text: {
    fontSize: 22,
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
  },
});
