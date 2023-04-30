import React, { createContext, useState } from "react";
import { Product } from "../models/product";

type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  clearCart: ()=>void;

};

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: ()=>{}
});

export const CartProvider = ({ children }:any) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);

  const addToCart = (product: Product) => {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
  
    if (existingProductIndex !== -1) {
      // If the product already exists in the cart, increase the quantity
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // If the product doesn't exist in the cart, add it
      setCart(prevCart => [...prevCart, {...product, quantity: 1}]);
    }
  
    // Update the total price
    const totalPrice = cart.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
    setTotal(totalPrice + Number(product.price));
  };
  

  const removeFromCart = (product: Product) => {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
  
    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      if (updatedCart[existingProductIndex].quantity > 1) {
        updatedCart[existingProductIndex].quantity -= 1;
      } else {
        updatedCart.splice(existingProductIndex, 1);
      }
      setCart(updatedCart);
  
      const totalPrice = updatedCart.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
      setTotal(totalPrice);
    }
  };

  const clearCart = () =>{
    setCart([]);
  }
  

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart,clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
