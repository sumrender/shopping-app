export interface Product {
  _id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  quantity: number;
  price: number;
  category: string;
  description: string;
  images: string[];
  isFeatured: boolean;
}

export interface CartItem extends Product {
  cartQuantity: number;
}
