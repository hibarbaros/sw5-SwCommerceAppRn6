import {useContext} from 'react';
import {useMutation} from 'react-query';

import {setItem} from '../../utils/storagehelper';
import AppContext from '../../context/AppContext';

export function useAddToWhislist() {
  const {wishlist, setWishlist} = useContext(AppContext);

  //TODO:bu fonksiyonu kontrol et

  return useMutation((productId) => {
    let newList = [];
    if (!wishlist) {
      newList.push(productId);
      setWishlist(newList);
    } else {
      newList = [...wishlist];
      const finded = newList.some((x) => x === productId);
      if (!finded) {
        newList.push(productId);
        setWishlist(newList);
      } else {
        const idIndex = newList.indexOf(productId);
        newList.splice(idIndex, 1);
        setWishlist(newList);
      }
    }
    setItem('wishlist', newList);
    return true;
  });
}