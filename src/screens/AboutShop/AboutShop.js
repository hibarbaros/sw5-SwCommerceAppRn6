import React from 'react';

import {useShopByShopId} from '../../utils/hooks/useApp';

import Paragraph from '../../themes/components/Paragraph/Paragraph';
import Container from '../../themes/components/Container/Container';

export default function AboutShop() {
	const {isLoading, error, data: shopData} = useShopByShopId();

	if (isLoading) return <Paragraph>Loading</Paragraph>;

	if (error) return <Paragraph>{error.message}</Paragraph>;

	console.log('shopData', shopData);

	return (
		<Container>
			<Paragraph>Shop Name : {shopData.name}</Paragraph>
			<Paragraph>Web Page : {shopData.hosts}</Paragraph>
			<Paragraph>Application Version : 1.0</Paragraph>
		</Container>
	);
}
