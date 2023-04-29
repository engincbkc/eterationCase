import React from "react";

import styles from "./styles.module.css"

const Navbar = () => {

    return(
        <React.Fragment>
            <div className = {styles.container}>
                <div className= {styles.title}>
                    Eteration
                </div>
                <div className= {styles.searchBar}>
                    SEARCHBAR
                </div>
                <div className= {styles.summary}>
                   <div className = {styles.summaryItem} > <div>LOGOSEPET</div> <div>TOTALPARA</div> </div>
                   <div className = {styles.summaryItem}> <div>LOGOPROFILE</div> <div>TOTALPARA</div> </div>
                </div>

            </div>
        
        </React.Fragment>
    )

}


export default Navbar;