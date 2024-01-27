import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/use-auth";

const Account = () => {
  const { user } = useAuth();
  let name = "";
  if (user?.firstName) name += user.firstName;
  if (user?.lastName) name += " " + user.lastName;

  return (
    <>
      {user ? (
        <View style={styles.container}>
          <View style={styles.fullWidthContainer}>
            <Text style={styles.nameText}>
              {name ? name : "Update your name!"}
            </Text>
            <Text style={styles.detailsText}>
              {user.mobileNumber ? user.mobileNumber : user.email}
            </Text>
            <Link style={styles.editLink} href="/edit-details">
              Edit address details {">"}
            </Link>
          </View>

          {/* Order button */}
          <Link style={styles.fullWidthContainer} href="/orders">
            <View style={styles.iconContainer}>
              <FontAwesome5 name="box-open" size={24} color="black" />
              <View style={styles.iconTextContainer}>
                <Text style={styles.iconText}>My Orders</Text>
              </View>
            </View>
          </Link>

          {/* Favorites */}
          <Link style={styles.fullWidthContainer} href="/favourites">
            <View style={styles.iconContainer}>
              <FontAwesome name={"heart"} size={25} color="#FC766AFF" />
              <View style={styles.iconTextContainer}>
                <Text style={styles.iconText}>My Favourites</Text>
              </View>
            </View>
          </Link>
        </View>
      ) : (
        <>
          <View style={styles.unauthorized}>
            <Text>Log in to access account functionalities</Text>
            <Link href={"/auth/login"} asChild>
              <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.loginBtnText}>Login</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </>
      )}
    </>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  fullWidthContainer: {
    backgroundColor: "#F7F7F7",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  iconContainer: {
    flexDirection: "row",
  },
  iconTextContainer: {
    marginLeft: 10,
  },
  iconText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
  },
  accountContainer: {
    paddingHorizontal: 15,
    justifyContent: "space-around",
    backgroundColor: "#F7F7F7",
    padding: 20,
    borderRadius: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  logOutBtnContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
    padding: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 5,
  },
  detailsText: {
    fontSize: 15,
    color: "#555555",
    marginBottom: 10,
  },
  editLink: {
    color: "#007BFF",
    fontSize: 15,
    fontWeight: "500",
  },
  unauthorized: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    justifyContent: "center",
    alignItems: "center",
  },
  loginBtn: {
    backgroundColor: Colors.ORANGE,
    padding: 8,
    borderRadius: 6,
    marginTop: 5,
  },
  loginBtnText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "500",
  },
});
