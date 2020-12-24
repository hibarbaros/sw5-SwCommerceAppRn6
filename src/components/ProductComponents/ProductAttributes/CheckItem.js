import React, {useContext} from 'react';
import _ from 'lodash';
import {CheckBox} from '@ui-kitten/components';

import FilterContext from '../../../context/FilterContext';

import {Styled} from './styles';

const CheckItem = ({option, products}) => {
	const {
		selectedOptions,
		setSelectedOptions,
		setFilteredProducts,
	} = useContext(FilterContext);
	let arrayList = [];
	products.forEach((element) => arrayList.push(element.filters));

	const handleChecked = (nextChecked, option) => {
		const filtered = _.filter(_.flatten(arrayList), {
			valueID: option.valueID,
		});
		const finded = _.intersectionBy(products, filtered, 'articleID');
		setFilteredProducts(finded);
		let optionList = [...selectedOptions];
		nextChecked ? optionList.push(option) : _.remove(optionList, option);
		setSelectedOptions(optionList);
	};

	const isCheck = _.some(selectedOptions, {valueID: option.valueID});

	return (
		<Styled.CheckItemContainer>
			<CheckBox
				checked={isCheck}
				onChange={(nextChecked) => handleChecked(nextChecked, option)}>
				{option.optionValue}
			</CheckBox>
		</Styled.CheckItemContainer>
	);
};

export default CheckItem;
