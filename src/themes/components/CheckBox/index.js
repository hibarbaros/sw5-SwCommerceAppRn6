import React, {useState, useEffect} from 'react';
import {Checkbox as Check, Text} from 'react-native-magnus';

export default function FormCheckBox({
  label = '',
  onPress = () => {},
  checked = false,
}) {
  const [isChecked, setIsChecked] = useState(null);

  const handleChecked = () => {
    setIsChecked(!isChecked);
    onPress(!isChecked);
  };

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <Check
      suffix={
        <Text flex={1} ml={5} fontSize={16}>
          {label}
        </Text>
      }
      checked={isChecked}
      onChange={handleChecked}
      activeColor="primary"
    />
  );
}
