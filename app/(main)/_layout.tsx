import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import React from "react";
import { Link, Tabs, router } from "expo-router";
import { FontAwesome, MaterialIcons, Octicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/use-auth";

const MainLayout = () => {
  const { user, resetUser } = useAuth();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  function handleLogout() {
    resetUser();
    router.replace("/");
  }

  return (
    <Tabs
      screenOptions={{
        headerRight: () => (
          <View style={styles.btnContainer}>
            <Link href="/search" asChild>
              <Pressable style={styles.btn}>
                {({ pressed }) => (
                  <FontAwesome
                    name="search"
                    size={25}
                    color={Colors.ORANGE}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
            <Link href="/cart" asChild>
              <Pressable style={styles.btn}>
                {({ pressed }) => (
                  <FontAwesome
                    name="shopping-cart"
                    size={25}
                    color={Colors.ORANGE}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
            {!!user ? (
              <Pressable style={styles.btn} onPress={handleLogout}>
                <MaterialIcons name="logout" size={24} color="red" />
              </Pressable>
            ) : (
              <></>
            )}
          </View>
        ),
        tabBarStyle: {
          backgroundColor: Colors.WHITE,
          paddingTop: 5,
        },
        tabBarActiveTintColor: Colors.ORANGE,
        tabBarLabelStyle: {
          fontSize: 14,
          paddingBottom: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: "Categories",
          tabBarIcon: ({ color, size }) => (
            <Octicons name="apps" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    marginRight: 35,
  },

  btn: {},
});
