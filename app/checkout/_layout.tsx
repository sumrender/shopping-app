import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { useAuth } from "@/hooks/use-auth";
import { Colors } from "@/constants/Colors";
import { CartItem } from "@/models/product.interface";
import { clearCart, getCartItems } from "@/actions/cart-actions";
import { createOrder, razorpayFn, verifyOrder } from "@/actions/order-actions";
import { PaymentModeEnum } from "@/constants/enums";
import * as Location from "expo-location";
import * as geolib from "geolib";
import { RADIUS_IN_METRES, SHOP_LOCATION } from "@/constants/data";
import CheckoutComponent from "@/components/Checkout";
import { router } from "expo-router";

const CheckoutScreen = () => {
  const [loading, setLoading] = useState(false);
  const [locationNearShop, setLocationNearShop] = useState(false);
  const [isPaymentOnline, setIsPaymentOnline] = useState(true);
  const [totalMRP, setTotalMRP] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const { user, accessToken } = useAuth();

  if (!user) {
    router.replace("/auth/login");
  }
  const [cart, setCart] = useState<CartItem[]>([]);

  // fetches cart items
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

  // gets current location
  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("location access status: ", status);
      if (status !== Location.PermissionStatus.GRANTED) {
        console.log("Please grant location permissions");
        Alert.alert("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      console.log("currentLocation: ", currentLocation);

      const distanceMeters = geolib.getDistance(SHOP_LOCATION, {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
      console.log("🚀 ~ getPermissions ~ distanceMeters:", distanceMeters);

      if (distanceMeters > RADIUS_IN_METRES) {
        setLocationNearShop(false);
        Alert.alert(
          `Sorry, Currently only accepting orders upto ${
            RADIUS_IN_METRES / 1000
          } kms only`
        );
      } else {
        setLocationNearShop(true);
      }
    };
    getPermissions();
  }, []);

  async function placeOrder() {
    setLoading(true);
    try {
      // if (!locationNearShop) {
      //   console.log(
      //     `Sorry, Currently only accepting orders upto ${
      //       RADIUS_IN_METRES / 1000
      //     } kms only`
      //   );
      //   Alert.alert(
      //     `Sorry, Currently only accepting orders upto ${
      //       RADIUS_IN_METRES / 1000
      //     } kms only`
      //   );
      //   setLoading(false);
      //   return;
      // }
      // console.log(`Yess, you live `);
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
      setLoading(false);
      await clearCart();
      router.replace("/");
      ToastAndroid.show(
        "Your order has been placed successfully!",
        ToastAndroid.SHORT
      );
    } catch (error) {
      console.log("error placing order", error);
      ToastAndroid.show(
        "Something went wrong. Please try again after some time.",
        ToastAndroid.SHORT
      );
    }
  }

  function PlaceOrderBtn() {
    return (
      <>
        <View style={styles.bottomSection}>
          <Pressable
            style={styles.placeOrderButton}
            onPress={placeOrder}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={Colors.WHITE} />
            ) : (
              <Text style={styles.placeOrderButtonText}>Place Order</Text>
            )}
          </Pressable>
        </View>
      </>
    );
  }

  return (
    <>
      {user ? (
        <View style={styles.container}>
          <View style={styles.content}>
            <CheckoutComponent
              user={user}
              cart={cart}
              setCart={setCart}
              totalMRP={totalMRP}
              setTotalMRP={setTotalMRP}
              finalPrice={finalPrice}
              setFinalPrice={setFinalPrice}
              isPaymentOnline={isPaymentOnline}
              setIsPaymentOnline={setIsPaymentOnline}
            />
          </View>
          <PlaceOrderBtn />
        </View>
      ) : null}
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
});

export default CheckoutScreen;
