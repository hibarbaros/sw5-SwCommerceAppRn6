import React from 'react';
import {TopNavigation, TopNavigationAction} from '@ui-kitten/components';

const TopNavigationModal = ({onPress, icon, modalTitle, alignment}) => {
	const BackAction = () => (
		<TopNavigationAction icon={icon} onPress={onPress} />
	);

	return (
		<TopNavigation
			alignment={alignment}
			accessoryLeft={BackAction}
			title={modalTitle}
		/>
	);
};

export default TopNavigationModal;
