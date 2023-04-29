import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    
    fetch(`https://5fc9346b2af77700165ae514.mockapi.io/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.log(error));

      console.log(product);
  }, [id]);

  return (
    <div>
      {product ? (
        <div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>{product.price}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to={`/1`}>Go back to products</Link>
    </div>
  );
}

export default ProductDetail;