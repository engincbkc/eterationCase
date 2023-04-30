import React, { useEffect, useState } from "react";
import styles from './styles.module.css'
import ProductList from "../../pages/products/product-list";
import BrandFilter from "../../components/filter/brand-filter";
import ShoppingCart from "../../components/shopping-cart";
import { CartProvider } from "../../context/cart-context";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { isValid } from "../../helpers/Util";
import { Product } from "../../models/product";
import SortPanel from "../../components/filter/sorting";
import ModelFilter from "../../components/filter/model-filter";


const HomeContainer = () => {
    const { number, name } = useParams<{ number?: string; name?: string }>();
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const  productSort = (a:Product,b:Product) => {
      const sortType = searchParams.get('sortType') || '';


      //old to new
      if(sortType == '1'){
        return new Date(a.createAt).getTime() - new Date(b.createAt).getTime()
      }
      //new to old
      else if(sortType == '2'){
        return new Date(b.createAt).getTime() - new Date(a.createAt).getTime()

      }
      //price hight to low
      else if(sortType == '3'){
        return Number(b.price) - Number(a.price)
      }
      //price low to high
      else if(sortType == '4'){
        return Number(a.price) - Number(b.price)
      }

      return Number(a.price) - Number(b.price)
    }

    const productFilter = (obj: Product): boolean => {
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

            
        return nameLogic && (brandLogic && modelLogic);
      };
      
    const dataFetch = () => {
        fetch('https://5fc9346b2af77700165ae514.mockapi.io/products')
          .then((response) => response.json())
          .then((response) =>
            setProducts(response)
          )
          .catch((error) => console.log(error));
      };

      useEffect(() => {
        dataFetch();
      }, [searchParams]);

      const filterByBrand = (brands: string[]) => {
        const params = new URLSearchParams(searchParams);
        params.set('brands', brands.join(','));
        setSearchParams(params);
      };

      const filterByModel = (models: string[]) => {
        const params = new URLSearchParams(searchParams);
        params.set('models', models.join(','));
        setSearchParams(params);
      };


      return (
          <div className={styles.container}>
              <div className={styles.leftSide}>
                     <SortPanel/> 
                       <BrandFilter
                          products={products}
                          onBrandFilter={(brands) => filterByBrand(brands)}
                          /> 
                     
                        <ModelFilter products={products} 
                        onModelFilter = {(models) => filterByModel(models)} />
                        
              
              </div>
              
              <div className={styles.midSide}>
                      <ProductList products={products.filter((p: any) => productFilter(p)).sort((a:Product,b:Product)=>productSort(a,b))} pageNumber={Number(number||1)} />
              </div>

              <div className={styles.rightSide}>
                  <ShoppingCart/>

              </div>
              
          </div>
      )
    
  }


export default HomeContainer;


