import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // You might need to install @expo/vector-icons
import { router } from "expo-router";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    // You can perform any search-related actions here
    router.push("/account");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        onSubmitEditing={handleSearch}
      />
      <Ionicons name="search" size={24} color="black" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 5,
    margin: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
});

export default SearchBar;
