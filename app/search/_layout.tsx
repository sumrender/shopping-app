import { generateDummyProducts } from '@/data/utils';
import { IProduct } from '@/models/product';
import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, Image, StyleSheet } from 'react-native';
import dummyProducts from "@/data/dummyProducts.json";
import { Colors } from '@/constants/Colors';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      setNotFound(false);
      // Simulate an API call
      setTimeout(() => {
        const results = dummyProducts.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setProducts(results);
        setLoading(false);
        setNotFound(results.length === 0);
      }, 2000);
    } else {
      setProducts([]);
    }
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search..."
        placeholderTextColor={Colors.ORANGE}
        style={styles.searchBar}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {loading ? (
        <Text>Loading...</Text>
      ) : notFound ? (
        <Text>No matching results</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.productContainer}>
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text>{`$${item.price}`}</Text>
              </View>
              <Image source={{ uri: item.url }} style={styles.productImage} />
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.WHITE,
  },
  searchBar: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.ORANGE,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: Colors.WHITE,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productDetails: {
    flex: 1,
    marginRight: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.ORANGE,
    marginBottom: 5,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
});

export default SearchScreen;
