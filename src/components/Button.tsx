import React from 'react';
import styles from './Button.module.css';
const Button: React.FC<{
  children: string;
  onClick: () => void;
  color?: 'blue' | 'red';
  width?: string;
  id: string;
}> = ({ children, width = '100%', color = 'blue', onClick, id }) => {
  let hex = '';
  color === 'red' ? (hex = '#f02d34') : (hex = '#1787e0');

  const onMouseEnterHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = document.getElementById(e.currentTarget.id);
    if (button) {
      button.style.backgroundColor = hex;
    }
  };
  const onMouseLeaveHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = document.getElementById(e.currentTarget.id);
    console.log(button);
    if (button) {
      button.style.backgroundColor = '#ffffff';
    }
  };
  const onMouseDownHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = document.getElementById(e.currentTarget.id);
    console.log(button);
    if (button) {
      button.style.backgroundColor = '#ffffff';
    }
  };
  const onMouseUpHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = document.getElementById(e.currentTarget.id);
    console.log(button);
    if (button) {
      button.style.backgroundColor = hex;
    }
  };

  return (
    <button
      onMouseUp={onMouseUpHandler}
      onMouseDown={onMouseDownHandler}
      onMouseLeave={onMouseLeaveHandler}
      onMouseEnter={onMouseEnterHandler}
      id={id}
      style={{ borderColor: hex, width }}
      onClick={onClick}
      className={styles.btn}
    >
      {children}
    </button>
  );
};

export default Button;
