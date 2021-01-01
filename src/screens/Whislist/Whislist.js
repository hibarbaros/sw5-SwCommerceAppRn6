import React, {useContext} from 'react';
import {ScrollView} from 'react-native';

import AppContext from '../../context/AppContext';
import ProductWhislistCard from '../../components/ProductComponents/ProductWhislistCard/ProductWhislistCard';
import {Container, Headline} from '../../themes/components';

export default function Whislist() {
  const {whislist} = useContext(AppContext);
  console.tron.error(whislist);

  return (
    <Container>
      {whislist.length > 0 && (
        <ScrollView>
          {whislist.map((product, index) => (
            <ProductWhislistCard key={index} product={product} />
          ))}
        </ScrollView>
      )}
      {whislist.length === 0 && <Headline>Your wishlist is empty</Headline>}
    </Container>
  );
}
