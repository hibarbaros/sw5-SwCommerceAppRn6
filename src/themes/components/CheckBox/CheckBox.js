import React, {useState} from 'react';

import {Styled} from './styles';

export default function CheckBox({label, onPress}) {
  const [isChecked, setIsChecked] = useState(false);

  const handleChecked = () => {
    setIsChecked(!isChecked);
    onPress(!isChecked);
  };

  return (
    <Styled.Container onPress={handleChecked}>
      <Styled.Box onPress={handleChecked}>
        <Styled.CheckIcon isChecked={isChecked} />
      </Styled.Box>
      <Styled.Label>{label}</Styled.Label>
    </Styled.Container>
  );
}
