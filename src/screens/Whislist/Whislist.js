import React, {useContext} from 'react';
import {ScrollView} from 'react-native';

import AppContext from '../../context/AppContext';
import ProductWhislistCard from '../../components/ProductComponents/ProductWhislistCard/ProductWhislistCard';
import {Container} from '../../themes/components';

export default function Whislist() {
	const {whislist} = useContext(AppContext);

	return (
		<Container>
			{whislist && (
				<ScrollView>
					{whislist.map((product, index) => (
						<ProductWhislistCard key={index} product={product} />
					))}
				</ScrollView>
			)}
		</Container>
	);
}
