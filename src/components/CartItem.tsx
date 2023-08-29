import React from 'react';
import styles from './CartItem.module.css';
import { Product } from '@/types/product';

const CartItem: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <div className={styles.container}>
      {products.map((product) => {
        return <h1>{product.name}</h1>;
      })}
    </div>
  );
};

export default CartItem;
