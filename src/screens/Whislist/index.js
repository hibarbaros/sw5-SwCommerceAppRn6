import React from 'react';

import { useAppContext } from 'context/AppContext';
import ProductWhislistCard from 'components/ProductComponents/ProductWhislistCard';
import SmartScrollVIew from 'components/Common/SmartScrollVIew';
import { Container, Headline } from 'themes/components';

export default function Whislist() {
  const { wishlist } = useAppContext();

  return (
    <Container>
      {wishlist.length > 0 && (
        <SmartScrollVIew>
          {wishlist.map((productId, index) => (
            <ProductWhislistCard key={index} productId={productId} />
          ))}
        </SmartScrollVIew>
      )}
      {wishlist.length === 0 && <Headline>Your wishlist is empty</Headline>}
    </Container>
  );
}
