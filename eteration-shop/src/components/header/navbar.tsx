import React, { useContext } from "react";
import { FaCartPlus, FaUser } from "react-icons/fa";
import styles from "./styles.module.css"
import { CartContext } from "../../context/cart-context";
import SearchBar from "../searchbar";

const Navbar = () => {
    const {total} = useContext(CartContext);

    return(
        <React.Fragment>
            <div className = {styles.container}>
                <div className= {styles.title}>
                    ETERATION
                </div>
                <div className= {styles.searchBar}>
                    <SearchBar/>
                </div>
                <div className= {styles.summary}>
                   <div className = {styles.summaryItem} >
                        <div><FaCartPlus /></div>
                        <div>{total}$</div>
                   </div>
                   <div className = {styles.summaryItem}>
                        <div><FaUser /></div>
                        <div>Engin </div>
                   </div>
                </div>

            </div>
        
        </React.Fragment>
    )

}


export default Navbar;
