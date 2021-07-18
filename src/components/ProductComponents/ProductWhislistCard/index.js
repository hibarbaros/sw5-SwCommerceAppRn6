import React from 'react';
import {Text} from 'react-native';
import {View} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';

import PriceWithCurrency from 'components/Common/PriceWithCurrency';
import {ButtonIcon} from 'themes/components';
import AppRoutes from 'utils/approutes';
import ProductCardMedia from 'components/ProductComponents/ProductCardMedia';

import {useProductByProductId} from 'utils/hooks/useProduct';
import {useAddToWhislist} from 'utils/hooks/useWishlist';

import {Styled} from './styles';

export default function ProductWhislistCard({productId}) {
  const navigation = useNavigation();

  const {data, isLoading} = useProductByProductId(productId);
  const {mutate} = useAddToWhislist();

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  const thumbnail = data.images.find((x) => x.main === 1);

  return (
    <Styled.CardContainer
      onPress={() => {
        navigation.navigate(AppRoutes.PRODUCT_DETAIL, {
          productId,
        });
      }}>
      <View flex row centerV>
        <Styled.ImageContainer>
          <ProductCardMedia thumbnail={thumbnail} />
        </Styled.ImageContainer>
        <Styled.RightContainer>
          <Styled.TextContainer>
            <Styled.ProductName>{data.name} </Styled.ProductName>
            {data.mainDetail.prices.map((price, i) => {
              return (
                <View key={i}>
                  <PriceWithCurrency price={price.price} product={data} />
                </View>
              );
            })}
          </Styled.TextContainer>
          <View centerV>
            <ButtonIcon iconName="trash" onPress={() => mutate(productId)} />
          </View>
        </Styled.RightContainer>
      </View>
    </Styled.CardContainer>
  );
}
