import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import Carousel from "@/components/Carousel";
import HorizontalProductsList from "@/components/HorizontalProductsList";
import {
  getFeaturedOrNewArrivalProducts,
  getProducts,
} from "@/actions/product-actions";
import { Product } from "@/models/product.interface";
import { Billboard } from "@/models/billboard.interface";
import { getAllBillboards } from "@/actions/billboard-actions";
import { HorizontalCmpEnum } from "@/constants/enums";
import { useAuth } from "@/hooks/use-auth";

const Home = () => {
  const { fetchUserFromLocalStorage } = useAuth();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [billboards, setBillboards] = useState<Billboard[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const featured = await getFeaturedOrNewArrivalProducts({
          isFeatured: true,
          currentPage: 1,
          resultsPerPage: 10,
        });
        const newArrivalData = await getFeaturedOrNewArrivalProducts({
          isNew: true,
          currentPage: 1,
          resultsPerPage: 10,
        });
        const billboardsArray = await getAllBillboards();
        setFeaturedProducts(featured);
        setNewArrivals(newArrivalData);
        setBillboards(billboardsArray);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
    fetchUserFromLocalStorage();
  }, []);

  return (
    <ScrollView>
      {billboards.length > 0 ? <Carousel billboards={billboards} /> : null}
      <HorizontalProductsList
        products={featuredProducts}
        title="Featured Products"
        query={HorizontalCmpEnum.IS_FEATURED}
      />
      <HorizontalProductsList
        products={newArrivals}
        title="New Arrivals"
        query={HorizontalCmpEnum.IS_NEW}
      />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({});
