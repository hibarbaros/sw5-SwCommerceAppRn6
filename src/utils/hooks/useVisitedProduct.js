import {useContext} from 'react';
import {useQuery} from 'react-query';

import {setItem} from '../storagehelper';
import AppContext from '../../context/AppContext';

function setHandleVisitedList(newList, setVisitedProducts) {
  if (newList.length > 10) {
    newList.pop();
  }
  setVisitedProducts(newList);
  setItem('visitedProducts', newList);
}

export function useAddToVisitedlist(productId) {
  const {visitedProducts, setVisitedProducts} = useContext(AppContext);

  const floatProductId = parseFloat(productId);

  return useQuery('addVisitedList', () => {
    if (!visitedProducts) {
      let newList = [];
      newList.unshift(floatProductId);
      setHandleVisitedList(newList, setVisitedProducts);
    } else {
      let newList = [...visitedProducts];
      const finded = newList.some((x) => x === floatProductId);
      if (!finded) {
        newList.unshift(floatProductId);
        setHandleVisitedList(newList, setVisitedProducts);
      }
    }
  });
}
