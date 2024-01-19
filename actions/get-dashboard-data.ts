import { BASE_URL, TOKEN } from "@/constants/data";
import axios, { AxiosResponse } from "axios";

interface GraphData {
  name: string;
  total: number;
}

interface DashboardData {
  graphData: GraphData[];
  salesCount: number;
  totalRevenue: number;
}


export const getDashboardData = async (): Promise<DashboardData> => {
  const res: AxiosResponse<Order[]> = await axios.get(BASE_URL + `/orders?isPaid=true`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });

  const paidOrders = res.data;

  const monthlyRevenue: { [key: number]: number } = {};

  // Grouping the orders by month and summing the revenue
  for (const order of paidOrders) {
    const createdAtDate = new Date(order.createdAt);

    // Extract data from the Date object
    const month = createdAtDate.getMonth(); // Note: Months are zero-based

    let revenueForOrder = 0;

    for (const item of order.orderItems) {
      revenueForOrder += item.price * item.quantity;
    }

    // Adding the revenue for this order to the respective month
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }

  // Converting the grouped data into the format expected by the graph
  const graphData: GraphData[] = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ];

  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }
  const salesCount = paidOrders.length;
  const totalRevenue = getTotalRevenue(paidOrders);

  return {
    graphData,
    salesCount,
    totalRevenue,
  };
};

export const getTotalRevenue = (paidOrders: Order[]): number => {
  const totalRevenue = paidOrders.reduce((total, order) => {
    const orderTotal = order.orderItems.reduce((orderSum, item) => {
      return orderSum + item.price * item.quantity;
    }, 0);
    return total + orderTotal;
  }, 0);
  return totalRevenue;
};
