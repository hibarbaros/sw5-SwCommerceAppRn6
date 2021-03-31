import React, {useContext} from 'react';
import {ScrollView} from 'react-native';

import AppContext from '../../context/AppContext';
import ProductWhislistCard from '../../components/ProductComponents/ProductWhislistCard';
import {Container, Headline} from '../../themes/components';

export default function Whislist() {
  const {wishlist} = useContext(AppContext);

  return (
    <Container>
      {wishlist.length > 0 && (
        <ScrollView>
          {wishlist.map((productId, index) => (
            <ProductWhislistCard key={index} productId={productId} />
          ))}
        </ScrollView>
      )}
      {wishlist.length === 0 && <Headline>Your wishlist is empty</Headline>}
    </Container>
  );
}
