import React, {useState, useEffect, useContext} from 'react';
import AppContext from '../../../context/AppContext';
import {useAddToWhislist} from '../../../utils/hooks/useWishlist';

import {Styled} from './styles';

export default function ProductWhislistButton({product}) {
  const {wishlist} = useContext(AppContext);
  const [checkWishList, setCheckWishList] = useState(false);

  const {mutate} = useAddToWhislist();

  function handleWhislist() {
    mutate(product.id);
  }

  useEffect(() => {
    if (wishlist || wishlist.length !== 0) {
      const finded = wishlist.some((x) => x === product.id);
      finded ? setCheckWishList(true) : setCheckWishList(false);
    }
  }, [wishlist]);

  return (
    <Styled.FavoriteIcon
      name="star"
      isSelected={checkWishList}
      onPress={handleWhislist}
    />
  );
}
