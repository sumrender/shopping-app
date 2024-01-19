import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";
import CartProducts from "@/components/CartProducts";
import Separator from "@/components/Separator";
import { CartItem } from "@/models/product.interface";
import { getCartItems } from "@/actions/cart-actions";
import { DELIVERY_CHARGE } from "@/constants/data";

const CartScreen: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalMRP, setTotalMRP] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCartItems();
        setCart(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    const total = cart.reduce((total, item) => {
      return total + item.price * item.cartQuantity;
    }, 0);
    setTotalMRP(total);
    if (total < 500) {
      setFinalPrice(total + DELIVERY_CHARGE);
    } else {
      setFinalPrice(total);
    }
  }, [cart]);

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.heading}>Items added ({cart.length})</Text>
        </View>
        <CartProducts cart={cart} setCart={setCart} />

        {cart.length > 0 && (
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
        )}
      </ScrollView>
      <View style={styles.checkoutBtnContainer}>
        <Link href="/checkout" asChild>
          <TouchableOpacity style={styles.checkoutBtn}>
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </Link>
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
  separator: {
    borderWidth: 0.5,
    borderColor: "#ddd",
    marginVertical: 10,
  },
  checkoutBtnContainer: {
    width: "100%",
    marginVertical: 10,
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  checkoutBtn: {
    backgroundColor: Colors.ORANGE,
    width: "90%",
    padding: 10,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutText: {
    fontSize: 18,
    color: Colors.WHITE,
    fontWeight: "bold",
  },
});

export default CartScreen;
