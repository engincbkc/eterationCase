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
        
      <div><button className={styles.button} onClick={() => handleClearCart()}>Clear Cart</button></div>
        <div style={{display:'inline-flex',justifyContent:'space-around',width:'100%'}}><p className={styles.total}>Total : {total} $</p>  <button style={{backgroundColor:'green',float:'right'}} className={styles.button} onClick={() => {}}>Checkout</button></div>
       


      <h2 className={styles.title}>Shopping Cart</h2>
      <ul>
        {cart && cart.map((product: any, index: number) => (
          <li key={product.id + index} className={styles.item}>
            <div>
            {product.name} x {product.quantity} 
            </div> 
            <div style={{marginLeft:10}}>-</div> 
            <div style={{marginLeft:20}}>
             ${product.price}
            <button onClick={() => handleAddToCart(product)}>+</button>
            <button onClick={() => handleRemoveFromCart(product)}>-</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingCart;
