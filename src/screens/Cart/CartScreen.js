import React, {useContext} from 'react';
import {ScrollView, Text} from 'react-native';
import CartBox from '../../components/Common/CartBox';
import CartTotalPrice from '../../components/Common/CartTotalPrice';
import AppContext from '../../context/AppContext';
import {LocalizationContext} from '../../context/Translations';
import {Container, Button} from '../../themes/components';
import {useNavigation} from '@react-navigation/native';
import AppRoutes from '../../utils/approutes';

const CartScreen = () => {
  const {userCart} = useContext(AppContext);
  const {translations} = useContext(LocalizationContext);
  const navigation = useNavigation();

  console.log('userCart', userCart);

  return (
    <>
      {userCart && (
        <ScrollView>
          <Container>
            {userCart.map((product) => (
              <CartBox
                key={product.id}
                productId={product.id}
                quantity={product.quantity}
              />
            ))}
            {/* <CartTotalPrice /> */}
            <Button
              size="small"
              text={translations.checkOut}
              onPress={() => {
                navigation.navigate(AppRoutes.CHECKOUT_WIZARD);
              }}
            />
          </Container>
        </ScrollView>
      )}
      {!userCart && (
        <Container>
          <Text>In Ihrem Warenkorb befinden sich keine Artikel</Text>
        </Container>
      )}
    </>
  );
};

export default CartScreen;
