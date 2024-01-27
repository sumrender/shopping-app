import { Colors } from "@/constants/Colors";
import { BASE_URL, RAZORPAY_KEY } from "@/constants/data";
import { PaymentModeEnum } from "@/constants/enums";
import { Order, OrderItem } from "@/models/order.interface";
import { CartItem } from "@/models/product.interface";
import { User } from "@/models/user.interface";
import axios, { AxiosError, AxiosResponse } from "axios";
import RazorpayCheckout from "react-native-razorpay";

const ORDER_URL = BASE_URL + "/orders/app";

export const getAllOrders = async (accessToken: string) => {
  const { data: orders }: AxiosResponse<Order[]> = await axios.get(ORDER_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return orders;
};

interface CreateOrderProps {
  accessToken: string;
  paymentMode: PaymentModeEnum;
  cart: CartItem[];
  finalPrice: number;
}
export const createOrder = async ({
  accessToken,
  cart,
  paymentMode,
  finalPrice,
}: CreateOrderProps) => {
  const orderItems = formatCartItemsToOrderItems(cart);
  const { data }: AxiosResponse<Order> = await axios.post(
    ORDER_URL,
    { paymentMode, orderItems, finalPrice },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return data;
};

interface VerifyOrderProps {
  razorpay_signature: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
}
export const verifyOrder = async (
  accessToken: string,
  {
    razorpay_signature,
    razorpay_order_id,
    razorpay_payment_id,
  }: VerifyOrderProps
): Promise<Order|undefined> => {
  try {
    const { data }: AxiosResponse<Order> = await axios.post(
      `${ORDER_URL}/verify`,
      { razorpay_order_id, razorpay_payment_id, razorpay_signature },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError;
      if (serverError && serverError.response) {
        console.error('Error response from server:', serverError.response.data);
      } else {
        console.error('Error in Axios request:', serverError.message);
      }
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
};

function formatCartItemsToOrderItems(cart: CartItem[]) {
  let orderItems: OrderItem[] = [];
  cart.forEach((item) => {
    let orderItem: OrderItem = {
      image: item.images[0],
      name: item.name,
      price: item.price,
      product: item._id,
      quantity: item.cartQuantity,
    };
    orderItems.push(orderItem);
  });
  return orderItems;
}

interface RazorpayFnProps {
  user: User;
  amountInRs: number;
  orderId: string;
}
export async function razorpayFn(props: RazorpayFnProps) {
  let name = props.user?.firstName && props.user.firstName;
  if (name && props.user?.lastName) {
    name += " " + props.user.lastName;
  }
  const options = {
    currency: "INR",
    description: "Shopping order",
    key: RAZORPAY_KEY,
    amount: props.amountInRs * 100,
    name: "Shopping Store",
    order_id: props.orderId,
    prefill: {
      contact: props.user?.mobileNumber,
      name,
    },
    theme: { color: Colors.ORANGE },
  };
  try {
    const data = await RazorpayCheckout.open(options);
    return data;
  } catch (error: any) {
    alert(`Error: ${error.code} | ${error.description}`);
  }
}
