import React, { useEffect } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "@/constants/Colors";
import Separator from "@/components/Separator";
import { CartItem } from "@/models/product.interface";
import { DELIVERY_CHARGE } from "@/constants/data";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import {
  addItemToCart,
  removeAllQtyOfItem,
  removeItemFromCart,
} from "@/actions/cart-actions";

interface CartProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  totalMRP: number;
  setTotalMRP: React.Dispatch<React.SetStateAction<number>>;
  finalPrice: number;
  setFinalPrice: React.Dispatch<React.SetStateAction<number>>;
}

const CartComponent: React.FC<CartProps> = ({
  cart,
  setCart,
  totalMRP,
  setTotalMRP,
  finalPrice,
  setFinalPrice,
}) => {
  useEffect(() => {
    const total = cart.reduce((total, item) => {
      // console.log(`${item.name}: ${item.price}*${item.cartQuantity} = ${item.price*item.cartQuantity}`);
      return total + item.price * item.cartQuantity;
    }, 0);
    setTotalMRP(total);
    if (total < 500) {
      setFinalPrice(total + DELIVERY_CHARGE);
    } else {
      setFinalPrice(total);
    }
  }, [cart]);

  async function increaseQuantity(item: CartItem) {
    if (item.cartQuantity >= item.quantity) {
      ToastAndroid.show(
        "You've reached the maximum available quantity for this item.",
        ToastAndroid.SHORT
      );
      return;
    }
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
  );

  const priceComponent = () => {
    return (
      <>
        {cart.length > 0 ? (
          <View style={styles.billColumn}>
            <View style={styles.titleContainer}>
              <Text style={styles.heading}>Bill Details</Text>
            </View>
            <View style={styles.billRow}>
              <Text style={styles.billText}>MRP Total</Text>
              <Text style={styles.billAmount}>₹ {totalMRP}</Text>
            </View>
            <View style={styles.billRow}>
              <Text style={styles.billText}>Shipping & Handling</Text>
              <Text style={styles.billAmount}>₹ {DELIVERY_CHARGE}</Text>
            </View>
            <Separator />
            <View style={styles.billRow}>
              <Text style={styles.billText}>Grand Total</Text>
              <Text style={styles.billAmount}>₹ {finalPrice}</Text>
            </View>
          </View>
        ) : null}
      </>
    );
  };

  return (
    <>
      <View>
        <FlatList
          data={cart}
          keyExtractor={(item: CartItem) => item._id.toString()}
          ListHeaderComponent={
            <View style={styles.titleContainer}>
              <Text style={styles.heading}>Items added ({cart.length})</Text>
            </View>
          }
          renderItem={renderItem}
          ListFooterComponent={priceComponent}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    height: "80%",
    backgroundColor: Colors.WHITE,
  },
  titleContainer: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.ORANGE,
    marginBottom: 10,
  },
  billColumn: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  billText: {
    fontSize: 16,
    color: "#333",
  },
  billAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.ORANGE,
  },
  // flatlist styles:
  cartProductContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: Colors.WHITE,
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
    fontSize: 16,
    width: 100,
    fontWeight: "500",
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
  section: {
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  changeText: {
    textDecorationLine: "underline",
    color: "blue",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  infoText: {
    fontSize: 16,
    marginTop: 5,
  },
  paymentOption: {
    marginLeft: 30,
  },
  bottomSection: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingVertical: 15,
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.WHITE,
  },
  placeOrderButton: {
    backgroundColor: Colors.ORANGE,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  placeOrderButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: "500",
  },
});

export default CartComponent;
