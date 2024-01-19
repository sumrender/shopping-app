import { BASE_URL, TOKEN } from "@/constants/data";
import { Order, OrderStatusEnum } from "@/models/order.interface";
import axios, { AxiosResponse } from "axios";

const ORDER_URL = BASE_URL + '/orders';

export const getAllOrders = async () => {
  const { data: orders }: AxiosResponse<Order[]> = await axios.get(
    ORDER_URL,
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
    }
  );

  return orders;
};

export const getOrderById = async (orderId: string): Promise<Order> => {
  const { data: order }: AxiosResponse<Order> = await axios.get(
    `${ORDER_URL}/${orderId}`,
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
    }
  );

  return order;
};