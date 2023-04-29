import React, { useState, useEffect } from 'react';
import Pagination from '../../components/pagination/pagination';
import { Link, useParams } from 'react-router-dom';

import {isValid} from '../../helpers/Util'
type Product = {
    id:number,
    image:string,
    brand:string,
    createAt:string,
    description:string,
    model:string,
    price:string,
    name:string
}
function ProductList() {
  const { number } = useParams();

  const [products, setProducts] = useState<Product[]>([]);
  const currentPage:number =  isValid(number) ? Number(number):1;
  console.log("currentPage",number);
  const [productsPerPage] = useState<number>(12);

  useEffect(() => {
    fetch('https://5fc9346b2af77700165ae514.mockapi.io/products')
      .then(response => response.json())
      .then(response => setProducts(response))
      .catch(error => console.log(error));
      console.log(products);
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {currentProducts.map((product:Product) => {
          return <li key={product.id}>
                    <h2><Link to={`/product/${product.id}`}>{product.name}</Link></h2>
                    <p>{product.description}</p>
                </li>
        })}
      </ul>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        currentPage={currentPage}
      />
    </div>
  );
}

export default ProductList;
