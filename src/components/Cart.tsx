import React from 'react';
import styles from './Cart.module.css';
import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import CartItem from './CartItem';
import { Context } from '@/store/app-context';
import Button from './Button';
import getStripe from '@/lib/getStripe';

const Cart: React.FC<{ setIsCartOpen: (arg: boolean) => void }> = ({ setIsCartOpen }) => {
  const [isBackdropOpen, setIsBackdropOpen] = useState(true);
  const { cartProducts } = useContext(Context);

  let totalPrice = 0;
  cartProducts.forEach((product) => {
    totalPrice += product.price * product.qty;
  });

  const onCartCloseClickHandler = () => {
    const cart = document.getElementById('cart-container');
    if (cart) {
      cart.classList.add(styles.slideOut);
    }
    setIsBackdropOpen(false);
    setTimeout(() => {
      setIsCartOpen(false);
    }, 1000);
  };

  const onBackdropClickHandler = () => {
    onCartCloseClickHandler();
  };

  const checkoutClickHandler = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartProducts),
    });

    if (response.status === 500) return;
    const data = await response.json();

    if (stripe) {
      stripe.redirectToCheckout({ sessionId: data.id });
    }
  };
  const arrow = (
    <FontAwesomeIcon
      className={styles.cartArrow}
      onClick={onCartCloseClickHandler}
      icon={faCaretLeft}
    />
  );
  return (
    <>
      {isBackdropOpen && <div onClick={onBackdropClickHandler} className={styles.backdrop}></div>}
      <div id="cart-container" className={styles.container}>
        <header className={styles.header}>
          {arrow}
          <p>Your Cart</p>
          <p>10 items</p>
        </header>
        <main>
          <CartItem products={cartProducts} />
          <div className={styles.checkoutContainer}>
            <div className={styles.checkout}>
              <p>Total:</p>
              <p>{totalPrice}лв.</p>
            </div>
            <Button
              backgroundColor="#1787e0"
              id="checkout-button"
              color="red"
              onClick={checkoutClickHandler}
            >
              Checkout
            </Button>
          </div>
        </main>
      </div>
    </>
  );
};

export default Cart;
