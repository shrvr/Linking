import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { block } from "react-native-reanimated";

export default function Main() {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity>
        <View style={styles.block}>
          <ImageBackground
            source={require("../assets/place.jpg")}
            style={styles.logo}
            resizeMode="center"
            blurRadius={1}
          ></ImageBackground>
          <Text style={styles.logo_text}>Find places around!</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={styles.block}>
          <ImageBackground
            source={require("../assets/people.jpg")}
            style={styles.logo}
            blurRadius={1}
            resizeMode="center"
          ></ImageBackground>
          <Text style={styles.logo_text}>Find peole around!</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  block: {
    height: 250,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: 200,
    // borderWidth: 2,
    // flexDirection: "column",
  },
  logo: {
    height: "100%",
    width: "100%",
    opacity: 0.7,
  },
  logo_text: {
    position: "absolute",
    fontSize: 25,
    color: "black",
    fontWeight: "bold",
  },
});
