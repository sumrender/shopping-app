import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { updateUserDetails } from "@/actions/user-actions";
import { useAuth } from "@/hooks/use-auth";
import { router } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";

const UserProfileForm = () => {
  const { user, accessToken, setUser } = useAuth();
  const initialFirstName = user?.firstName ? user.firstName : "";
  const initialLastName = user?.lastName ? user.lastName : "";
  const initialStreet = user?.street ? user.street : "";
  const initialCity = user?.city ? user.city : "";
  const initialState = user?.state ? user.state : "";
  const initialZipCode = user?.zipCode ? user.zipCode : "";

  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [street, setStreet] = useState(initialStreet);
  const [city, setCity] = useState(initialCity);
  const [state, setState] = useState(initialState);
  const [zipCode, setZipCode] = useState(initialZipCode);

  const handleSubmit = async () => {
    if (!firstName || !lastName || !street || !city || !state || !zipCode) {
      ToastAndroid.show("Fields cannot be empty", ToastAndroid.SHORT);
      return;
    }

    const updatedUser = await updateUserDetails(accessToken!, {
      firstName,
      lastName,
      street,
      city,
      state,
      zipCode,
    });
    if (updatedUser) {
      setUser(updatedUser);
      router.replace("/account");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -350}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.label}>
            First Name<Text style={styles.compulsory}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
          />

          <Text style={styles.label}>
            Last Name<Text style={styles.compulsory}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
          />

          <Text style={styles.label}>
            Street<Text style={styles.compulsory}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={street}
            onChangeText={setStreet}
          />

          <Text style={styles.label}>
            City<Text style={styles.compulsory}>*</Text>
          </Text>
          <TextInput style={styles.input} value={city} onChangeText={setCity} />

          <Text style={styles.label}>
            State<Text style={styles.compulsory}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={state}
            onChangeText={setState}
          />

          <Text style={styles.label}>
            Zip Code<Text style={styles.compulsory}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={zipCode}
            onChangeText={setZipCode}
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.WHITE,
  },
  label: {
    fontSize: 16,
    color: Colors.ORANGE,
    marginBottom: 5,
  },
  compulsory: {
    color: "red",
    fontSize: 22,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.ORANGE,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 14,
  },
  button: {
    backgroundColor: Colors.ORANGE,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 16,
  },
});

export default UserProfileForm;
