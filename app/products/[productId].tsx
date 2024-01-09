import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const Product = () => {
  const { productId } = useLocalSearchParams<{ productId: string }>();
  return (
    <View>
      <Text>Product with id: {productId}</Text>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({});
