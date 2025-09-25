import { ProductI } from "./product";

export interface OrdersResponse {
  status: string;
  length: number;
  data: Order[];
}

export interface Order {
  _id: string;
  user: string;
  cartItems: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  totalOrderPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  count: number;
  _id: string;
  product: ProductI;
  price: number;
}

export interface ShippingAddress {
  city: string;
  details: string;
  phone: string;
}
