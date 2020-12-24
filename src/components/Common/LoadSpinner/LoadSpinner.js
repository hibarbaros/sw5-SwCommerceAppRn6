import React from 'react';
import {Modal, Text} from 'react-native';

import {Styled} from './styles';

export default ({isVisible}) => {
	return (
		<Modal animationType="fade" transparent={true} visible={isVisible}>
			<Styled.Container>
				<Text>...Loading With Logo</Text>
			</Styled.Container>
		</Modal>
	);
};
