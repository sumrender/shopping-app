import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import React from 'react';
import { Link, Tabs } from 'expo-router';
import { FontAwesome, Octicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const MainLayout = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        headerRight: () => (
          <View style={styles.btnContainer}>
            <Link href='/search' asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name='search'
                    size={25}
                    color={Colors.ORANGE}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
            <Link href='/cart' asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name='shopping-cart'
                    size={25}
                    color={Colors.ORANGE}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
            <Link href='/auth/login' asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name='reply'
                    size={25}
                    color={Colors.ORANGE}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          </View>
        ),
        tabBarStyle: {
          backgroundColor: Colors.WHITE,
          paddingVertical: 10,
        },
        tabBarActiveTintColor: Colors.ORANGE,
        // tabBarInactiveTintColor: Colors.WHITE,
        tabBarLabelStyle: {
          fontSize: 14,
          paddingBottom: 2
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='home' color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='categories'
        options={{
          title: 'Categories',
          tabBarIcon: ({ color, size }) => (
            <Octicons name='apps' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='account'
        options={{
          title: 'Account',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='user' color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
});
