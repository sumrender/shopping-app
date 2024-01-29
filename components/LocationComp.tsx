import { Alert, Button, StyleSheet, TextInput, View } from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import * as geolib from "geolib";
import { SHOP_LOCATION } from "@/constants/data";

export default function LocationComp() {
  const [location, setLocation] = useState<
    Location.LocationObject | undefined
  >();
  const [address, setAddress] = useState("");

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        Alert.alert("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      console.log("Location:");
      console.log(currentLocation);

      const distanceMeters = geolib.getDistance(SHOP_LOCATION, {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      console.log("distance in metres::::::", distanceMeters);
    };
    getPermissions();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
