import React from 'react';

import UserEditForm from '../../components/UserComponents/UserEditForm';

const UserEditScreen = ({route}) => {
  const {userData} = route.params;

  return <UserEditForm userData={userData} />;
};

export default UserEditScreen;
