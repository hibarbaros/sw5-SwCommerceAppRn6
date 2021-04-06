import React, {useState} from 'react';
import FilterContext from './FilterContext';

const FilterProvider = (props) => {
  const {children} = props;
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  return (
    <FilterContext.Provider
      value={{
        selectedOptions,
        setSelectedOptions,
        filteredProducts,
        setFilteredProducts,
      }}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
