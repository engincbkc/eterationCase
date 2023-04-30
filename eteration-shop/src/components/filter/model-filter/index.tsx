import React, { useState } from "react";
import styles from './styles.module.css';
import { Product } from "../../../models/product";
import { useSearchParams } from "react-router-dom";

type ModelFilterProps = { 
  products: Product[];
  onModelFilter: (models: string[]) => void;
}

const ModelFilter = ({ products, onModelFilter }:ModelFilterProps) => {
  const [searchText, setSearchText] = useState('');
  const [checkedModels, setCheckedModels] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();


  const allModels = Array.from(new Set(products.map(product => product.model)));

  const handleSearch = (event: any) => {
    setSearchText(event.target.value);
  };

  const handleModelCheck = (event: any) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckedModels([...checkedModels, value]);
    } else {
      setCheckedModels(checkedModels.filter((model:any) => model !== value));
    }
  };


  const filterProducts = () => {
    const filteredProducts = products.filter(product =>
      checkedModels.includes(product.model) && product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    const filteredModels = Array.from(new Set(filteredProducts.map(product => product.model)));
    console.log(filteredModels);
    onModelFilter(filteredModels);
  };

  const clearFilter = () => {
    setCheckedModels([]);
    allModels.forEach((model) => {
      handleModelCheck({ target: { value: model, checked: false } });
    });
    onModelFilter([]);
    if(setCheckedModels?.length === 0){
      searchParams.delete('model')
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <input type="text" value={searchText} onChange={handleSearch} placeholder="Model Filter..." />
        <button onClick={filterProducts}>Filter</button>
        <button onClick={clearFilter}>Clear</button>
      </div>
      <div className={styles.filterGroup}>
        {allModels.filter(item=>item.toLowerCase().includes(searchText)).map(model => (
          <label key={model}>
            <input type="checkbox" value={model} checked={checkedModels.includes(model)} onChange={handleModelCheck} />
            {model}
          </label>
        ))}
      </div>
    </div>
  );
};

export default ModelFilter;
