import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import { CartItem } from "@/models/product.interface";
import { getCartItems } from "@/actions/cart-actions";
import { useAuth } from "@/hooks/use-auth";
import CartComponent from "@/components/Cart";

const CartScreen: React.FC = () => {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalMRP, setTotalMRP] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCartItems();
        setCart(data);
      } catch (error) {
        console.error("Error fetching cart products:", error);
      }
    };

    fetchCart();
  }, []);

  function handleCheckout() {
    if (!user) {
      router.replace("/auth/login");
    } else {
      router.push("/checkout");
    }
  }

  return (
    <>
      {cart.length > 0 ? (
        <>
          <View style={styles.container}>
            <CartComponent
              cart={cart}
              setCart={setCart}
              totalMRP={totalMRP}
              setTotalMRP={setTotalMRP}
              finalPrice={finalPrice}
              setFinalPrice={setFinalPrice}
            />
          </View>
          <View style={styles.checkoutBtnContainer}>
            <Pressable style={styles.checkoutBtn} onPress={handleCheckout}>
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <View style={styles.noItemsContainer}>
            <Text style={styles.noItemsText}>
              Cart is empty. Go to the products page to start shopping!
            </Text>
          </View>
        </>
      )}
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
  noItemsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noItemsText: {
    fontSize: 18,
    textAlign: "center",
    color: "#666666",
  },
});

export default CartScreen;
