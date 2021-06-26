import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Constants from "expo-constants";
import * as Location from "expo-location";
import googleApiKey from "../../config/keys";
import styles from "./styles";
import { addPlace } from "../../api/index";

export default function MapViewScreen({ route, navigation }) {
  const [location, setLocation] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [place, setPlace] = useState('');
  const [getAllPlaces, setAllPlaces] = useState([]);
  const [placeData, setPlaceData] = useState({
    name: '',
    longitude: '',
    latitude: '',
    vicinity: ''
  });
  const [errorMsg, setErrorMsg] = useState(null);

  const KEY = Object.values(googleApiKey);

  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Constants.isDevice) {
        setErrorMsg("Something went wrong!");
        return;
      } else if (Platform.OS === "ios" && !Constants.isDevice) {
        setErrorMsg("Something went wrong!");
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let t = route.params.text;
      setPlace(t);
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      setLocation(location);
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    })
      ();
  }, []);

  useEffect(() => {
    if (latitude != null && longitude != null && place != null) {
      getPlaces();
    }
  }, [latitude, longitude, place]);

  const getPlacesUrl = (lat, long, radius, type, apiKey) => {
    const baseUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
    const location = `location=${lat},${long}&radius=${radius}`;
    const typeData = `&types=${type}`;
    const api = `&key=${apiKey}`;
    return `${baseUrl}${location}${typeData}${api}`;
  };

  const getPlaces = async () => {
    const markers = [];
    const url = getPlacesUrl(latitude, longitude, 5000, place, KEY[0]);
    console.log(url);
    await fetch(url)
      .then((res) => res.json())
      .then((res) => {
        res.results.map((element, index) => {
          const marketObj = {};
          marketObj.id = element.id;
          marketObj.name = element.name;
          marketObj.vicinity = element.vicinity;
          marketObj.marker = {
            latitude: element.geometry.location.lat,
            longitude: element.geometry.location.lng,
          };
          markers.push(marketObj);
        });
        //update our places array
        setAllPlaces(markers);
      });
  };

  const markerClick = (event, i) => {
    setPlaceData((currentState) => ({
      ...currentState,
      name: getAllPlaces[i].name,
      longitude: getAllPlaces[i].marker.longitude,
      latitude: getAllPlaces[i].marker.latitude,
      vicinity: getAllPlaces[i].vicinity
    }));
  }

  const handleAddPlace = async () => {
    console.log("handle add place called", placeData)
    let obj = { name: placeData.name, longitude: placeData.longitude, latitude: placeData.latitude, vicinity: placeData.vicinity }
    await addPlace(obj);
  }

  return (
    <View style={styles.container}>
      <View style={styles.mapView}>
        {latitude && longitude != null ? (
          <MapView
            style={{
              flex: 1,
            }}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
          >
            {getAllPlaces.map((marker, i) => (
              <MapView.Marker
                key={i}
                coordinate={{
                  latitude: marker.marker.latitude,
                  longitude: marker.marker.longitude,
                }}
                title={marker.name}
                description={marker.vicinity}
                onPress={(e) => markerClick(e, i)}
              />
            ))}
          </MapView>
        ) : (
          <View style={styles.progress}>
            <ActivityIndicator />
          </View>
        )}
      </View>
      <TouchableOpacity
        disabled={
          placeData.name.trim() === ''
        }
        onPress={handleAddPlace}
      >
        <View style={styles.button}>
          <Text style={styles.btntext}>Save</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
