import { verifyOtp } from "@/actions/user-actions";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/use-auth";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";

const VerifyOtpScreen: React.FC = () => {
  const { mobileNumber } = useLocalSearchParams<{ mobileNumber: string }>();
  const { setUserAndAccessToken } = useAuth();
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const handleOtp = async () => {
    setOtpError("");
    if (!otp) {
      setOtpError("OTP is required");
      return;
    }

    const data = await verifyOtp(mobileNumber, otp);
    if (!data) {
      setOtpError("Incorrect OTP");
      return;
    }

    setUserAndAccessToken(data.user, data.accessToken);
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={
            otpError ? { ...styles.input, ...styles.errorInput } : styles.input
          }
          placeholder={`Enter OTP sent to ${mobileNumber}`}
          onChangeText={(text) => setOtp(text)}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleOtp}>
          <Text style={styles.loginButtonText}>Verify OTP</Text>
        </TouchableOpacity>
        {otpError ? <Text style={styles.errorText}>{otpError}</Text> : null}
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

export default VerifyOtpScreen;
