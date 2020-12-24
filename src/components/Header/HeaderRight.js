import React from 'react';
import {useNavigation} from '@react-navigation/native';
import AppRoutes from '../../utils/approutes';

import {BellIcon} from '../../themes/components/IconSet';
import {colors} from '../../themes/variables';
import {Styled} from './styles';

export default function HeaderRight() {
	const navigation = useNavigation();
	return (
		<Styled.RightHeaderContainer>
			<BellIcon
				fill={colors.themeColor}
				onPress={() => {
					navigation.navigate(AppRoutes.LOCAL_NOTIFICATION);
				}}
			/>
		</Styled.RightHeaderContainer>
	);
}
