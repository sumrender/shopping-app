import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Text, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { FormattedOrderItem, Order } from "@/models/order.interface";
import { getAllOrders } from "@/actions/order-actions";
import { Colors } from "@/constants/Colors";

function formatOrders(data: Order[]) {
  const formattedOrderItems: FormattedOrderItem[] = [];
  data.forEach((order) => {
    order.orderItems.forEach((o) => {
      const item: FormattedOrderItem = {
        ...o,
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
  const [orders, setOrders] = useState<FormattedOrderItem[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      const data = await getAllOrders();
      const formattedOrders = formatOrders(data);
      setOrders(formattedOrders);
    }
    fetchOrders();
  }, []);

  const renderItem = ({ item }: { item: FormattedOrderItem }) => (
    <View style={styles.orderItemContainer}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>₹ {item.price.toFixed(2)}</Text>
      </View>
      <View>
        <Text>
          Payment Mode:{" "}
          <span style={styles.paymentMode}>{item.paymentMode}</span>
        </Text>
        {item.orderStatus === "delivered" ? (
          <Text>
            Delivery Status:{" "}
            <span style={styles.deliveryStatus}>{item.orderStatus}</span>
          </Text>
        ) : (
          <Text>
            Delivery Status:{" "}
            <span style={styles.orderStatus}>{item.orderStatus}</span>
          </Text>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.product}
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
});

export default OrderScreen;
