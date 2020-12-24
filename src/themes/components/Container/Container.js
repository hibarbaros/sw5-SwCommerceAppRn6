import React from 'react';
import {View} from 'react-native-ui-lib';

export default function Container(props) {
	return (
		<View marginV-s5 marginH-s5>
			{props.children}
		</View>
	);
}
