import React, {useContext} from 'react';
import NestedListView from 'react-native-nested-listview';
import {Text} from 'react-native-ui-lib';
import {ListItem, Button} from '@ui-kitten/components';
import {setProductCategories} from '../../utils/functions';
import AppRoute from '../../utils/approutes';
import {useAllCategories} from '../../utils/hooks/useCategory';
import {LocalizationContext} from '../../context/Translations';

export default function CategoriesScreen({navigation}) {
	const {translations} = useContext(LocalizationContext);

	const {isLoading, error, data: allCategories} = useAllCategories();

	if (isLoading) return <Text>Loading </Text>;

	if (error) return <Text>An error has occurred: {error.message} </Text>;

	const renderNode = (node, level) => {
		const paddingLeft = level * 20;
		const arrow = node.children ? '+' : '';

		return (
			<ListItem
				style={{paddingLeft}}
				disabled={true}
				title={`${arrow} ${node.name}`}
				accessoryRight={() => DetailButton(node)}
			/>
		);
	};

	const DetailButton = (node) => (
		<Button
			onPress={() =>
				navigation.navigate(AppRoute.CATEGORIES_PRODUCTS, {category: node})
			}
			size="tiny">
			{translations.products}
		</Button>
	);

	return (
		<>
			<Text blue30 text70 margin-s5>
				{translations.allCategories}
			</Text>
			<NestedListView
				data={setProductCategories(allCategories)}
				getChildrenName={() => 'children'}
				renderNode={renderNode}
			/>
		</>
	);
}
