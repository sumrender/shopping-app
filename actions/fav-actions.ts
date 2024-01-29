import { Product } from "@/models/product.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";

const FAV = "fav";

export const getFavItems = async (): Promise<Product[]> => {
  const jsonValue = await AsyncStorage.getItem(FAV);
  if (!jsonValue) {
    return [];
  }
  return JSON.parse(jsonValue);
};

async function setFav(fav: Product[]) {
  await AsyncStorage.setItem(FAV, JSON.stringify(fav));
}

export const addItemToFav = async (item: Product) => {
  let fav = await getFavItems();
  const existingItemIndex = fav.findIndex(
    (favItem) => favItem._id === item._id
  );

  if (existingItemIndex == -1) {
    fav.push(item);
    ToastAndroid.show("Item added to favourites!", ToastAndroid.SHORT);
  } else {
    ToastAndroid.show("Item already in favourites!", ToastAndroid.SHORT);
  }
  setFav(fav);
  return fav;
};

export const removeItemFromFav = async (item: Product) => {
  const fav = await getFavItems();
  const newFav = fav.filter((favItem) => favItem._id != item._id);
  setFav(newFav);
  ToastAndroid.show("Item removed from favourites!", ToastAndroid.SHORT);
  return newFav;
};
