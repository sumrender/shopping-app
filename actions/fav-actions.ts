import { Product } from "@/models/product.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  }
  setFav(fav);
  return fav;
};

export const removeItemFromFav = async (item: Product) => {
  const fav = await getFavItems();
  const newFav = fav.filter((favItem) => favItem._id != item._id);
  setFav(newFav);
  return newFav;
};