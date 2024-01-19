import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { getAllCategories } from "@/actions/category-actions";
import { Category } from "@/models/category.interface";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";

const gradientColors = [
  ["#FF9A9E", "#FAD0C4"], // Gradient 1
  ["#FFDDE1", "#EE9CA7"], // Gradient 2
  ["#FF9A9E", "#FECFEF"], // Gradient 3
  ["#A1C4FD", "#C2E9FB"], // Gradient 4
  ["#D4FC79", "#96E6A1"], // Gradient 5
  // ...add as many as you like
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

  const renderCategory = ({
    item,
    index,
  }: {
    item: Category;
    index: number;
  }) => {
    const gradient = getGradient(index);
    return (
      <Link href={`/category/${item.name}`} asChild>
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
      </Link>
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
    padding: 45,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
});

export default Categories;
