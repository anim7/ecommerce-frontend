import { Category } from "./Category";
import { Discount } from "./Discount";
import { Brand } from "./Brand";

export interface Product {
  productId: string;
  title: string;
  description: string;
  imgUrl: string;
  price: number;
  category: Category;
  discount: Discount;
  inventory: number;
  brand: Brand;
  rating: number;
}
