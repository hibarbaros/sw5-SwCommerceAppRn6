import { useMutation } from 'react-query';

import { setItem } from 'utils/storagehelper';
import { useAppContext } from 'context/AppContext';

export function useAddToWhislist() {
  const { wishlist, setWishlist } = useAppContext();

  function setHandleWishList(newList) {
    setWishlist(newList);
    setItem('wishlist', newList);
  }

  return useMutation((productId) => {
    if (!productId) {
      return null;
    }
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
