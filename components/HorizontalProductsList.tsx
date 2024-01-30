import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Product } from "@/models/product.interface";
import { addItemToCart } from "@/actions/cart-actions";
import { HorizontalCmpEnum } from "@/constants/enums";

interface HorizontalProductsListProps {
  title: string;
  products: Product[];
  query: HorizontalCmpEnum;
}

const HorizontalProductsList: React.FC<HorizontalProductsListProps> = ({
  title,
  products,
  query,
}) => {
  async function handleAddToCart(item: Product) {
    await addItemToCart(item);
  }

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.productContainer}>
      <Link href={`/product/${item._id}`} asChild>
        <Pressable>
          <View>
            <Image
              source={{ uri: item.images[0] }}
              style={styles.productImage}
            />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>₹{item.price}</Text>
          </View>
        </Pressable>
      </Link>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => handleAddToCart(item)}
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.heading}>{title}</Text>
        <Link href={`/products/${query}`} asChild>
          <TouchableOpacity style={styles.viewAll}>
            <Text style={styles.viewAllText}>View all</Text>
            <FontAwesome
              name="angle-double-right"
              size={18}
              color={Colors.ORANGE}
            />
          </TouchableOpacity>
        </Link>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item: Product) => item._id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 15,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
  viewAll: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewAllText: {
    fontSize: 15,
    paddingRight: 4,
    color: Colors.ORANGE,
    textDecorationLine: "underline",
    fontWeight: "500",
  },
  productContainer: {
    marginRight: 20,
    backgroundColor: "#F7F7F7",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 5,
  },
  productName: {
    fontSize: 16,
    width: 150,
    fontWeight: "bold",
    color: "#333333",
  },
  productPrice: {
    fontSize: 14,
    color: "gray",
  },
  addToCartButton: {
    backgroundColor: Colors.ORANGE,
    padding: 8,
    borderRadius: 6,
    marginTop: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "500",
  },
});

export default HorizontalProductsList;
