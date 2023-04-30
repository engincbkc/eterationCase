import React, { useState } from "react";
import styles from './styles.module.css';
import { Product } from "../../../models/product";
import { useSearchParams } from "react-router-dom";

type BrandFilterProps = { 
  products: Product[];
  onBrandFilter: (brands: string[]) => void;
}

const BrandFilter = ({ products, onBrandFilter }:BrandFilterProps) => {
  const [searchText, setSearchText] = useState('');
  const [checkedBrands, setCheckedBrands] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();


  const allBrands = Array.from(new Set(products.map(product => product.brand)));

  const handleSearch = (event: any) => {
    setSearchText(event.target.value);
  };

  const handleBrandCheck = (event: any) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckedBrands([...checkedBrands, value]);
    } else {
      setCheckedBrands(checkedBrands.filter(brand => brand !== value));
    }
  };


  const filterProducts = () => {
    const filteredProducts = products.filter(product =>
      checkedBrands.includes(product.brand) && product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    const filteredBrands = Array.from(new Set(filteredProducts.map(product => product.brand)));
    onBrandFilter(filteredBrands);
  };

  const clearFilter = () => {
    onBrandFilter([]);
    searchParams.delete('brands');
    setSearchParams(Object.fromEntries(searchParams));
    setCheckedBrands([]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <input type="text" value={searchText} onChange={handleSearch} placeholder="Brand Filter..." />
        <button onClick={filterProducts}>Filter</button>
        <button onClick={clearFilter}>Clear</button>
      </div>
      <div className={styles.filterGroup}>
        {allBrands.filter(item=>item.toLowerCase().includes(searchText)).map(brand => (
          <label key={brand}>
            <input type="checkbox" value={brand} checked={checkedBrands.includes(brand)} onChange={handleBrandCheck} />
            {brand}
          </label>
        ))}
      </div>
    </div>
  );
};

export default BrandFilter;
