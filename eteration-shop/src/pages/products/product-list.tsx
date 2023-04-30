import React, { useState, useEffect, useContext } from 'react';
import Pagination from '../../components/pagination/pagination';
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { isValid } from '../../helpers/Util';
import styles from './styles.module.css';
import Button from 'react-bootstrap/Button';
import { CartContext } from '../../context/cart-context';
import { Product } from '../../models/product';


function ProductList() {
  const { number, name } = useParams<{ number?: string; name?: string }>();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const currentPage: number = isValid(number) ? Number(number) : 1;
  const [productsPerPage] = useState<number>(12);
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useContext(CartContext);

  const filter = (obj: any): boolean => {
    const filterByName = searchParams.get('search') || '';
    const brands: any = searchParams.get('brands') || [];
    const models: any = searchParams.get('models') || [];
    const nameLogic: boolean = obj.name.toLowerCase().includes(filterByName);
    const brandLogic: boolean =
      brands.length > 0
        ? brands.toLowerCase().includes(obj.brand.toLowerCase())
        : true;
    const modelLogic: boolean =
      models.length > 0
        ? models.toLowerCase().includes(obj.model.toLowerCase())
        : true;
    return nameLogic && brandLogic && modelLogic;
  };

  const dataFetch = () => {
    fetch('https://5fc9346b2af77700165ae514.mockapi.io/products')
      .then((response) => response.json())
      .then((response) =>
        setProducts(response.filter((p: any) => filter(p)))
      )
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    dataFetch();
  }, [searchParams]);

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
    </div>
  );
};


export default ProductList;
