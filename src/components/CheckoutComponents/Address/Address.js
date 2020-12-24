import React, {useContext, useState} from 'react';
import {SafeAreaView, Modal, ScrollView, Text} from 'react-native';
import {TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {View} from 'react-native-ui-lib';
import {useQuery} from 'react-query';

import {customerData} from '../../../utils/actions/useractions';

import AppContext from '../../../context/AppContext';
import {LocalizationContext} from '../../../context/Translations';
import CheckoutContext from '../../../context/CheckoutContext';
import {Container, Button} from '../../../themes/components';
import {CloseIcon} from '../../../themes/components/IconSet';
import AddressCard from '../AddressCard/AddressCard';

export default function Address() {
	const {user} = useContext(AppContext);
	const {translations} = useContext(LocalizationContext);

	const {
		selectedBilllingAddress,
		setselectedBilllingAddress,
		selectedShippingAddress,
		setselectedShippingAddress,
	} = useContext(CheckoutContext);
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedAddress, setSelectedAddress] = useState(null);

	const {isLoading, data: userData} = useQuery(
		['checkoutAddress'],
		() => customerData(user),
		{
			onSuccess: (res) => {
				setselectedBilllingAddress(res.defaultBillingAddress);
				setselectedShippingAddress(res.defaultShippingAddress);
			},
		}
	);

	if (isLoading) return <Text>Loading</Text>;

	const BackAction = () => (
		<TopNavigationAction
			icon={CloseIcon}
			onPress={() => setModalVisible(false)}
		/>
	);

	const TopNavigationModal = () => <TopNavigation accessoryLeft={BackAction} />;

	return (
		<>
			{userData && (
				<Container>
					{selectedBilllingAddress && (
						<AddressCard addressId={selectedBilllingAddress.id} />
					)}
					<View marginB-s5 center flex>
						<Button
							onPress={() => {
								setModalVisible(true);
								setSelectedAddress(1);
							}}
							size="tiny"
							text={translations.CheckoutSelectBillingAddress}
						/>
					</View>
					<View marginT-s5>
						{selectedShippingAddress && (
							<AddressCard addressId={selectedShippingAddress.id} />
						)}
					</View>
					<View marginB-s5 center flex>
						<Button
							onPress={() => {
								setModalVisible(true);
								setSelectedAddress(2);
							}}
							size="tiny"
							text={translations.CheckoutSelectShippingAddress}
						/>
					</View>
				</Container>
			)}
			<SafeAreaView>
				<Modal animationType="slide" transparent={false} visible={modalVisible}>
					<SafeAreaView>
						<TopNavigationModal />
						<ScrollView>
							<Container>
								{userData.address.map((address, i) => {
									return (
										<AddressCard
											key={i}
											selectable={true}
											addressId={address.id}
											setModalVisible={setModalVisible}
											selectedAddress={selectedAddress}
										/>
									);
								})}
							</Container>
						</ScrollView>
					</SafeAreaView>
				</Modal>
			</SafeAreaView>
		</>
	);
}
