import React, {useState, useContext} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {Div, Text} from 'react-native-magnus';
import HTMLView from 'react-native-htmlview';
import Toast from 'react-native-toast-message';
//*context
import {LocalizationContext} from '../../context/Translations';
import AppContext from '../../context/AppContext';
//*utils
import {useProductByProductId} from '../../utils/hooks/useProduct';
import {useAddToCart} from '../../utils/hooks/useCart';
import {useAddToVisitedlist} from '../../utils/hooks/useVisitedProduct';
//*components
import PriceWithCurrency from '../../components/Common/PriceWithCurrency';
import ProductPropertyGroup from '../../components/ProductComponents/ProductPropertyGroup';
import ProductWhislistButton from '../../components/ProductComponents/ProductWhislistButton';
import ProductDetailVariants from '../../components/ProductComponents/ProductDetailVariants';
import ProductDetailMedia from '../../components/ProductComponents/ProductDetailMedia';
import ProductCarousel from '../../components/Common/ProductCarousel';
import {Button} from '../../themes/components';
import LoadSpinner from '../../components/Common/LoadSpinner';

import {Styled} from './styles';

const ProductDetail = ({route}) => {
  const {translations} = useContext(LocalizationContext);
  const {selectedTranslate} = useContext(AppContext);
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [initialQuantity, setInitialQuantity] = useState(1);

  const {data, isLoading} = useProductByProductId(route.params.productId);
  const {mutate, isLoading: mutateLoading} = useAddToCart();
  useAddToVisitedlist(route.params.productId);

  if (isLoading) {
    return <LoadSpinner isVisible={true} />;
  }

  function handleAddToCart() {
    const confSetLength = data.configuratorSet?.groups.length;
    const mutateVariables = {
      productData: data,
      quantity: initialQuantity,
      selectedVariants,
    };
    if (!data.configuratorSet) {
      // NOTE: variantsiz
      mutate(mutateVariables);
    } else {
      // NOTE: variantli
      if (selectedVariants.length === confSetLength) {
        mutate(mutateVariables);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: translations.variantError,
        });
      }
    }
  }

  const translation = data.translations.find(
    (x) => x.languageID === selectedTranslate.toString(),
  );

  const name = translation ? translation.name : data.name;
  const description = translation
    ? translation.description_long
    : data.descriptionLong;

  return (
    <>
      <LoadSpinner isVisible={mutateLoading} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Styled.ImageContainer>
          <ProductDetailMedia images={data?.images} />
        </Styled.ImageContainer>
        <Styled.Wrapper>
          <Styled.TopContainer>
            <Styled.TextContainer>
              <Styled.ProductName>
                {name} {data.id}
              </Styled.ProductName>
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
              <ProductWhislistButton productId={data.id} />
            </Styled.FavoriteIconContainer>
          </Styled.TopContainer>

          {data.mainDetail.inStock > 0 && (
            <Styled.ShipContainer>
              <Styled.ShipText>
                {`${translations.readyToShipToday} :`}
              </Styled.ShipText>
              <Styled.ShipText>
                {`${translations.deliverytime} :`}
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
              value={description}
              TextComponent={(props) => <Styled.DescriptionText {...props} />}
            />
          </Styled.DescriptionContainer>

          {/* Categories */}
          <Styled.CategoryContainer>
            <Styled.DescriptionTitle>
              {`${translations.categories}.`}
            </Styled.DescriptionTitle>
            {data.categories.map((cat, index) => (
              <Styled.GeneralText key={index}>{cat.name}</Styled.GeneralText>
            ))}
          </Styled.CategoryContainer>

          {/* Variants */}
          {data.configuratorSet && (
            <Div my={15}>
              <Styled.DescriptionTitle>
                {`${translations.variants}.`}
              </Styled.DescriptionTitle>
              <ProductDetailVariants
                selectedVariants={selectedVariants}
                setSelectedVariants={setSelectedVariants}
                groups={data.configuratorSet.groups}
                productData={data}
              />
            </Div>
          )}

          {/* Property Groups */}
          {data.propertyGroup && (
            <ProductPropertyGroup
              groupId={data.propertyGroup.id}
              propertyValues={data.propertyValues}
            />
          )}

          {/* Related Products */}
          {data.related && (
            <>
              <Styled.DescriptionTitle>
                {`.${translations.relatedProducts}`}
              </Styled.DescriptionTitle>
              <ProductCarousel data={data.related} cardTheme="theme02" />
            </>
          )}

          {/* Similar products */}
          {data.similar && (
            <>
              <Styled.DescriptionTitle>
                {`.${translations.similarProducts}`}
              </Styled.DescriptionTitle>
              <ProductCarousel data={data.similar} cardTheme="theme02" />
            </>
          )}
        </Styled.Wrapper>
      </ScrollView>
      {data.mainDetail.inStock > 0 ? (
        <SafeAreaView>
          <Div row h={50} alignItems="center">
            <Div w="60%">
              <Button
                h="100%"
                rounded={0}
                m={0}
                block
                onPress={() => handleAddToCart()}
                text={translations.addToCart}
              />
            </Div>
            <Div w="40%">
              <Styled.SimpleStepper
                textPosition="center"
                incrementImage={require('../../assets/images/icon-plus.png')}
                decrementImage={require('../../assets/images/icon-minus.png')}
                showText
                minimumValue={1}
                initialValue={initialQuantity}
                valueChanged={(value) => setInitialQuantity(value)}
              />
            </Div>
          </Div>
        </SafeAreaView>
      ) : (
        <SafeAreaView>
          <Div bg="red" p={20}>
            <Text color="white">{translations.productNotAvailable}</Text>
          </Div>
        </SafeAreaView>
      )}
    </>
  );
};

export default ProductDetail;
