import React from 'react';
import {Text, View} from 'react-native-ui-lib';

import CategoryProducts from './CategoryProducts';
import {Headline} from '../../../themes/components';

import {useAllReacomendedCategories} from '../../../utils/hooks/useCategory';

export default function HomeRecomendedCategories() {
	const {isLoading, data: categories} = useAllReacomendedCategories(
		'homescreencategories'
	);

	if (isLoading) return <Text>Loading</Text>;

	return categories.map((category) => {
		const {id, name} = category;
		return (
			<View key={id}>
				<View marginL-s5 marginT-s5>
					<Headline type="h6">{name}</Headline>
				</View>
				<CategoryProducts categoryId={id} />
			</View>
		);
	});
}
