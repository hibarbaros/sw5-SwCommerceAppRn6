import React from 'react';
import styled from 'styled-components/native';
import {Icon} from '@ui-kitten/components';

export const StarIcon = (props) => <StyledIcon {...props} name="star" />;
export const TrashIcon = (props) => (
  <StyledIcon {...props} name="trash-outline" />
);
export const EditIcon = (props) => (
  <StyledIcon {...props} name="settings-outline" />
);
export const ForwardIcon = (props) => (
  <StyledIcon {...props} name="arrow-ios-forward" />
);
export const LoginIcon = (props) => (
  <StyledIcon {...props} name="person-outline" />
);
export const RegisterIcon = (props) => (
  <StyledIcon {...props} name="person-add-outline" />
);
export const LogoutIcon = (props) => (
  <StyledIcon {...props} name="power-outline" />
);
export const SettingsIcon = (props) => (
  <StyledIcon {...props} name="settings-outline" />
);
export const BackIcon = (props) => (
  <StyledIcon {...props} name="arrow-back-outline" />
);
export const CloseIcon = (props) => (
  <StyledIcon {...props} name="close-outline" />
);
export const PlusIcon = (props) => (
  <StyledIcon {...props} name="plus-outline" />
);
export const HomeIcon = (props) => (
  <StyledIcon {...props} name="home-outline" />
);
export const CreditCardIcon = (props) => (
  <StyledIcon {...props} name="credit-card-outline" />
);
export const EmailIcon = (props) => (
  <StyledIcon {...props} name="email-outline" />
);
export const FilterIcon = (props) => (
  <StyledIcon {...props} name="funnel-outline" />
);
export const CheckmarkIcon = (props) => (
  <StyledIcon {...props} name="checkmark-outline" />
);
export const MenuDrawer = (props) => (
  <StyledIcon {...props} name="menu-outline" />
);
export const BellIcon = (props) => (
  <StyledIcon {...props} name="bell-outline" />
);

export const StyledIcon = styled(Icon)`
  height: 32;
  width: 32;
`;
