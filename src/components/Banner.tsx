import React from 'react';
import styles from './Banner.module.css';
import Image from 'next/image';
import Button from './Button';
import Link from 'next/link';

const Banner = () => {
  const shopNowButtonHandler = () => {};
  const learnMoreButtonHandler = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.heading}>Crafting Elegance, One Perfume at a Time.</h1>
        <div className={styles.btnContainer}>
          <Link href="learn-more">
            <Button id="learn-more" onClick={learnMoreButtonHandler}>
              Learn more
            </Button>
          </Link>
          <Button id="shop-now" color="red" onClick={shopNowButtonHandler}>
            shop now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
