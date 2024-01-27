import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";
import Separator from "./Separator";
import { CartItem } from "@/models/product.interface";
import {
  addItemToCart,
  removeAllQtyOfItem,
  removeItemFromCart,
} from "@/actions/cart-actions";

interface CartProductsProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const CartProducts: React.FC<CartProductsProps> = ({ cart = [], setCart }) => {
  async function increaseQuantity(item: CartItem) {
    const newCart = await addItemToCart(item);
    setCart(newCart);
  }
  async function decreaseQuantity(item: CartItem) {
    const newCart = await removeItemFromCart(item);
    setCart(newCart);
  }
  async function removeAllQty(item: CartItem) {
    const newCart = await removeAllQtyOfItem(item);
    setCart(newCart);
  }

  const renderItem = ({ item }: { item: CartItem }) => (
    <>
      <View style={styles.cartProductContainer}>
        <Link href={`/product/${item._id}`} asChild>
          <Image source={{ uri: item.images[0] }} style={styles.productImage} />
        </Link>
        <View style={styles.productDetails}>
          <View style={styles.headerContainer}>
            <Link href={`/product/${item._id}`} asChild>
              <Text style={styles.productName}>{item.name}</Text>
            </Link>
            <TouchableOpacity
              style={styles.deleteIconContainer}
              onPress={() => removeAllQty(item)}
            >
              <FontAwesome name="trash" size={25} color={Colors.ORANGE} />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomRowContainer}>
            <Text style={styles.productPrice}>
              ₹ {item.price * item.cartQuantity}
            </Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => decreaseQuantity(item)}
              >
                <FontAwesome name="minus" size={20} color={Colors.ORANGE} />
              </TouchableOpacity>
              <Text style={styles.quantityVal}>{item.cartQuantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => increaseQuantity(item)}
              >
                <FontAwesome name="plus" size={20} color={Colors.ORANGE} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <Separator />
    </>
  );

  return (
    <FlatList
      data={cart}
      keyExtractor={(item: CartItem) => item._id.toString()}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  cartProductContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 0,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    marginLeft: 15,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteIconContainer: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.DARK_GRAY,
  },
  bottomRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  productPrice: {
    fontSize: 18,
    color: Colors.ORANGE,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
  },
  quantityButton: {
    padding: 5,
    borderRadius: 5,
    borderColor: Colors.LIGHT_GRAY,
    borderWidth: 1,
  },
  quantityVal: {
    marginHorizontal: 10,
    fontSize: 18,
    color: Colors.DARK_GRAY,
  },
});

export default CartProducts;
