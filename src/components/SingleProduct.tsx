import React from 'react';
import styles from './SingleProduct.module.css';
import { Product } from '@/types/product';
import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Context } from '@/store/app-context';

const SingleProducts: React.FC<{ product: Product }> = ({ product }) => {
  const [ml, setMl] = useState('10ml');
  const { setCartProducts } = useContext(Context);

  const cartIcon = <FontAwesomeIcon className={styles.cartIcon} icon={faCartShopping} />;
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMl(e.currentTarget.id);
  };

  const onAddInCartHandler = () => {
    setCartProducts((prevState) => {
      return [...prevState, product];
    });
  };
  return (
    <div className={styles.productContainer}>
      <img className={styles.image} src={product.image} alt="" />
      <div className={styles.productText}>
        <h3 className={styles.heading}>{product.name}</h3>
        {ml === '10ml' ? <p>{product.price10ml}лв.</p> : <p>{product.price5ml}лв.</p>}
        <form className={styles.inputContainer}>
          <div className={styles.inputGroup}>
            <input
              onChange={inputChangeHandler}
              id="10ml"
              defaultChecked
              className={`${styles.radio} ${styles.ten}`}
              name="ml"
              type="radio"
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              onChange={inputChangeHandler}
              id="5ml"
              className={`${styles.radio} ${styles.five}`}
              name="ml"
              type="radio"
            />
          </div>
        </form>
        <button onClick={onAddInCartHandler} className={styles.cartButton}>
          {cartIcon}Add to cart
        </button>
      </div>
    </div>
  );
};

export default SingleProducts;
