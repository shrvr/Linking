import React, { useState, useEffect } from "react";
import { View, Text, Switch, TouchableOpacity } from "react-native";

// importing stylesheet
import styles from "./style";

// importing icons
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { deletePlace, toggleShare } from "../../api/index";
import Toast from "react-native-root-toast";

const CardComp = (props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [tripId, setTripId] = useState(null);

  useEffect(() => {
    (async () => {
      setTripId(props._trip);
      setIsEnabled(props.share);
    })();
  }, []);

  const toggleSwitch = async () => {
    setIsEnabled((previousState) => !previousState);
    await toggleShare({ _trip: tripId, share: !isEnabled });
    if (isEnabled)
      Toast.show("Sharing disabled", {
        duration: Toast.durations.SHORT,
      });
    else
      Toast.show("Sharing enabled", {
        duration: Toast.durations.SHORT,
      });
  };
  const deleteTrip = async () => {
    await deletePlace({ _trip: tripId });
    Toast.show("Place Deleted", {
      duration: Toast.durations.SHORT,
    });
  };

  // method for displaying matched users
  const displayMatchedUsers = () => {
    props.navigateTo.push("MatchedUsersList", { tripId: props._trip });
  };

  return (
    <View style={styles.card}>
      <View style={styles.card_body}>
        <Entypo name="location-pin" size={40} color="#02a3bb" />
        <View style={styles.card_info}>
          <Text style={styles.placeName}>{props.pname}</Text>
          <Text style={styles.locationName}>{props.plocation}</Text>
        </View>
      </View>
      <View style={styles.card_body_controls}>
        <TouchableOpacity>
          <Switch
            trackColor={{ false: "#767577", true: "#02a3bb" }}
            thumbColor={isEnabled ? "#02495d" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={displayMatchedUsers} disabled={!isEnabled}>
          <AntDesign name="search1" size={30} color="#02495d" />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign
            name="delete"
            size={30}
            color="#02495d"
            onPress={deleteTrip}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardComp;
