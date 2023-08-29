import React from 'react';
import { Product } from '@/types/product';
import { useState } from 'react';
type ContextObj = {
  cartProducts: Product[] | [];
  setCartProducts: (arg: Product[] | ((arg: Product[]) => Product[])) => void;
};

export const Context = React.createContext<ContextObj>({
  cartProducts: [],
  setCartProducts: (arg: Product[] | ((arg: Product[]) => Product[])) => {},
});

const ContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [cartProducts, setCartProducts] = useState<Product[] | []>([]);

  const contextValue = {
    cartProducts,
    setCartProducts,
  };

  return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
};
export default ContextProvider;
