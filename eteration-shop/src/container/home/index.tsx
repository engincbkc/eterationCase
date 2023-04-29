import React from "react";
import styles from './styles.module.css'
import ProductList from "../../pages/products/product-list";


const HomeContainer = () => {


    return (
        <div className={styles.container}>
            <div className={styles.midSide}>
            <ProductList />
            </div>
        </div>
    )
   
}


export default HomeContainer;


