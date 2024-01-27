import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth } from "@/hooks/use-auth";
import { Link, router } from "expo-router";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import Separator from "@/components/Separator";
import Checkbox from "expo-checkbox";
import { Colors } from "@/constants/Colors";
import { CartItem } from "@/models/product.interface";
import { clearCart, getCartItems } from "@/actions/cart-actions";
import CartComponent from "@/components/Cart";
import { createOrder, razorpayFn, verifyOrder } from "@/actions/order-actions";
import { PaymentModeEnum } from "@/constants/enums";

const CheckoutScreen = () => {
  const [isPaymentOnline, setIsPaymentOnline] = useState(true);
  const [totalMRP, setTotalMRP] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const { user, accessToken } = useAuth();
  if (!user) {
    router.replace("/auth/login");
  }
  const [cart, setCart] = useState<CartItem[]>([]);
  let name = user?.firstName && user.firstName;
  if (name && user?.lastName) {
    name += " " + user.lastName;
  }

  let address;
  const { street, city, state, zipCode } = user!;
  if (street && city && state && zipCode) {
    address = `${street}, ${city}, ${state}, ${zipCode}`;
  }

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

  async function placeOrder() {
    try {
      if (isPaymentOnline) {
        const newOrder = await createOrder({
          accessToken: accessToken!,
          paymentMode: PaymentModeEnum.ONLINE,
          cart,
          finalPrice,
        });

        const paymentData = await razorpayFn({
          amountInRs: finalPrice,
          user: user!,
          orderId: newOrder.razorpayOrderId,
        });
        if (paymentData) {
          await verifyOrder(accessToken!, {
            ...paymentData,
            razorpay_order_id: newOrder.razorpayOrderId,
          });
        }
      } else {
        await createOrder({
          accessToken: accessToken!,
          paymentMode: PaymentModeEnum.COD,
          cart,
          finalPrice,
        });
      }
      await clearCart();
      router.replace("/");
    } catch (error) {
      console.log("error placing order", error);
    }
  }

  return (
    <>
      <View style={styles.container}>
        {user ? (
          <View style={styles.content}>
            {/* Contact Information */}
            <View style={styles.section}>
              <View style={styles.headerContainer}>
                <View style={styles.header}>
                  <Ionicons name="mail-open-outline" size={24} color="black" />
                  <Text style={styles.headerText}>Contact Information</Text>
                </View>
                <Link href={"/edit-details"}>
                  <Text style={styles.changeText}>Change</Text>
                </Link>
              </View>
              <Separator />
              <Text style={styles.infoText}>
                {name
                  ? `Name: ${name}`
                  : "Name not entered!! Complete user details"}
              </Text>
              <Text style={styles.infoText}>Mobile number: +1234567890</Text>
              <Text style={styles.infoText}>
                {address
                  ? `Address: ${address}`
                  : "Complete address details!!!"}
              </Text>
            </View>
            {/* Payment method */}
            <View style={styles.section}>
              <View style={styles.header}>
                <FontAwesome5 name="credit-card" size={24} color="black" />
                <Text style={styles.headerText}>Payment method</Text>
              </View>
              <Separator />
              <View style={styles.paymentOption}>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    value={isPaymentOnline}
                    onValueChange={() => {
                      setIsPaymentOnline(true);
                    }}
                  />
                  <Text style={styles.checkboxText}>Pay Online</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    value={!isPaymentOnline}
                    onValueChange={() => {
                      setIsPaymentOnline(false);
                    }}
                  />
                  <Text style={styles.checkboxText}>Cash on delivery</Text>
                </View>
              </View>
            </View>
            {/* Cart products */}
            <CartComponent
              cart={cart}
              setCart={setCart}
              totalMRP={totalMRP}
              setTotalMRP={setTotalMRP}
              finalPrice={finalPrice}
              setFinalPrice={setFinalPrice}
            />
          </View>
        ) : null}
      </View>
      <View style={styles.bottomSection}>
        <Pressable style={styles.placeOrderButton} onPress={placeOrder}>
          <Text style={styles.placeOrderButtonText}>Place Order</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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

export default CheckoutScreen;
