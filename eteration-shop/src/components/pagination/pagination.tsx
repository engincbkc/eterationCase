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
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get('search');
  const brand = searchParams.get('brand');
  const model = searchParams.get('model');
  const sort = searchParams.get('sort');
  const [params, setParams] = useState<string>('?')
  
  const checkParam = (param:any):boolean =>{
    return isValid(param) && (param.length>0)
  }

  const generateParams = (paramList:any[]):any =>{
    let paramPath:string = '';
    paramList.forEach((param:string,index)=>{
      paramPath += checkParam(param)? (index !=0 ? ('&'+param):('?'+param)):''
    });
    return paramPath;
  }
  
  const findParams = () => {
    let searchParam:string = `${checkParam(name)?`search=${name}`:''}`;
    let brandParam:string = `${checkParam(brand)?`brand=${brand}`:''}`;
    let sortParam:string = `${checkParam(sort)?`sort=${sort}`:''}`;
    let modelParam:string = `${checkParam(model)?`model=${model}`:''}`;
    setParams(generateParams([searchParam,brandParam,sortParam,modelParam]));
  }

  useEffect(()=>{
    findParams();
  },[searchParams])

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.container}>
      <ul className={styles.pagination}>
        {pageNumbers.map((number:number) => {
            if(number === currentPage){
                return;
            }
         return <li key={number} className={styles.item}>
                    <Link to={`/${number}${params}`} className={styles.link} >
                    {number}
                    </Link>
                </li>
        })}
      </ul>
    </nav>
  );
}

export default Pagination;
