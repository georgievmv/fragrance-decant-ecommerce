export type Product = {
  name: string;
  price10ml: number;
  price5ml: number;
  image: string;
};
export type CartProduct = {
  id: string;
  name: string;
  price: number;
  ml: number;
  image: string;
  qty: number;
};
