import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import ShoppingCart from '../../components/shopping-cart';
import { Product } from '../../models/product';
import { Button } from 'react-bootstrap';
import styles from './styles.module.css'
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
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.log(error));

  }, [id]);

  return (
    <div className={styles.container}>
    <div className={styles.productInfo}>
      {product ? (
        <div className={styles.productDetails}>
          <h2>{product.name}</h2>
          <img src={product.image} alt={product.name} className={styles.productImage} />
          <p>{product.description}</p>
          <p>{product.price}</p>
          <Button onClick={() => handleAddToCart(product)} className={styles.button}>
            Add to Cart
          </Button>
          <Link to={`/1`} className={styles.back}>
            Go back to products
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