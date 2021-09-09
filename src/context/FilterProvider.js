import React, { useState, useContext, createContext } from 'react';

const FilterContext = createContext([{}, () => {}]);

const FilterProvider = ({ children }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  return (
    <FilterContext.Provider
      value={{
        selectedOptions,
        setSelectedOptions,
        filteredProducts,
        setFilteredProducts
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;

export const useFilterContext = () => {
  return useContext(FilterContext);
};
