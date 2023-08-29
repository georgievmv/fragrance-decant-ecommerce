import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Banner from '@/components/Banner';
import ProductsList from '@/components/ProductsList';
import { Product } from '@/types/product';
import Cart from '@/components/Cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useContext } from 'react';
import { Context } from '@/store/app-context';

const inter = Inter({ subsets: ['latin'] });

const products: Product[] = [
  { name: 'YSL Y EDP', price10ml: 30, price5ml: 17, image: '/YSL Y EDP.png' },
  { name: 'Versace Eros EDP', price10ml: 27, price5ml: 13, image: '/Versace Eros EDP.jpg' },
  { name: 'Montblanc Explorer', price10ml: 20, price5ml: 12, image: '/Montblanc Explorer.png' },
  { name: 'Montblanc Legend EDP', price10ml: 20, price5ml: 12, image: '/Montblanc Legend EDP.png' },
  { name: 'Nautica Voyage', price10ml: 8, price5ml: 5, image: '/Nautica Voyage.png' },
  {
    name: 'Uomo Salvatore Ferragamo Signature',
    price10ml: 30,
    price5ml: 17,
    image: '/Uomo Salvatore Ferragamo Signature.png',
  },
];

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartProducts } = useContext(Context);

  const onCartClickHandler = () => {
    setIsCartOpen(true);
  };

  useEffect(() => {
    if (!!cartProducts.length) {
      const cart = document.getElementById('cart-id');
      if (cart) {
        setTimeout(() => {
          cart.classList.add(styles.addItemInCart);
        }, 300);
        cart.classList.remove(styles.addItemInCart);
      }
    }
  }, [cartProducts]);

  const cartIcon = (
    <FontAwesomeIcon
      id="cart-id"
      onClick={onCartClickHandler}
      className={styles.cartIcon}
      icon={faCartShopping}
    />
  );

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {cartIcon}
        {isCartOpen && <Cart setIsCartOpen={setIsCartOpen} />}
        <Banner />
        <ProductsList products={products} />
      </main>
    </>
  );
}