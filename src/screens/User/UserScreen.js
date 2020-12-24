import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {Container} from '../../themes/components';
import UserProfile from '../../components/UserComponents/UserProfile/UserProfile';
import UserAddressList from '../../components/UserComponents/UserAddressList/UserAddressList';

export default function UserScreen() {
	return (
		<SafeAreaView>
			<ScrollView>
				<Container>
					<UserProfile />
					<UserAddressList />
				</Container>
			</ScrollView>
		</SafeAreaView>
	);
}
