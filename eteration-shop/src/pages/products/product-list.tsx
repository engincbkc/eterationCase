import React, { useState, useEffect } from 'react';
import Pagination from '../../components/pagination/pagination';
import { Link, useParams, useSearchParams } from 'react-router-dom';

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
  const { number,name } = useParams();

  const [products, setProducts] = useState<Product[]>([]);
  const currentPage:number =  isValid(number) ? Number(number):1;
  const [productsPerPage] = useState<number>(12);
  const [searchParams, setSearchParams] = useSearchParams();

  
  const filter = (obj:any):boolean => {
    let filterByName =  searchParams.get('search') || '';
    let brands:any =  searchParams.get('brands') || [];

    let models:any = searchParams.get('brands') || []



    let nameLogic:boolean =  obj.name.toLowerCase().includes(filterByName);

    let brandLogic:boolean = brands.length>0 ? brands.toLowerCase().includes(obj.brand.toLowerCase()):true;

    let modelLogic:boolean =  models.length>0 ? models.toLowerCase().includes(obj.model.toLowerCase()):true;

    return nameLogic && brandLogic

  }

  const dataFetch = () => {
    fetch('https://5fc9346b2af77700165ae514.mockapi.io/products')
      .then(response => response.json())
      .then(response => setProducts(response.filter( (p:any) =>filter(p)
       )))
       .catch(error => console.log(error));
  }

  useEffect(() => {
    
    dataFetch()
      
  }, [searchParams]);

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
                    <p> {product.brand} -- {product.model}</p>
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
