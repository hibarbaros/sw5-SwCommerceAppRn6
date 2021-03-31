import {useContext} from 'react';
import {useMutation} from 'react-query';

import {setItem} from '../storagehelper';
import AppContext from '../../context/AppContext';

export function useAddToVisitedlist() {
  const {visitedProducts, setVisitedProducts} = useContext(AppContext);

  function setHandleVisitedList(newList) {
    setVisitedProducts(newList);
    setItem('visitedProducts', newList);
  }

  return useMutation((productId) => {
    if (!visitedProducts) {
      let newList = [];
      newList.unshift(productId);
      setHandleVisitedList(newList);
    } else {
      let newList = [...visitedProducts];
      const finded = newList.some((x) => x === productId);
      if (!finded) {
        newList.unshift(productId);
        setHandleVisitedList(newList);
      }
    }
    return true;
  });
}
