import React, { useState } from "react";
import { StyleSheet, Button, Text, View, TouchableOpacity } from "react-native";

import Card from "./Card";
import findTPImage from "../../../assets/option1.jpg";
import findLPImage from "../../../assets/option2.jpg";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Card title="Find Travel Partner" image={findTPImage} />
      <Card title="Find Near by People" image={findLPImage} />
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
