import {useContext} from 'react';
import {useMutation, useQuery} from 'react-query';

import {setItem} from '../storagehelper';
import AppContext from '../../context/AppContext';

function setHandleVisitedList(newList, setVisitedProducts) {
  setVisitedProducts(newList);
  setItem('visitedProducts', newList);
}

export function useAddToVisitedlist(productId) {
  const {visitedProducts, setVisitedProducts} = useContext(AppContext);

  return useQuery('addVisitedList', () => {
    if (!visitedProducts) {
      let newList = [];
      newList.unshift(productId);
      setHandleVisitedList(newList, setVisitedProducts);
    } else {
      let newList = [...visitedProducts];
      const finded = newList.some((x) => x === productId);
      if (!finded) {
        newList.unshift(productId);
        setHandleVisitedList(newList, setVisitedProducts);
      }
    }
  });
}
