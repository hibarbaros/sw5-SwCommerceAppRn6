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
  const {customerActions, cartCount} = useContext(AppContext);
  const {translations} = useContext(LocalizationContext);
  const {product} = route.params.productData;
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [initialQuantity, setInitialQuantity] = useState(1);

  const {isLoading, data: productData} = useProductByProductId(product.id);
  const {mutate} = useAddToCart();

  if (isLoading) {
    return <Text>..Loading</Text>;
  }

  useEffect(() => {
    console.log('cartCount', cartCount);
  }, [cartCount]);

  function handleAddToCart() {
    const confSetLength = productData.configuratorSet?.groups.length;
    const mutateVariables = {
      productData,
      quantity: initialQuantity,
      selectedVariants,
    };
    if (!productData.configuratorSet) {
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
    customerActions.customerVisitedProducts(productData);
  }, []);

  return (
    <>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Styled.ImageContainer>
          <ProductDetailMedia images={productData.images} />
        </Styled.ImageContainer>
        <Styled.Wrapper>
          <Styled.TopContainer>
            <Styled.TextContainer>
              <Styled.ProductName>{productData.name}</Styled.ProductName>
              <Styled.ProductPrice>
                {productData.mainDetail.prices.map((price, index) => {
                  return (
                    <Div key={index} row>
                      <PriceWithCurrency
                        price={price.price}
                        product={productData}
                      />
                    </Div>
                  );
                })}
              </Styled.ProductPrice>
            </Styled.TextContainer>
            <Styled.FavoriteIconContainer>
              <ProductWhislistButton product={productData} />
            </Styled.FavoriteIconContainer>
          </Styled.TopContainer>

          {productData.mainDetail.inStock > 0 && (
            <Styled.ShipContainer>
              <Styled.ShipText>
                {translations.readyToShipToday}
                {': '}
              </Styled.ShipText>
              <Styled.ShipText>
                {translations.deliverytime}
                {': '}
                {productData.mainDetail.shippingTime} {translations.workdays}
              </Styled.ShipText>
            </Styled.ShipContainer>
          )}
          {/* Description */}
          <Styled.DescriptionContainer>
            <Styled.DescriptionTitle>
              Products Description
            </Styled.DescriptionTitle>
            <HTMLView
              value={productData.descriptionLong}
              TextComponent={(props) => <Styled.DescriptionText {...props} />}
            />
          </Styled.DescriptionContainer>
          {/* Categories */}
          <Styled.CategoryContainer>
            <Styled.DescriptionTitle>
              {'.'}
              {translations.categories}
            </Styled.DescriptionTitle>
            {productData.categories.map((cat, index) => (
              <Styled.GeneralText key={index}>{cat.name}</Styled.GeneralText>
            ))}
          </Styled.CategoryContainer>
          {/* Variants */}
          {productData.configuratorSet && (
            <Div my={15}>
              <Styled.DescriptionTitle>
                {'.'}
                {translations.variants}
              </Styled.DescriptionTitle>
              <ProductDetailVariants
                selectedVariants={selectedVariants}
                setSelectedVariants={setSelectedVariants}
                configuratorSet={productData.configuratorSet}
                productData={productData}
              />
            </Div>
          )}

          {/* Property Groups */}
          <ProductPropertyGroup product={productData} />
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
        {productData.mainDetail.inStock > 0 ? (
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
