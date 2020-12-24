import styled from 'styled-components/native';
import {Icon} from '@ui-kitten/components';

import {colors} from '../../../themes/variables';

const FavoriteIcon = styled(Icon).attrs((props) => ({
  fill: props.isSelected ? colors.red : colors.themeColor,
}))``;

export const Styled = {
  FavoriteIcon,
};
