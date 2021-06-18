import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Places({ navigation }) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.block}
          onPress={() => {
            navigation.push("MapViewScreen", { text: "bar" });
          }}
        >
          <MaterialIcons name="local-bar" size={100} color="#02a3bb" />
          <Text style={styles.text}>Bar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.block}
          onPress={() => {
            navigation.push("MapViewScreen", { text: "cafe" });
          }}
        >
          <MaterialIcons name="local-cafe" size={100} color="#02a3bb" />
          <Text style={styles.text}>Cafe</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.block}
          onPress={() => {
            navigation.push("MapViewScreen", { text: "park" });
          }}
        >
          <MaterialIcons name="park" size={100} color="#02a3bb" />
          <Text style={styles.text}>Park</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.block}
          onPress={() => {
            navigation.push("MapViewScreen", { text: "cinema" });
          }}
        >
          <MaterialIcons name="movie" size={100} color="#02a3bb" />
          <Text style={styles.text}>Cinema</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.block}
          onPress={() => {
            navigation.push("MapViewScreen", { text: "hotel" });
          }}
        >
          <MaterialIcons name="hotel" size={100} color="#02a3bb" />
          <Text style={styles.text}>Hotel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.block}
          onPress={() => {
            navigation.push("MapViewScreen", { text: "museum" });
          }}
        >
          <MaterialIcons name="museum" size={100} color="#02a3bb" />
          <Text style={styles.text}>Museum</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  block: {
    margin: 40,
    // padding: 10,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 2,
    // borderColor: "black",
  },
  text: {
    fontSize: 25,
    padding: 5,
    color: "black",
    textAlign: "center",
    justifyContent: "center",
  },
});
