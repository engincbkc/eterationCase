import React from "react";
import styles from './styles.module.css'
import ProductList from "../../pages/products/product-list";
import BrandFilter from "../../components/filter/brand-filter";
import ShoppingCart from "../../components/shopping-cart";
import { CartProvider } from "../../context/cart-context";


const HomeContainer = () => {


    return (
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <div className={styles.filterGroup}>
                    <div> Sıralama</div>

                    <BrandFilter />
                    
                    <div>Model Filtresi</div>
                </div>
            </div>
            
            <div className={styles.midSide}>
                    <ProductList />
            </div>

            <div className={styles.rightSide}>
                <ShoppingCart/>

            </div>
            
        </div>
    )
   
}


export default HomeContainer;


