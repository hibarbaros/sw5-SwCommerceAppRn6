import React, {useState, useContext, useEffect} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {Div, Text, Button} from 'react-native-magnus';
import HTMLView from 'react-native-htmlview';
import Toast from 'react-native-toast-message';

import AppContext from '../../context/AppContext';
import {LocalizationContext} from '../../context/Translations';
import {useProductByProductId} from '../../utils/hooks/useProduct';
import {useAddToCart} from '../../utils/hooks/useCart';

import PriceWithCurrency from '../../components/Common/PriceWithCurrency';
import ProductPropertyGroup from '../../components/ProductComponents/ProductPropertyGroup';
import ProductWhislistButton from '../../components/ProductComponents/ProductWhislistButton';
import ProductDetailVariants from '../../components/ProductComponents/ProductDetailVariants';
import ProductDetailMedia from '../../components/ProductComponents/ProductDetailMedia';
// import ProductDetailSimilarProducts from '../../components/ProductComponents/ProductDetailSimilarProducts';
// import ProductDetailRelatedProducts from '../../components/ProductComponents/ProductDetailRelatedProducts';

import {Styled} from './styles';

const ProductDetail = ({route}) => {
  const {customerActions} = useContext(AppContext);
  const {translations} = useContext(LocalizationContext);
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [initialQuantity, setInitialQuantity] = useState(1);

  const {isLoading, data} = useProductByProductId(route.params.productId);
  const {mutate} = useAddToCart();

  if (isLoading) {
    return <Text>..Loading</Text>;
  }

  function handleAddToCart() {
    const confSetLength = data.configuratorSet?.groups.length;
    const mutateVariables = {
      data,
      quantity: initialQuantity,
      selectedVariants,
    };
    if (!data.configuratorSet) {
      // NOTE: variantsiz
      mutate(mutateVariables);
    } else {
      // NOTE: variantli
      if (selectedVariants.length !== confSetLength) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: translations.variantError,
        });
      } else {
        mutate(mutateVariables);
      }
    }
  }

  useEffect(() => {
    customerActions.customerVisitedProducts(data);
  }, []);

  return (
    <>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Styled.ImageContainer>
          <ProductDetailMedia images={data.images} />
        </Styled.ImageContainer>
        <Styled.Wrapper>
          <Styled.TopContainer>
            <Styled.TextContainer>
              <Styled.ProductName>{data.name}</Styled.ProductName>
              <Styled.ProductPrice>
                {data.mainDetail.prices.map((price, index) => {
                  return (
                    <Div key={index} row>
                      <PriceWithCurrency price={price.price} product={data} />
                    </Div>
                  );
                })}
              </Styled.ProductPrice>
            </Styled.TextContainer>
            <Styled.FavoriteIconContainer>
              <ProductWhislistButton product={data} />
            </Styled.FavoriteIconContainer>
          </Styled.TopContainer>

          {data.mainDetail.inStock > 0 && (
            <Styled.ShipContainer>
              <Styled.ShipText>
                {translations.readyToShipToday}
                {': '}
              </Styled.ShipText>
              <Styled.ShipText>
                {translations.deliverytime}
                {': '}
                {data.mainDetail.shippingTime} {translations.workdays}
              </Styled.ShipText>
            </Styled.ShipContainer>
          )}
          {/* Description */}
          <Styled.DescriptionContainer>
            <Styled.DescriptionTitle>
              Products Description
            </Styled.DescriptionTitle>
            <HTMLView
              value={data.descriptionLong}
              TextComponent={(props) => <Styled.DescriptionText {...props} />}
            />
          </Styled.DescriptionContainer>
          {/* Categories */}
          <Styled.CategoryContainer>
            <Styled.DescriptionTitle>
              {'.'}
              {translations.categories}
            </Styled.DescriptionTitle>
            {data.categories.map((cat, index) => (
              <Styled.GeneralText key={index}>{cat.name}</Styled.GeneralText>
            ))}
          </Styled.CategoryContainer>
          {/* Variants */}
          {data.configuratorSet && (
            <Div my={15}>
              <Styled.DescriptionTitle>
                {'.'}
                {translations.variants}
              </Styled.DescriptionTitle>
              <ProductDetailVariants
                selectedVariants={selectedVariants}
                setSelectedVariants={setSelectedVariants}
                configuratorSet={data.configuratorSet}
                productData={data}
              />
            </Div>
          )}

          {/* Property Groups */}
          <ProductPropertyGroup product={data} />
          {/* Related Products */}
          {/* {productData.related && (
            <>
              <Styled.DescriptionTitle>
                {'.'}
                {translations.relatedProducts}
              </Styled.DescriptionTitle>
              <ProductDetailRelatedProducts product={productData} />
            </>
          )} */}
          {/* Similar products */}
          {/* {productData.similar && (
            <>
              <Styled.DescriptionTitle>
                {'.'}
                {translations.similarProducts}
              </Styled.DescriptionTitle>
              <ProductDetailSimilarProducts product={productData} />
            </>
          )} */}
        </Styled.Wrapper>
      </ScrollView>
      <SafeAreaView>
        {data.mainDetail.inStock > 0 ? (
          <Div row>
            <Button w="50%" onPress={() => handleAddToCart()}>
              {translations.addToCart}
            </Button>
            <Styled.SimpleStepper
              showText
              minimumValue={1}
              initialValue={initialQuantity}
              valueChanged={(value) => setInitialQuantity(value)}
            />
          </Div>
        ) : (
          <Styled.StyledSafeView noStock>
            <Styled.NoStockText>
              {translations.productNotAvailable}
            </Styled.NoStockText>
          </Styled.StyledSafeView>
        )}
      </SafeAreaView>
    </>
  );
};

export default ProductDetail;
