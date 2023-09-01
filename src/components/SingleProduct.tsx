import React from 'react';
import styles from './SingleProduct.module.css';
import { Product } from '@/types/product';
import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Context } from '@/store/app-context';
import generateRandomId from '@/utils/genretateId';

const SingleProducts: React.FC<{ product: Product }> = ({ product }) => {
  const [ml, setMl] = useState('10');
  const { setCartProducts } = useContext(Context);

  const cartIcon = <FontAwesomeIcon className={styles.cartIcon} icon={faCartShopping} />;
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMl(e.currentTarget.id);
  };

  const onAddInCartHandler = () => {
    let price = 0;
    ml === '10' ? (price = product.price10ml) : (price = product.price5ml);
    setCartProducts((prevState) => {
      const existingProduct = prevState.find(
        (elem) => elem.name === product.name && elem.ml.toString() === ml
      );
      if (existingProduct) {
        const newState = [...prevState];
        let updatedProduct = { ...newState[newState.indexOf(existingProduct)] };
        updatedProduct.qty += 1;
        newState[newState.indexOf(existingProduct)] = updatedProduct;
        return [...newState];
      }
      return [
        ...prevState,
        {
          id: generateRandomId(),
          name: product.name,
          price,
          ml: +ml,
          image: product.image,
          qty: 1,
        },
      ];
    });
  };
  return (
    <div className={styles.productContainer}>
      <img className={styles.image} src={product.image} alt="" />
      <div className={styles.productText}>
        <h3 className={styles.heading}>{product.name}</h3>
        {ml === '10' ? <p>{product.price10ml}лв.</p> : <p>{product.price5ml}лв.</p>}
        <form className={styles.inputContainer}>
          <div className={styles.inputGroup}>
            <input
              onChange={inputChangeHandler}
              id="10"
              defaultChecked
              className={`${styles.radio} ${styles.ten}`}
              name="ml"
              type="radio"
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              onChange={inputChangeHandler}
              id="5"
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
