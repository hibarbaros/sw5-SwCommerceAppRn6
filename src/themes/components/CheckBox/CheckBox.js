import React, {useState} from 'react';
import {Checkbox, Text} from 'react-native-magnus';

export default function CheckBox({label, onPress}) {
  const [isChecked, setIsChecked] = useState(false);

  const handleChecked = () => {
    setIsChecked(!isChecked);
    onPress(!isChecked);
  };

  return (
    <Checkbox
      suffix={<Text flex={1}>{label}</Text>}
      checked={isChecked}
      onChange={handleChecked}
      activeColor="primary"
    />
  );
}
