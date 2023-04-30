import React, { useState, useEffect, useContext } from 'react';
import Pagination from '../../components/pagination/pagination';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { isValid } from '../../helpers/Util';
import styles from './styles.module.css';
import Button from 'react-bootstrap/Button';
import { CartContext } from '../../context/cart-context';
import { Product } from '../../models/product';
type props = {
  products: Product[],
  pageNumber:number
}

const ProductList =({products = [],pageNumber=1}:props) =>{
  const navigate = useNavigate();
  console.log(pageNumber);

  const currentPage: number = isValid(pageNumber) ? Number(pageNumber) : 1;
  const [productsPerPage] = useState<number>(12);
  const { addToCart } = useContext(CartContext);
 

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const goToDetail = (id: any) => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardGroup}>
        {currentProducts && currentProducts.map((product: Product) => {
          return (
            <Card key={product.id} className={styles.card}>
              <div onClick={() => goToDetail(product.id)}>
                <Card.Img
                  variant="top"
                  src={product.image}
                  className={styles.image}
                />
                <Card.Body className={styles.body}>
                  <Card.Title className={styles.title}>
                    {product.name}
                  </Card.Title>
                  <Card.Text className={styles.text}>
                    {product.price} $
                  </Card.Text>
                </Card.Body>
              </div>
              <Button
                onClick={() => handleAddToCart(product)}
                className={styles.button}
              >
                Add to Cart
              </Button>
            </Card>
          );
        })}
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        currentPage={currentPage}
      />
      {products.length==0 && 
      <div className={styles.noProductsContainer}>
        <div className={styles.noProductsText}> Aradığınız özelliklerde ürün bulunamadı</div>
        <Link className={styles.noProductsLink} to={'/1'}>
            <span className={styles.noProductsLinkText}>Diğer ürünlere göz atın</span>
            
          </Link>
      </div>
      }
    </div>
  );
};


export default ProductList;
