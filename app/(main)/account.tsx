import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AccountDetails from '@/components/AccountDetails';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Link } from 'expo-router';

const Account = () => {
  return (
    <View style={styles.container}>
      <AccountDetails />

      {/* Order button */}
      <Link style={styles.iconContainer} href='/orders'>
      <FontAwesome5 name="box-open" size={24} color="black" />
        <Text style={styles.iconText}>My Orders</Text>
      </Link>

      {/* Favorites */}
      <Link style={styles.iconContainer} href='/favourites'>
        <FontAwesome name={'heart'} size={25} color='#FC766AFF' />
        <Text style={styles.iconText}>My Favourites</Text>
      </Link>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  iconText: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
});
