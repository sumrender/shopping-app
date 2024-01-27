import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Text, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { FormattedOrderItem, Order } from "@/models/order.interface";
import { getAllOrders } from "@/actions/order-actions";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/use-auth";
import { router } from "expo-router";

function formatOrders(data: Order[]) {
  const formattedOrderItems: FormattedOrderItem[] = [];
  data.forEach((order) => {
    order.orderItems.forEach((o) => {
      const item: FormattedOrderItem = {
        ...o,
        price: o.price * o.quantity,
        createdAt: order.createdAt,
        paymentMode: order.paymentMode,
        orderStatus: order.orderStatus,
      };
      formattedOrderItems.push(item);
    });
  });
  return formattedOrderItems;
}

const OrderScreen: React.FC = () => {
  const { accessToken } = useAuth();
  if (!accessToken) {
    router.replace("/auth/login");
    // return null;
  }
  const [orders, setOrders] = useState<FormattedOrderItem[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      const data = await getAllOrders(accessToken!);
      const formattedOrders = formatOrders(data);
      setOrders(formattedOrders);
    }
    fetchOrders();
  }, []);

  const renderItem = ({ item }: { item: FormattedOrderItem }) => (
    <View style={styles.orderItemContainer}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>
          {item.name} ({item.quantity})
        </Text>
        <Text style={styles.productPrice}>₹ {item.price.toFixed(2)}</Text>
      </View>
      <View>
        <Text>
          Payment Mode:{" "}
          <Text style={styles.paymentMode}>{item.paymentMode}</Text>
        </Text>
        {item.orderStatus === "delivered" ? (
          <Text>
            Delivery Status:{" "}
            <Text style={styles.deliveryStatus}>{item.orderStatus}</Text>
          </Text>
        ) : (
          <Text>
            Delivery Status:{" "}
            <Text style={styles.orderStatus}>{item.orderStatus}</Text>
          </Text>
        )}
      </View>
    </View>
  );

  const renderOrders = () => {
    if (orders.length === 0) {
      return (
        <View style={styles.noOrdersContainer}>
          <Text style={styles.noOrdersText}>
            No orders placed. Go to the products page to start shopping!
          </Text>
        </View>
      );
    }

    return (
      <FlatList
        data={orders}
        keyExtractor={(item) => item.product}
        renderItem={renderItem}
      />
    );
  };

  return <View style={styles.container}>{renderOrders()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#F8F8F8",
  },
  orderItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.WHITE,
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
    marginLeft: 30,
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
  paymentMode: {
    color: "#33B5FF",
  },
  orderStatus: {
    fontSize: 14,
    color: "#FF5733",
    marginTop: 5,
  },
  deliveryStatus: {
    fontSize: 14,
    color: "#33B5FF",
    marginTop: 5,
  },
  noOrdersContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noOrdersText: {
    fontSize: 18,
    textAlign: "center",
    color: "#666666",
  },
});

export default OrderScreen;
