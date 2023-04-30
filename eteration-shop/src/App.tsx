import React from 'react';
import logo from './logo.svg';
import Navbar from './components/header/navbar';
import { Route, Routes } from "react-router-dom";
import ProductList from './pages/products/product-list';
import ProductDetail from './pages/product-detail/product-detail';
import HomeContainer from './container/home';
import { CartProvider } from './context/cart-context';
import DetailContainer from './container/detail';

function App() {
  return (
    <React.Fragment>
      <CartProvider>

        <Navbar />

        <Routes>
          <Route path ="/" element = {<HomeContainer />} >
            <Route path='/:number' element= {<HomeContainer />} />
          </Route>
          <Route path ="/product/:id" element = {<DetailContainer />} />
        </Routes>
      </CartProvider>
  </React.Fragment>
  );
}

export default App;
