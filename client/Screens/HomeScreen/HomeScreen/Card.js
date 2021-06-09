import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import CardStyle from "./CardStyle";

const Card = (props) => {
  return (
    <View style={CardStyle.container}>
      <TouchableOpacity>
        <ImageBackground
          style={CardStyle.image}
          imageStyle={{
            borderRadius: 30,
            opacity: 1,
          }}
          source={props.image}
        >
          <Text style={CardStyle.textDesign}>{props.title}</Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};
export default Card;
