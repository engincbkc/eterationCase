import React, { useState } from "react";
import styles from './styles.module.css';
import { useSearchParams } from "react-router-dom";

const SortPanel = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortType, setSortType] = useState(searchParams.get("sortType") || "1");

  const handleSortTypeChange = (event: any) => {
    const value = event.target.value;
    searchParams.set('sortType',value);
    setSearchParams(Object.fromEntries(searchParams))
    setSortType(value);
  };

  return (
    <div className={styles.container}>
        <div className={styles.radioGroup}>
      <span>Sort By:</span>
      <label>
        <input
          type="radio"
          name="sortType"
          value="1"
          checked={sortType === "1"}
          onChange={handleSortTypeChange}
        />
        Old to new
      </label>
      <label>
        <input
          type="radio"
          name="sortType"
          value="2"
          checked={sortType === "2"}
          onChange={handleSortTypeChange}
        />
        New to old
      </label>
      <label>
        <input
          type="radio"
          name="sortType"
          value="3"
          checked={sortType === "3"}
          onChange={handleSortTypeChange}
        />
        Price high to low
      </label>
      <label>
        <input
          type="radio"
          name="sortType"
          value="4"
          checked={sortType === "4"}
          onChange={handleSortTypeChange}
        />
        Price low to high
      </label>
      </div>
    </div>
  );
};

export default SortPanel;
