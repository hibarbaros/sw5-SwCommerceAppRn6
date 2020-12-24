import styled from 'styled-components/native';
import Carousel from 'react-native-snap-carousel';

const StyledCarousel = styled(Carousel).attrs({
	carouselContainer: {
		height: 200,
	},
	carousel: {
		flex: 1,
	},
})``;

export const Styled = {
	StyledCarousel,
};
