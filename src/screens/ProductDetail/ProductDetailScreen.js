import React, {useState, useContext} from 'react';
import {ScrollView, SafeAreaView} from 'react-native';
import {View, Text} from 'react-native-ui-lib';
import {Button} from '@ui-kitten/components';
import HTMLView from 'react-native-htmlview';
import Toast from 'react-native-toast-message';

import AppContext from '../../context/AppContext';
import {LocalizationContext} from '../../context/Translations';
import {useProductByProductId} from '../../utils/hooks/useProduct';

import PriceWithCurrency from '../../components/Common/PriceWithCurrency';
import ProductPropertyGroup from '../../components/ProductComponents/ProductPropertyGroup';
import ProductWhislistButton from '../../components/ProductComponents/ProductWhislistButton';
import ProductDetailSimilarProducts from '../../components/ProductComponents/ProductDetailSimilarProducts';
import ProductDetailVariants from '../../components/ProductComponents/ProductDetailVariants';
import ProductDetailMedia from '../../components/ProductComponents/ProductDetailMedia';
import ProductDetailRelatedProducts from '../../components/ProductComponents/ProductDetailRelatedProducts';

import {Styled} from './styles';
import {colors} from '../../themes/variables';

//TODO ürün varyantlarina göre numarasi secilecek ve sepete o numara ile eklenecek
//TODO: ziyaret edilmis ürünleri firebase e kaydetme

const ProductDetail = ({route}) => {
  const {cartActions, customerActions} = useContext(AppContext);
  const {translations} = useContext(LocalizationContext);
  const {product} = route.params.productData;
  const [selectedVariants, setSelectedVariants] = useState([]);

  const {isLoading, error, data: productData} = useProductByProductId(
    product.id,
  );

  isLoading && <Text>..Loading</Text>;

  error && <Text>An error has occurred: {error.message} </Text>;

  // console.tron.warn(productData);

  customerActions.customerVisitedProducts(productData);
  function handleAddToCart() {
    // NOTE: variant yok ise sepet islemi
    if (!productData.configuratorSet) {
      cartActions.addToCart(productData);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: translations.addToCartMessage,
      });
    }
    // NOTE: variant var ise sepet islemi
    if (productData.configuratorSet) {
      if (
        selectedVariants.length !== productData.configuratorSet.groups.length
      ) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: translations.variantError,
        });
      }
      if (
        selectedVariants.length === productData.configuratorSet.groups.length
      ) {
        // NOTE:  variantlari tutan ürün bulunuyor
        let obj = [];
        obj.push(productData.mainDetail);
        const flatDetail = [...productData.details, ...obj];
        flatDetail.forEach((element) => {
          let findedCount = 0;
          selectedVariants.forEach((variant) => {
            const finded = element.configuratorOptions.find(
              (x) => x.name === variant.variant.name,
            );

            if (finded) {
              findedCount++;
              if (findedCount === selectedVariants.length) {
                productData.variantProduct = element;
                cartActions.addToCart(productData);
              }
            }
          });
        });
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: translations.addToCartMessage,
        });
      }
    }
  }

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
                    <View key={index} flex row>
                      <PriceWithCurrency
                        price={price.price}
                        product={productData}
                      />
                    </View>
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
            <View marginV-s3>
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
            </View>
          )}

          {/* Property Groups */}
          <ProductPropertyGroup product={productData} />
          {/* Related Products */}
          {productData.related && (
            <>
              <Styled.DescriptionTitle>
                {'.'}
                {translations.relatedProducts}
              </Styled.DescriptionTitle>
              <ProductDetailRelatedProducts product={productData} />
            </>
          )}
          {/* Similar products */}
          {productData.similar && (
            <>
              <Styled.DescriptionTitle>
                {'.'}
                {translations.similarProducts}
              </Styled.DescriptionTitle>
              <ProductDetailSimilarProducts product={productData} />
            </>
          )}
        </Styled.Wrapper>
      </ScrollView>
      {productData.mainDetail.inStock > 0 && (
        <SafeAreaView
          style={{
            backgroundColor: colors.themeColor,
          }}>
          <Button onPress={() => handleAddToCart()}>
            {translations.addToCart}
          </Button>
        </SafeAreaView>
      )}
      {productData.mainDetail.inStock === 0 && (
        <SafeAreaView
          style={{
            backgroundColor: colors.red,
          }}>
          <Text center marginT-s5 text90 style={{color: colors.white}}>
            {translations.productNotAvailable}
          </Text>
        </SafeAreaView>
      )}
    </>
  );
};

export default ProductDetail;
