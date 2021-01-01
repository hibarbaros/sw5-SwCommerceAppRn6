import React from 'react';
import {Styled} from './styles';

const headlines = {
  h1: Styled.H1,
  h2: Styled.H2,
  h3: Styled.H3,
  h4: Styled.H4,
  h5: Styled.H5,
  h6: Styled.H6,
};

const Headline = ({children, type = 'h4', hideTopMargin}) => {
  const SelectedHeadline = headlines[type];
  if (!SelectedHeadline) {
    return null;
  }

  return (
    <SelectedHeadline hideTopMargin={hideTopMargin}>
      {children}
    </SelectedHeadline>
  );
};

export default Headline;
