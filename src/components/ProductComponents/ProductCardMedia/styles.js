import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

const MediaImage = styled(FastImage)`
	height: 100%;
	width: 100%;
`;

const Indicator = styled.View`
	height: 100%;
	justify-content: center;
	align-items: center;
`;

export const Styled = {
	MediaImage,
	Indicator,
};
