import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/cart-context";
import styles from './styles.module.css'

const ShoppingCart = () => {
  const { cart, addToCart, removeFromCart, clearCart,total } = useContext(CartContext);
 
  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  const handleRemoveFromCart = (product: any) => {
    removeFromCart(product);
  };
  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className={styles.container}>
        <button className={styles.button} onClick={() => handleClearCart()}>Clear Cart</button>
        <p className={styles.total}>Total : {total} $</p>


      <h2 className={styles.title}>Shopping Cart</h2>
      <ul>
        {cart && cart.map((product: any, index: number) => (
          <li key={product.id + index} className={styles.item}>
            {product.name} x {product.quantity} - ${product.price}
            <button onClick={() => handleAddToCart(product)}>+</button>
            <button onClick={() => handleRemoveFromCart(product)}>-</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingCart;
