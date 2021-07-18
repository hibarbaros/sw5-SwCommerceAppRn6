import React from 'react';
import {ScrollView} from 'react-native';

import {useAppContext} from 'context/AppContext';
import ProductWhislistCard from 'components/ProductComponents/ProductWhislistCard';
import {Container, Headline} from 'themes/components';

export default function Whislist() {
  const {wishlist} = useAppContext();

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
