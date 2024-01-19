import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Separator = () => {
  return <View style={styles.separator} />;
};

export default Separator;

const styles = StyleSheet.create({
  separator: {
    borderWidth: 0.5,
    borderColor: "#ddd",
    marginVertical: 10,
  },
});
