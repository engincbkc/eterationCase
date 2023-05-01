import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import ShoppingCart from '../shopping-cart';
import { Product } from '../../models/product';
import { Button } from 'react-bootstrap';
import styles from './styles.module.css';
import { CartContext } from '../../context/cart-context';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const { addToCart } = useContext(CartContext);
  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  useEffect(() => {
    fetch(`https://5fc9346b2af77700165ae514.mockapi.io/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div className={styles.container}>
      <div className={styles.productInfo}>
       
        {product ? (
          <div className={styles.productDetails}>
            <img src={product.image} alt={product.name} className={styles.productImage} />
            <h2>{product.name}</h2>
            <p className={styles.description}>{product.description}</p>
            <Button onClick={() => handleAddToCart(product)} className={styles.button}>
              Add to Cart
            </Button>
            <p className={styles.price}>{product.price} $</p>
           
            <Link to={`/1`} className={styles.back}>
              {"Back"}
              </Link>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
