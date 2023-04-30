import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/cart-context";
import styles from './styles.module.css'

const ShoppingCart = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setTotal(cart.reduce((total, item) => total + Number(item.price) * item.quantity, 0));
  }, [cart]);

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
      <h2 className={styles.title}>Shopping Cart</h2>
      <ul>
        {cart.map((product: any, index: number) => (
          <li key={product.id + index} className={styles.item}>
            {product.name} x {product.quantity} - ${product.price}
            <button onClick={() => handleAddToCart(product)}>+</button>
            <button onClick={() => handleRemoveFromCart(product)}>-</button>
          </li>
        ))}
        <p className={styles.total}>Total : {total} $</p>
        <button className={styles.button} onClick={() => handleClearCart()}>Clear Cart</button>
      </ul>
    </div>
  );
};

export default ShoppingCart;
