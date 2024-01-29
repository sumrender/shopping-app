import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Product } from "@/models/product.interface";
import { getFavItems, removeItemFromFav } from "@/actions/fav-actions";
import { addItemToCart } from "@/actions/cart-actions";
import { router } from "expo-router";

const FavoritesScreen: React.FC = () => {
  const [fav, setFav] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchFav() {
      const data = await getFavItems();
      setFav(data);
    }
    fetchFav();
  }, []);

  async function handleAddToCart(item: Product) {
    await addItemToCart(item);
    router.push("/cart");
  }

  async function handleRemoveFromFav(item: Product) {
    const data = await removeItemFromFav(item);
    setFav(data);
  }

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.favoriteItemContainer}>
      <Image source={{ uri: item.images[0] }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>₹{item.price.toFixed(2)}</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.buyButton}
            onPress={() => handleAddToCart(item)}
          >
            <FontAwesome name="cart-plus" size={20} color="#FFFFFF" />
            <Text style={styles.buyButtonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.favButton}
            onPress={() => handleRemoveFromFav(item)}
          >
            <Text style={styles.favButtonText}>Remove</Text>
            <FontAwesome name={"heart"} size={25} color="#FC766AFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={fav}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#F8F8F8",
  },
  favoriteItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    elevation: 3,
    marginBottom: 10,
    padding: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  productPrice: {
    fontSize: 14,
    color: "#666666",
    marginTop: 5,
  },
  btnContainer: {
    flexDirection: "row",
    margin: 10,
  },
  buyButton: {
    flexGrow: 1,
    borderRadius: 10,
    backgroundColor: Colors.ORANGE,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buyButtonText: {
    fontSize: 18,
    color: Colors.WHITE,
    marginLeft: 10,
  },
  favButton: {
    width: "45%",
    marginLeft: 5,
    paddingHorizontal: 3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: Colors.ORANGE,
    backgroundColor: Colors.WHITE,
  },
  favButtonText: {
    color: Colors.ORANGE,
    marginRight: 10,
    fontSize: 16,
  },
});

export default FavoritesScreen;
