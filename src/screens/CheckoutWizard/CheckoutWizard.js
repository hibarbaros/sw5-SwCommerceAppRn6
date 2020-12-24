import React, {useContext} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {View, Text} from 'react-native-ui-lib';
import {Button} from '@ui-kitten/components';
import {useMutation} from 'react-query';
import Toast from 'react-native-toast-message';

import {Container} from '../../themes/components';
import AppContext from '../../context/AppContext';
import CheckoutContext from '../../context/CheckoutContext';
import {orderCreate} from '../../utils/actions/orderactions';
import AppRoute from '../../utils/approutes';
import CartTotalPrice from '../../components/Common/CartTotalPrice/CartTotalPrice';
import UserLoginForm from '../../components/UserComponents/UserLoginForm/UserLoginForm';
import ProductCardMini from '../../components/Common/ProductCardMini/ProductCardMini';
import ShippingMethods from '../../components/CheckoutComponents/ShippingMethods/ShippingMethods';
import PaymentMethods from '../../components/CheckoutComponents/PaymentMethods/PaymentMethods';
import Address from '../../components/CheckoutComponents/Address/Address';
import LoadSpinner from '../../components/Common/LoadSpinner/LoadSpinner';

export default function CheckoutWizard() {
	const {userCart, user, currency} = useContext(AppContext);
	const {
		selectedPaymentMethod,
		selectedShippingMethod,
		selectedShippingAddress,
		selectedBilllingAddress,
	} = useContext(CheckoutContext);
	const navigation = useNavigation();

	//TODO: mutate leri useorder a tasi

	const [addOrderMutate, {isLoading: checkoutLoading}] = useMutation(
		orderCreate,
		{
			onSuccess: (data) => {
				if (data) {
					Toast.show({
						text1: 'Success',
						text2: 'Ihre Transaktion ist erfolgreich',
					});
					navigation.push(AppRoute.CHECKOUT_ORDER, {
						orderId: data.id,
					});
				} else {
					Toast.show({
						type: 'error',
						text1: 'Error',
						text2: 'Bitte überprüfen Sie Ihr Formular',
					});
				}
			},
		}
	);

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
									<ProductCardMini
										key={product.id}
										product={product}
										detail={product}
									/>
								))}
							<CartTotalPrice />
						</Container>
						<View margin-s5>
							<Button onPress={() => handleOrderCreate()}>
								Check
							</Button>
						</View>
					</SafeAreaView>
				</ScrollView>
			)}
			{!user && (
				<Container>
					<UserLoginForm />
					<View margin-s5>
						<Button
							onPress={() =>
								navigation.navigate(AppRoute.REGISTER)
							}>
							Register
						</Button>
					</View>
				</Container>
			)}
		</>
	);
}
