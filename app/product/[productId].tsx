import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router, useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import { getProductById } from "@/actions/product-actions";
import { Product } from "@/models/product.interface";
import { addItemToCart } from "@/actions/cart-actions";
import { FontAwesome } from "@expo/vector-icons";
import { addItemToFav } from "@/actions/fav-actions";

const ProductScreen = () => {
  const { productId } = useLocalSearchParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      const data = await getProductById(productId);
      setProduct(data);
    }
    fetchProduct();
  }, []);

  async function handleAddToCart(item: Product) {
    await addItemToCart(item);
    router.push("/cart");
  }

  async function handleAddToFav(item: Product) {
    await addItemToFav(item);
    router.push("/favourites");
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {product ? (
        <View style={styles.container}>
          <Image source={{ uri: product?.images[0] }} style={styles.image} />
          <ScrollView style={styles.scrollView}>
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.price}>₹ {product.price}</Text>
            <Text style={styles.description}>{product.description}</Text>
          </ScrollView>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.buyButton}
              onPress={() => handleAddToCart(product)}
            >
              <FontAwesome name="cart-plus" size={20} color="#FFFFFF" />
              <Text style={styles.buyButtonText}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.favButton}
              onPress={() => handleAddToFav(product)}
            >
              <FontAwesome name={"heart"} size={25} color="#FC766AFF" />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: 10,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
  },
  price: {
    fontSize: 20,
    color: "green",
    margin: 10,
  },
  description: {
    fontSize: 16,
    margin: 10,
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
    marginLeft: 5,
    paddingHorizontal: 3,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: Colors.ORANGE,
    backgroundColor: Colors.WHITE,
  },
});
