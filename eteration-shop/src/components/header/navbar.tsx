import React, { useContext } from "react";
import { FaCartPlus, FaUser } from "react-icons/fa";
import styles from "./styles.module.css"
import { CartContext } from "../../context/cart-context";
import SearchBar from "../searchbar";
import { Link } from "react-router-dom";

const Navbar = () => {
    const {total} = useContext(CartContext);

    return(
        <React.Fragment>
            <div className = {styles.container}>
                <div className= {styles.title}>
                    <Link to={"/1"} style={{color:"inherit",textDecoration:'none'}}>ETERATION</Link>
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
