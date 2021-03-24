import React, {useContext} from 'react';
import {ScrollView, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import CartBox from '../../components/Common/CartBox';
import CartTotalPrice from '../../components/Common/CartTotalPrice';
import {LocalizationContext} from '../../context/Translations';
import {Container, Button} from '../../themes/components';
import AppRoutes from '../../utils/approutes';
import {useUserCart} from '../../utils/hooks/useCart';

import LoadSpinner from '../../components/Common/LoadSpinner';

const CartScreen = () => {
  const navigation = useNavigation();
  const {translations} = useContext(LocalizationContext);

  const {data = [], isLoading} = useUserCart();

  return (
    <>
      <LoadSpinner isVisible={isLoading} />
      {data.length > 0 ? (
        <ScrollView>
          <Container>
            {data.map((product) => (
              <CartBox
                key={product.articleId}
                productId={product.articleId}
                quantity={product.quantity}
              />
            ))}
            <CartTotalPrice cart={data} />
            <Button
              size="small"
              text={translations.checkOut}
              onPress={() => {
                navigation.navigate(AppRoutes.CHECKOUT_WIZARD);
              }}
            />
          </Container>
        </ScrollView>
      ) : (
        <Container>
          <Text>In Ihrem Warenkorb befinden sich keine Artikel</Text>
        </Container>
      )}
    </>
  );
};

export default CartScreen;
