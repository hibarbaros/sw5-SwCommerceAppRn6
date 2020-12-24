import styled from 'styled-components/native';
import {View, Text} from 'react-native-ui-lib';
import {ScrollView, Modal, SafeAreaView} from 'react-native';
import {MenuItem} from '@ui-kitten/components';
import {sanFranciscoWeights} from 'react-native-typography';

import {colors} from '../../themes/variables';

const Container = styled(View)`
	padding: 0px 20px;
`;

const Title = styled(Text)`
	color: ${colors.themeColor};
	font-size: 26px;
	padding: 20px;
	${sanFranciscoWeights.bold};
`;

const StyledMenuItem = styled(MenuItem)``;

const StyledScrollView = styled(ScrollView)`
	margin-bottom: 120px;
`;

const StyledModal = styled(Modal)``;

const StyledSafeAreaView = styled(SafeAreaView)``;

export const Styled = {
	Container,
	Title,
	StyledMenuItem,
	StyledScrollView,
	StyledModal,
	StyledSafeAreaView,
};
