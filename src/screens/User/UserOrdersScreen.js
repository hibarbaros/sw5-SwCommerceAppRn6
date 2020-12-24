import React from 'react';
import {ScrollView} from 'react-native';
import UserOrderList from '../../components/UserComponents/UserOrderList/UserOrderList';
import {Container} from '../../themes/components';

export default function UserOrdersScreen() {
	return (
		<ScrollView>
			<Container>
				<UserOrderList />
			</Container>
		</ScrollView>
	);
}
