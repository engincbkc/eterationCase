import React from 'react';
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';
type props = {
    productsPerPage:number,
    totalProducts: number,
    currentPage: number,
}

function Pagination({ productsPerPage, totalProducts, currentPage, }:props) {

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map((number:number) => {
            if(number === currentPage){
                return;
            }
         return <li key={number} className='page-item'>
                    <Link to={`/${number}`} className='page-link' >
                    {number}
                    </Link>
                </li>
        })}
      </ul>
    </nav>
  );
}

export default Pagination;
