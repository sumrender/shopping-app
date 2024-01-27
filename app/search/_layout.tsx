import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { searchProducts } from "@/actions/product-actions";
import { Product } from "@/models/product.interface";
import { Link } from "expo-router";

const debounce = <T extends any[]>(func: (...args: T) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: T) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};


const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      setLoading(true);
      setNotFound(false);

      if (query) {
        const data = await searchProducts(query);
        if (data.length === 0) {
          setNotFound(true);
        }
        setProducts(data);
      } else {
        setProducts([]);
      }

      setLoading(false);
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

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
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Link href={`/product/${item._id}`} asChild>
              <Pressable>
                <View style={styles.productContainer}>
                  <View style={styles.productDetails}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text>{`₹${item.price}`}</Text>
                  </View>
                  <Image
                    source={{ uri: item.images[0] }}
                    style={styles.productImage}
                  />
                </View>
              </Pressable>
            </Link>
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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    shadowColor: "#000",
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
    fontWeight: "bold",
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
