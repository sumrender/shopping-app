import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const AccountDetails = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>John Doe</Text>
      <Text style={styles.detailsText}>01234567890 | test@email.com</Text>
      <Link style={styles.editLink} href='/edit-details'>
        Edit details {">"}
      </Link>
    </View>
  );
};

export default AccountDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F7',
    padding: 20,
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  detailsText: {
    fontSize: 15,
    color: '#555555',
    marginBottom: 10,
  },
  editLink: {
    color: '#007BFF',
    fontSize: 15,
    fontWeight: '500',
  },
});
