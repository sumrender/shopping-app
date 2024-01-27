import { getProductByCategories } from "@/actions/product-actions";
import { Colors } from "@/constants/Colors";
import { RESULTS_PER_PAGE } from "@/constants/data";
import { Product } from "@/models/product.interface";
import { Link, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

const ProductList = () => {
  const { categoryName } = useLocalSearchParams<{ categoryName: string }>();

  const [currentPage, setCurrentPage] = useState(1);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const loadMoreProducts = async () => {
    if (reachedEnd) return;

    const moreProducts = await getProductByCategories({
      category: categoryName,
      currentPage,
      resultsPerPage: RESULTS_PER_PAGE,
    });
    setProducts([...products, ...moreProducts]);
    setCurrentPage((prev) => prev + 1);
    if (moreProducts.length == 0 || moreProducts.length < RESULTS_PER_PAGE) {
      setReachedEnd(true);
      return;
    }
  };

  // const handleSorting = () => {};

  useEffect(() => {
    if (searchQuery) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.productContainer}>
      <Link href={`/product/${item._id}`}>
        <View style={styles.imageContainer}>
        <Image source={{ uri: item.images[0] }} style={styles.productImage} />
        </View>
      </Link>
      <View style={styles.productDetails}>
        <Link href={`/product/${item._id}`}>
          <Text style={styles.productName}>{item.name}</Text>
        </Link>
        <Text style={styles.productPrice}>₹{item.price}</Text>
      </View>
      <TouchableOpacity style={styles.addToCartButton}>
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchAndSortContainer}>
        <TextInput
          placeholder="Search..."
          placeholderTextColor={Colors.ORANGE}
          style={styles.searchBar}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {/* <TouchableOpacity style={styles.sortButton} onPress={handleSorting}>
          <FontAwesome name="sort" size={24} color={Colors.WHITE} />
        </TouchableOpacity> */}
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => String(item._id)}
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => (
          <View style={styles.loading}>
            {reachedEnd ? (
              <></>
            ) : (
              <Text>Loading...</Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.WHITE,
  },
  searchAndSortContainer: {
    paddingHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  searchBar: {
    fontSize: 18,
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.ORANGE,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  sortButton: {
    backgroundColor: Colors.ORANGE,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  productDetails: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: Colors.ORANGE,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  addToCartButton: {
    backgroundColor: Colors.ORANGE,
    padding: 10,
    borderRadius: 5,
  },
  addToCartButtonText: {
    color: Colors.WHITE,
    fontWeight: "bold",
  },
  loading: {
    padding: 10,
    alignItems: "center",
  },
});

export default ProductList;
