import React, {useState} from 'react';
import _ from 'lodash';

import {Button} from 'themes/components';

export default function componentName({onPress, option, selectedFilter}) {
  const [isToggle, setIsTIggle] = useState(true);

  const checked = _.some(selectedFilter, {
    optionValue: option.optionValue,
  });

  function handleCheck() {
    setIsTIggle(!isToggle);
    onPress(isToggle);
  }

  return (
    <Button
      text={option.optionValue}
      m={3}
      onPress={handleCheck}
      variant={checked ? 'primary' : 'outline'}
    />
  );
}
