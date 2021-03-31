import {useContext} from 'react';
import {useMutation} from 'react-query';

import {setItem} from '../../utils/storagehelper';
import AppContext from '../../context/AppContext';

export function useAddToWhislist() {
  const {wishlist, setWishlist} = useContext(AppContext);

  function setHandleWishList(newList) {
    setWishlist(newList);
    setItem('wishlist', newList);
  }

  return useMutation((productId) => {
    if (!wishlist) {
      let newList = [];
      newList.push(productId);
      setHandleWishList(newList);
    } else {
      let newList = [...wishlist];
      const finded = newList.some((x) => x === productId);
      if (!finded) {
        newList.push(productId);
        setHandleWishList(newList);
      } else {
        const idIndex = newList.indexOf(productId);
        newList.splice(idIndex, 1);
        setHandleWishList(newList);
      }
    }
    return true;
  });
}
