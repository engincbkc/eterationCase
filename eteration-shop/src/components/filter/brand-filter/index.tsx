import React from "react";
import styles from './styles.module.css'




const BrandFilter = () =>{

    return (
        <React.Fragment>
            Marka Filtresi

            <div className={styles.container}>

                <div className={styles.header}>
                        SearchBar
                </div>

                <div className={styles.filterGroup}>
                    checkboxes
                </div>


            </div>

        </React.Fragment>
    )

}

export default BrandFilter;