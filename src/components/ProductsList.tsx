import React from 'react';
import styles from './PorductsList.module.css';
import { Product } from '@/types/product';
import { useState } from 'react';
import SingleProduct from './SingleProduct';
const ProductsList: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <div className={styles.container}>
      <h2>Some of our products</h2>
      <div className={styles.productsGrid}>
        {products.map((elem: Product) => {
          return <SingleProduct product={elem} />;
        })}
      </div>
    </div>
  );
};

export default ProductsList;
