import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { isValid } from '../../helpers/Util';
import styles from './styles.module.css'

type props = {
    productsPerPage:number,
    totalProducts: number,
    currentPage: number,
}

const  Pagination = ({ productsPerPage, totalProducts, currentPage, }:props) => {
 
  const params = window.location.href.split('?')[1];

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.container}>
      <ul className={styles.pagination}>
        {pageNumbers.map((number:number) => {
            if(number === currentPage){
              return <li key={number} className={styles.item}>
                <Link to={`/${number}?${params}`} className={styles.link} style={{backgroundColor:'red',cursor:'default'}}>
                  {number}
                </Link>
          </li>
            }
         return <li key={number} className={styles.item}>
                    <Link to={`/${number}?${params}`} className={styles.link} >
                    {number}
                    </Link>
                </li>
        })}
      </ul>
    </nav>
  );
}

export default Pagination;
