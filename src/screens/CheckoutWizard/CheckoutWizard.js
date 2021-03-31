import React, {useContext} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {View, Text} from 'react-native-ui-lib';
import {Button} from '@ui-kitten/components';
import Toast from 'react-native-toast-message';

import {Container} from '../../themes/components';
import AppContext from '../../context/AppContext';
import CheckoutContext from '../../context/CheckoutContext';
import AppRoute from '../../utils/approutes';
import CartTotalPrice from '../../components/Common/CartTotalPrice';
import UserLoginForm from '../../components/UserComponents/UserLoginForm';
import CartBox from '../../components/Common/CartBox';
import ShippingMethods from '../../components/CheckoutComponents/ShippingMethods';
import PaymentMethods from '../../components/CheckoutComponents/PaymentMethods';
import Address from '../../components/CheckoutComponents/Address';
import LoadSpinner from '../../components/Common/LoadSpinner';

import {useCreateOrder} from '../../utils/hooks/useOrder';
import {useUserCart} from '../../utils/hooks/useCart';

export default function CheckoutWizard() {
  const {user} = useContext(AppContext);
  const {selectedPaymentMethod, selectedShippingMethod} = useContext(
    CheckoutContext,
  );
  const navigation = useNavigation();

  const {mutate, isLoading} = useCreateOrder();
  const {data = []} = useUserCart();

  function handleOrderCreate() {
    if (!selectedPaymentMethod) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Bitte wählen Sie das Zahlungssystem',
      });
      return null;
    }
    if (!selectedShippingMethod) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Bitte wählen Sie das Shipping Method',
      });
      return null;
    }
    if (selectedPaymentMethod) {
      // addOrderMutate(orderData);
    }
  }

  return (
    <>
      <LoadSpinner isVisible={isLoading} />

      {user && (
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <SafeAreaView>
            <Container>
              <Text text60>Addresses</Text>
              <Address />
            </Container>
            <Container>
              <Text text60 marginB-s5>
                Shipping Methods
              </Text>
              <ShippingMethods />
              <Text text60 marginB-s5>
                Payments Methods
              </Text>
              <PaymentMethods />
              <Text text60 marginB-s5>
                Cart
              </Text>

              {data.length > 0 &&
                data.map((product) => (
                  <CartBox
                    key={product.articleId}
                    productId={product.articleId}
                    quantity={product.quantity}
                  />
                ))}
              <CartTotalPrice cart={data} />
            </Container>
            <View margin-s5>
              <Button onPress={() => handleOrderCreate()}>Check</Button>
            </View>
          </SafeAreaView>
        </ScrollView>
      )}
      {!user && (
        <Container>
          <UserLoginForm />
          <View margin-s5>
            <Button onPress={() => navigation.navigate(AppRoute.REGISTER)}>
              Register
            </Button>
          </View>
        </Container>
      )}
    </>
  );
}
