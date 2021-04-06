import React from 'react';
import {Styled} from './styles';

export default function FormErrorLabel({errorMessage}) {
  return <Styled.StyledErrorText>{errorMessage}</Styled.StyledErrorText>;
}
