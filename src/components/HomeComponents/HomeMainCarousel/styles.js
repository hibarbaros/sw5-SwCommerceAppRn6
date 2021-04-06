import styled from 'styled-components/native';
import {AnimatedImage} from 'react-native-ui-lib';

const StyledAnimatedImage = styled(AnimatedImage).attrs({
  marginBottom: 10,
})`
  height: 250px;
  width: 100%;
`;

const LoadingContainer = styled.View`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Styled = {
  StyledAnimatedImage,
  LoadingContainer,
};
