import styled from 'styled-components/native';
import {Icon} from '@ui-kitten/components';

import {theme} from 'themes/theme';

const FavoriteIcon = styled(Icon).attrs((props) => ({
  fill: props.isSelected ? theme.colors.secondary : theme.colors.primary,
}))``;

export const Styled = {
  FavoriteIcon,
};
