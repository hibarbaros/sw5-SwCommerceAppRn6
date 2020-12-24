import React, {useState, useContext} from 'react';
import {View, Text} from 'react-native';
import {useQuery} from 'react-query';

import CheckoutContext from '../../../context/CheckoutContext';

import {shippingsDataByCountry} from '../../../utils/actions/appactions';
import {Styled} from './styles';

export default function ShippingMethods() {
	const {selectedShippingAddress, setselectedShippingMethod} = useContext(
		CheckoutContext
	);

	const [isSelected, setIsSelected] = useState(null);

	const {isLoading, error, data} = useQuery(
		['shippingMethodsData', selectedShippingAddress],
		() => shippingsDataByCountry(selectedShippingAddress.country.id)
	);
	if (isLoading) return <Text>Loading...</Text>;

	if (error) return <Text>{error.message}</Text>;

	const handleCard = (shipping) => {
		setIsSelected(shipping.id);
		setselectedShippingMethod(shipping);
	};

	return (
		<View>
			{data &&
				data.map((shipping) => {
					return (
						<Styled.AddressCard
							key={shipping.id}
							selected={isSelected === shipping.id && true}
							onPress={() => handleCard(shipping)}>
							<Text>{shipping.name}</Text>
							<Text>{shipping.description}</Text>
							<Text>Cost : {shipping.detail.value}</Text>
						</Styled.AddressCard>
					);
				})}
		</View>
	);
}
