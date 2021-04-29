import React, {useContext} from 'react';
import {Div, Button} from 'react-native-magnus';
//*components
import PriceWithCurrency from '../PriceWithCurrency';
import ProductCardMedia from '../../ProductComponents/ProductCardMedia';
//*utils
import AppRoutes from '../../../utils/approutes';
//*context
import AppContext from '../../../context/AppContext';
//*themes
import {Headline} from '../../../themes/components';

export default function ProductCardTheme02({navigation, product, thumbnail}) {
  const {selectedTranslate} = useContext(AppContext);

  const [price] = product?.mainDetail?.prices;

  const translation = product.translations.find(
    (x) => x.languageID === selectedTranslate.toString(),
  );

  const name = translation ? translation.name : product.name;

  return (
    <Button
      minW={200}
      maxW={200}
      h="100%"
      bg="transparent"
      borderColor="light"
      borderRadius={5}
      borderWidth={1}
      p={10}
      mx={5}
      column
      onPress={() => {
        navigation.navigate(AppRoutes.PRODUCT_DETAIL, {
          productId: product.id,
        });
      }}>
      <Div column w="100%" h="100%">
        <Div h="60%">
          {thumbnail && <ProductCardMedia thumbnail={thumbnail} />}
        </Div>
        <Div h="40%">
          <Headline
            bold
            variant="primarytext"
            color="dark"
            fontSize="xl"
            numberOfLines={2}>
            {name} {product.id}
          </Headline>
          <PriceWithCurrency price={price?.price} product={product} />
        </Div>
      </Div>
    </Button>
  );
}
