import React, { createContext, useState, useEffect, useRef } from "react";
import { Product } from "../models/product";

type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  clearCart: () => void;
  total:number
};

const CART_STORAGE_KEY = "my-cart"; // TODO: .env'ye alınacak  - Engin Ç.

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  total:0
});

export const CartProvider = ({ children }: any) => {
  // localStorage.clear()
  const [cart, setCart] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const storage = useRef<Product[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {

      setCart(JSON.parse(storedCart));
      storage.current = (JSON.parse(storedCart)) ;
      setTotal(cart.reduce((total, item) => total + Number(item.price) * item.quantity, 0));
      
    }

    return ()=>{
      
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(storage.current));
    setTotal(cart.reduce((total, item) => total + Number(item.price) * item.quantity, 0));

  }, [cart]);

  const addToCart = (product: Product) => {
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
      storage.current = updatedCart
    } else {
      storage.current = [...cart,{ ...product, quantity: 1 }];
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);

    }

    const totalPrice = cart.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0
    );
    setTotal(totalPrice + Number(product.price));
  };

  const removeFromCart = (product: Product) => {
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      if (updatedCart[existingProductIndex].quantity > 1) {
        updatedCart[existingProductIndex].quantity -= 1;
      } else {
        updatedCart.splice(existingProductIndex, 1);
      }
      setCart(updatedCart);
      storage.current = updatedCart;


      const totalPrice = updatedCart.reduce(
        (total, item) => total + Number(item.price) * item.quantity, 0
      );
      setTotal(totalPrice);
    }

  };

  const clearCart = () => {
    setCart([]);
    storage.current = []
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart,total }}>
      {children}
    </CartContext.Provider>
  );
};
