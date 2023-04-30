import React, { useState } from "react";
import styles from './styles.module.css';
import { Product } from "../../../models/product";

interface BrandFilterProps {
  products: Product[];
  onBrandFilter: (brands: string[]) => void;
}

const BrandFilter: React.FC<BrandFilterProps> = ({ products, onBrandFilter }) => {
  const [searchText, setSearchText] = useState('');
  const [checkedBrands, setCheckedBrands] = useState<string[]>([]);

  // Tüm markaların listesini oluştur
  const allBrands = Array.from(new Set(products.map(product => product.brand)));

  // Arama işlemini gerçekleştirir
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  // Checkbox değişikliklerini takip eder
  const handleBrandCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckedBrands([...checkedBrands, value]);
    } else {
      setCheckedBrands(checkedBrands.filter(brand => brand !== value));
    }
  };

  // Filtreleme işlemini gerçekleştirir
  const filterProducts = () => {
    const filteredProducts = products.filter(product =>
      checkedBrands.includes(product.brand) && product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    const filteredBrands = Array.from(new Set(filteredProducts.map(product => product.brand)));
    onBrandFilter(filteredBrands);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <input type="text" value={searchText} onChange={handleSearch} placeholder="Marka ara..." />
        <button onClick={filterProducts}>Filtrele</button>
      </div>
      <div className={styles.filterGroup}>
        {allBrands.map(brand => (
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
