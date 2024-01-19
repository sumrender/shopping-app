import { IProduct } from "@/models/product";

export function generateDummyProducts() {
  const products: IProduct[] = [];
  for (let i = 1; i <= 10; i++) {
    let dummyProduct: IProduct = {
      id: Math.random() * 10000000,
      category: "test",
      name: "name" + Math.random() * 10000,
      price: 200,
      url: "https://via.placeholder.com/150",
    };
    products.push(dummyProduct);
  }
  return products;
}
