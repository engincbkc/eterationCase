import React from "react";
import styles from './styles.module.css'
import ProductDetail from "../../components/product-detail/product-detail";
import ShoppingCart from "../../components/shopping-cart";


const DetailContainer = () => {


    return (
        <div className={styles.container}>
            <div className={styles.mid}>
                <ProductDetail/>

            </div>

            <div className={styles.rightSide}>
                <ShoppingCart/>
            </div>
        </div>
    )
   
}


export default DetailContainer;


