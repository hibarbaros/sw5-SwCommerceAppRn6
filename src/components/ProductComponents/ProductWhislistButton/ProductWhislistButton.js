import React, {useState, useEffect, useContext} from 'react';
import AppContext from '../../../context/AppContext';

import {Styled} from './styles';

export default function ProductWhislistButton({product}) {
  const {whislistActions, whislist} = useContext(AppContext);
  const [checkWishList, setCheckWishList] = useState(null);

  function handleWhislist() {
    if (checkWishList) {
      whislistActions.removeToWish(product);
    }
    if (!checkWishList) {
      whislistActions.addToWish(product);
    }
  }

  function handleCheckWhislist() {
    whislistActions.checkToWish(product.id).then((response) => {
      setCheckWishList(response);
    });
  }

  useEffect(() => {
    handleCheckWhislist();
  }, [whislist]);

  return (
    <Styled.FavoriteIcon
      name="star"
      isSelected={checkWishList}
      onPress={handleWhislist}
    />
  );
}
