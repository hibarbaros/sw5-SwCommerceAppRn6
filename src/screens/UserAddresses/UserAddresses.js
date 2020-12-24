import React, {useContext} from 'react';
import {ScrollView, Text} from 'react-native';
import {useQuery} from 'react-query';

import {customerData} from '../../utils/actions/useractions';

import AppContext from '../../context/AppContext';
import {Container} from '../../themes/components';
import UserAddressList from '../../components/UserComponents/UserAddressList/UserAddressList';

export default function UserAddresses() {
	const {user} = useContext(AppContext);

	const {isLoading, data} = useQuery('UserAddresses', () => customerData(user));

	if (isLoading) return <Text>'Loading...'</Text>;

	return (
		<ScrollView>
			<Container>
				<UserAddressList data={data} />
			</Container>
		</ScrollView>
	);
}
