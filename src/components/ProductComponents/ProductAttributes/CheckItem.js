import React from 'react';
import _ from 'lodash';

import Checkbox from '../../../themes/components/CheckBox';

export default function componentName({onPress, option, selectedFilter}) {
  const checked = _.some(selectedFilter, {
    optionValue: option.optionValue,
  });

  return (
    <Checkbox label={option.optionValue} onPress={onPress} checked={checked} />
  );
}
