import React, { useState, useEffect } from 'react';

import { useAppContext } from 'context/AppContext';
import { useAddToWhislist } from 'utils/hooks/useWishlist';
import { IconButton } from 'themes/components';

export default function ProductWhislistButton({ productId }) {
  const { wishlist } = useAppContext();
  const [checkWishList, setCheckWishList] = useState(false);

  const { mutate } = useAddToWhislist();

  function handleWhislist() {
    mutate(productId);
  }

  useEffect(() => {
    if (wishlist || wishlist.length !== 0) {
      const finded = wishlist.some((x) => x === productId);
      finded ? setCheckWishList(true) : setCheckWishList(false);
    }
  }, [wishlist]);

  return (
    <IconButton
      iconName="star"
      color={checkWishList ? 'red' : 'primary'}
      onPress={handleWhislist}
    />
  );
}
