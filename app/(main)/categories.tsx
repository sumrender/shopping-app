import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { getAllCategories } from "@/actions/category-actions";
import { Category } from "@/models/category.interface";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";

const gradientColors = [
  ["#FF9A9E", "#FAD0C4"],
  ["#FFDDE1", "#EE9CA7"],
  ["#FF9A9E", "#FECFEF"],
  ["#A1C4FD", "#C2E9FB"],
  ["#D4FC79", "#96E6A1"],
];

const getGradient = (index: number) =>
  gradientColors[index % gradientColors.length];

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllCategories();
      setCategories(data);
    }
    fetchData();
  }, []);

  function handlePress(item: Category) {
    router.push(`/category/${item.name}`);
  }

  const renderCategory = ({
    item,
    index,
  }: {
    item: Category;
    index: number;
  }) => {
    const gradient = getGradient(index);
    return (
      <TouchableOpacity onPress={() => handlePress(item)}>
        <LinearGradient
          colors={gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.categoryContainer}
        >
          <Text style={styles.categoryName}>
            {item.name.charAt(0).toUpperCase() +
              item.name.slice(1).toLowerCase()}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item._id}
        renderItem={renderCategory}
        numColumns={3}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  flatListContainer: {
    padding: 10,
    justifyContent: "center",
  },
  categoryContainer: {
    margin: 10,
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
});

export default Categories;
