import React, {useContext} from 'react';
import AppContext from '../../../context/AppContext';
import {useNavigation} from '@react-navigation/native';
import {Button, ButtonGroup} from '@ui-kitten/components';
import {Card, View, Text} from 'react-native-ui-lib';
import {EditIcon, TrashIcon} from '../../../themes/components/IconSet';
import AppRoute from '../../../utils/approutes';

export default function UserBillingAddress({checkout = false}) {
	const navigation = useNavigation();
	const {user} = useContext(AppContext);
	const {defaultBillingAddress} = user;

	return (
		<>
			{defaultBillingAddress && (
				<Card borderRadius={0} marginB-s5 padding-15 enableShadow={false}>
					<Text marginB-s3 text60>
						Default Billing Address
					</Text>
					<Text>{defaultBillingAddress.title}</Text>
					<Text>
						{defaultBillingAddress.firstname} {defaultBillingAddress.lastname}
					</Text>
					<Text>{defaultBillingAddress.street}</Text>
					<Text>{defaultBillingAddress.city}</Text>
					<Text>{defaultBillingAddress.zipcode}</Text>
					<Text>{defaultBillingAddress.country.name}</Text>
					{!checkout && (
						<View row marginT-s3 flex right>
							<ButtonGroup size="tiny">
								<Button accessoryLeft={TrashIcon}>Delete</Button>
								<Button
									accessoryLeft={EditIcon}
									onPress={() =>
										navigation.navigate(AppRoute.ADDRESS_EDIT, {
											userAddress: defaultBillingAddress,
										})
									}>
									Edit
								</Button>
							</ButtonGroup>
						</View>
					)}
				</Card>
			)}
		</>
	);
}
