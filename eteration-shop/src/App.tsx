import React from 'react';
import logo from './logo.svg';
import Navbar from './components/header/navbar';
import { Route, Routes } from "react-router-dom";
import ProductList from './components/products/product-list';
import { CartProvider } from './context/cart-context';
import HomePage from './pages/home';
import DetailPage from './pages/product-detail';

function App() {
  return (
    <React.Fragment>
      <CartProvider>

        <Navbar />

        <Routes>
          <Route path ="/" element = {<HomePage />} >
            <Route path='/:number' element= {<HomePage />} />
          </Route>
          <Route path ="/product/:id" element = {<DetailPage />} />
        </Routes>
      </CartProvider>
  </React.Fragment>
  );
}

export default App;
