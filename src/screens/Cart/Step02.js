import React, {useContext} from 'react';

import {Container} from '../../themes/components';
import UserLoginForm from '../../components/UserComponents/UserLoginForm';
import UserProfile from '../../components/UserComponents/UserProfile';
import AppContext from '../../context/AppContext';

export default function Step02({setIsDisabled}) {
  const {user} = useContext(AppContext);

  React.useEffect(() => {
    setIsDisabled(user ? false : true);
  }, [user]);

  return (
    <>
      {user ? (
        <UserProfile />
      ) : (
        <Container>
          <UserLoginForm />
        </Container>
      )}
    </>
  );
}
