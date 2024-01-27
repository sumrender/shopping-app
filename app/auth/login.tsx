import { isValidMobileNumber, login } from "@/actions/user-actions";
import { Colors } from "@/constants/Colors";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";

const LoginScreen: React.FC = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");

  const sendOtp = async () => {
    setMobileNumberError("");
    if (!mobileNumber) {
      setMobileNumberError("Mobile number is required");
      return;
    }

    if (!isValidMobileNumber(mobileNumber)) {
      setMobileNumberError("Enter a valid mobile number");
      return;
    }

    const otpSent = await login(mobileNumber);
    if (!otpSent) {
      setMobileNumberError("Please try again after some time");
      return;
    }
    router.push(`/auth/${mobileNumber}`);
  };

  function MobileNumberForm() {
    return (
      <>
        <TextInput
          style={
            mobileNumberError
              ? { ...styles.input, ...styles.errorInput }
              : styles.input
          }
          placeholder="Enter Mobile Number"
          keyboardType="phone-pad"
          onChangeText={(text) => setMobileNumber(text)}
        />
        <TouchableOpacity style={styles.loginButton} onPress={sendOtp}>
          <Text style={styles.loginButtonText}>Send OTP</Text>
        </TouchableOpacity>
        {mobileNumberError ? (
          <Text style={styles.errorText}>{mobileNumberError}</Text>
        ) : null}
      </>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>{MobileNumberForm()}</View>
      <View style={styles.bottomContainer}>
        <Link href={"/auth/register"} asChild>
          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Create an Account</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: Colors.WHITE,
  },
  formContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    padding: 20,
    elevation: 3,
  },
  input: {
    height: 40,
    borderColor: Colors.DARK_GRAY,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: Colors.ORANGE,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  loginButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  registerButton: {
    padding: 10,
  },
  registerButtonText: {
    color: Colors.ORANGE,
    fontWeight: "bold",
  },
  errorInput: {
    borderColor: Colors.RED,
  },
  errorText: {
    color: Colors.RED,
    marginBottom: 5,
  },
});

export default LoginScreen;
