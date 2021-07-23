import React from "react";
import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import findTPImage from "../../../assets/option1.jpg";
import CardStyle from "./CardStyle";
import findLPImage from "../../../assets/option2.jpg";

const HomeScreen = ({ route, navigation }) => {


  return (
    <View style={CardStyle.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.push("Places");
        }}
      >
        <ImageBackground
          style={CardStyle.image}
          imageStyle={{
            borderRadius: 30,
          }}
          source={findTPImage}
        >
          <Text style={CardStyle.textDesign}>Find Nearby Places</Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.push("MatchedUsersList");
          // getNearbyUsers();
        }}
      >
        <ImageBackground
          style={CardStyle.image}
          imageStyle={{
            borderRadius: 30,
          }}
          source={findLPImage}
        >
          <Text style={CardStyle.textDesign}>Find Nearby People</Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
