import { CartItem, Product } from "@/models/product.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";

const CART = "cart";

export const getCartItems = async (): Promise<CartItem[]> => {
  const jsonValue = await AsyncStorage.getItem(CART);
  if (!jsonValue) {
    return [];
  }
  return JSON.parse(jsonValue);
};

async function setCart(cart: CartItem[]) {
  await AsyncStorage.setItem(CART, JSON.stringify(cart));
}

export async function clearCart() {
  await setCart([]);
  console.log("cart has been cleared!");
}

export const addItemToCart = async (item: Product | CartItem) => {
  let cart = await getCartItems();
  const existingItemIndex = cart.findIndex(
    (cartItem) => cartItem._id === item._id
  );

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].cartQuantity += 1;
  } else {
    const newItem: CartItem = { ...item, cartQuantity: 1 };
    cart.push(newItem);
  }
  setCart(cart);
  ToastAndroid.show("Item added to cart!", ToastAndroid.SHORT);
  return cart;
};

export const removeItemFromCart = async (item: CartItem) => {
  const cart = await getCartItems();
  const newCart = cart.filter((cartItem) => cartItem._id != item._id);
  if (item.cartQuantity != 1) {
    // reduce quantity by 1;
    item.cartQuantity--;
    newCart.push(item);
  }
  setCart(newCart);
  ToastAndroid.show("Item removed from cart!", ToastAndroid.SHORT);
  return newCart;
};

export const removeAllQtyOfItem = async (item: CartItem) => {
  const cart = await getCartItems();
  const newCart = cart.filter((cartItem) => cartItem._id != item._id);
  setCart(newCart);
  ToastAndroid.show("Item removed from cart!", ToastAndroid.SHORT);
  return newCart;
};
