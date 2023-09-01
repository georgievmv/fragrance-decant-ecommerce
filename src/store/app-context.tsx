import React from 'react';
import { CartProduct } from '@/types/product';
import { useState } from 'react';
type ContextObj = {
  cartProducts: CartProduct[] | [];
  setCartProducts: (arg: CartProduct[] | ((arg: CartProduct[]) => CartProduct[])) => void;
};

export const Context = React.createContext<ContextObj>({
  cartProducts: [],
  setCartProducts: (arg: CartProduct[] | ((arg: CartProduct[]) => CartProduct[])) => {},
});

const ContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [cartProducts, setCartProducts] = useState<CartProduct[] | []>([]);

  const contextValue = {
    cartProducts,
    setCartProducts,
  };

  return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
};
export default ContextProvider;
