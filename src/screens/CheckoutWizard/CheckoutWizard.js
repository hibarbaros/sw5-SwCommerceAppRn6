import React, {useContext} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {View, Text} from 'react-native-ui-lib';
import {Button} from '@ui-kitten/components';
import Toast from 'react-native-toast-message';

import {Container} from '../../themes/components';
import AppContext from '../../context/AppContext';
import CheckoutContext from '../../context/CheckoutContext';
import {useCreateOrder} from '../../utils/hooks/useOrder';
import AppRoute from '../../utils/approutes';
import CartTotalPrice from '../../components/Common/CartTotalPrice';
import UserLoginForm from '../../components/UserComponents/UserLoginForm';
import CartBox from '../../components/Common/CartBox';
import ShippingMethods from '../../components/CheckoutComponents/ShippingMethods/ShippingMethods';
import PaymentMethods from '../../components/CheckoutComponents/PaymentMethods/PaymentMethods';
import Address from '../../components/CheckoutComponents/Address';
import LoadSpinner from '../../components/Common/LoadSpinner';

export default function CheckoutWizard() {
  const {userCart, user, currency} = useContext(AppContext);
  const {
    selectedPaymentMethod,
    selectedShippingMethod,
    selectedShippingAddress,
    selectedBilllingAddress,
  } = useContext(CheckoutContext);
  const navigation = useNavigation();

  const {mutate: addOrderMutate, isLoading: checkoutLoading} = useCreateOrder();

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
      const orderData = {
        userCart,
        user,
        paymentMethodId: selectedPaymentMethod.id,
        currency,
        selectedShippingAddress,
        selectedBilllingAddress,
        selectedShippingMethod,
      };
      addOrderMutate(orderData);
    }
  }

  return (
    <>
      <LoadSpinner isVisible={checkoutLoading} />

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
              {userCart &&
                userCart.map((product) => (
                  <CartBox
                    key={product.id}
                    wizard={true}
                    product={product}
                    detail={product}
                  />
                ))}
              <CartTotalPrice />
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
