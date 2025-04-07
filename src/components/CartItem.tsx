import React from 'react';
import styles from './CartItem.module.css';
import { CartProduct } from '@/types/product';
import { useContext } from 'react';
import { Context } from '@/store/app-context';

const CartItem: React.FC<{ products: CartProduct[] }> = ({ products }) => {
  const { setCartProducts } = useContext(Context);

  const onRemoveQtyHandler = (id: string) => {
    setCartProducts((prevState) => {
      let newState = [...prevState];
      const productToDecrease = newState.findIndex((elem) => elem.id === id);
      const updatedProduct = { ...newState[productToDecrease] };
      if (updatedProduct.qty === 1) {
        return prevState.filter((elem) => elem.id !== id);
      }
      if (updatedProduct.qty > 1) updatedProduct.qty -= 1;
      newState[productToDecrease] = updatedProduct;
      return newState;
    });
  };
  const onAddQtyHandler = (id: string) => {
    setCartProducts((prevState) => {
      let newState = [...prevState];
      const productToIncrease = newState.findIndex((elem) => elem.id === id);
      const updatedProduct = { ...newState[productToIncrease] };
      updatedProduct.qty += 1;
      newState[productToIncrease] = updatedProduct;
      return newState;
    });
  };

  const onDeleteItemFromCartHandler = (id: string) => {
    setCartProducts((prevState) => {
      return prevState.filter((elem) => elem.id !== id);
    });
  };

  return (
    <div className={styles.container}>
      {products.map((product) => {
        return (
          <div key={product.id} className={styles.cartItem}>
            <img
              className={styles.cartImage}
              /* src={`/fragrance-decant-ecommerce${product.image}`}*/
              src={`${product.image}`}
              alt=""
            />
            <div className={styles.description}>
              <h3>
                {`${product.name} 
                ${product.ml}ml.`}
              </h3>
              <div className={styles.qty}>
                <button
                  className={styles.button}
                  onClick={onRemoveQtyHandler.bind(this, product.id)}
                >
                  -
                </button>
                <p>{product.qty}</p>
                <button className={styles.button} onClick={onAddQtyHandler.bind(this, product.id)}>
                  +
                </button>
              </div>
            </div>
            <div className={styles.price}>
              <p>{product.price * product.qty}лв</p>
              <button
                onClick={onDeleteItemFromCartHandler.bind(this, product.id)}
                className={styles.deleteButton}
              >
                X
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartItem;
