import React from 'react';
import { Div } from 'react-native-magnus';
import { useNavigation } from '@react-navigation/native';

import PriceWithCurrency from 'components/Common/PriceWithCurrency';
import { Button, Text } from 'themes/components';
import AppRoutes from 'utils/approutes';
import ProductCardMedia from 'components/ProductComponents/ProductCardMedia';

import { useProductByProductId } from 'utils/hooks/useProduct';
import { useAddToWhislist } from 'utils/hooks/useWishlist';

export default function ProductWhislistCard({ productId }) {
  const navigation = useNavigation();

  const { data, isLoading } = useProductByProductId(productId);
  const { mutate } = useAddToWhislist();

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  const thumbnail = data.images.find((x) => x.main === 1);

  return (
    <Div
      p={10}
      borderWidth={1}
      borderColor="grey"
      onPress={() => {
        navigation.navigate(AppRoutes.PRODUCT_DETAIL, {
          productId
        });
      }}
    >
      <Div row alignItems="center">
        <Div w={80} h={80}>
          <ProductCardMedia thumbnail={thumbnail} />
        </Div>
        <Div row flex={1}>
          <Div alignItems="flex-start" flex={1} ml={10}>
            <Text>{data.name} </Text>
            {data.mainDetail.prices.map((price, index) => {
              return (
                <Div key={index}>
                  <PriceWithCurrency price={price.price} product={data} />
                </Div>
              );
            })}
          </Div>
          <Div>
            <Button prefix="trash" onPress={() => mutate(productId)} />
          </Div>
        </Div>
      </Div>
    </Div>
  );
}
