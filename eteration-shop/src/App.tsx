import React from 'react';
import logo from './logo.svg';
import Navbar from './components/header/navbar';
import { Route, Routes } from "react-router-dom";


import ProductList from './pages/products/product-list';
import ProductDetail from './pages/product-detail/product-detail';
import HomeContainer from './container/home';

function App() {
  return (
    <React.Fragment>
      <Navbar />

      <Routes>
        <Route path ="/" element = {<HomeContainer />} >
          <Route path='/:number' element= {<HomeContainer />} />
          <Route path='/:number/:name' element= {<HomeContainer />} />
          <Route path='/:number/:name/:brand' element= {<HomeContainer />} />


        </Route>
        <Route path ="/product/:id" element = {<ProductDetail />} />

      </Routes>
  </React.Fragment>
  );
}

export default App;
