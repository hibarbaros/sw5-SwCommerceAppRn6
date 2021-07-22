import React, { useState, useEffect } from 'react';
import { Div, Radio, Text } from 'react-native-magnus';

import UserLoginForm from 'components/UserComponents/UserLoginForm';
import UserRegisterForm from 'components/UserComponents/UserRegisterForm';
import UserProfile from 'components/UserComponents/UserProfile';

const formArray = [
  { value: 'register', name: 'Register' },
  { value: 'login', name: 'Login' }
];

export default function StepForm({ user, setIsNextButtonDisable }) {
  const [formValue, setFormValue] = useState('login');

  useEffect(() => {
    setIsNextButtonDisable(user ? false : true);
  }, [user]);

  return (
    <>
      {user ? (
        <UserProfile />
      ) : (
        <>
          <Radio.Group row onChange={(data) => setFormValue(data.value)}>
            {formArray.map((item) => (
              <Radio key={item.value} value={item}>
                {({}) => (
                  <Div
                    bg={formValue === item.value ? 'blue600' : 'blue100'}
                    px="xl"
                    py="md"
                    mr="md"
                    rounded="circle"
                  >
                    <Text color={formValue === item.value ? 'white' : 'gray800'}>{item.name}</Text>
                  </Div>
                )}
              </Radio>
            ))}
          </Radio.Group>
          {formValue === 'register' ? (
            <UserRegisterForm navigationDisabled />
          ) : (
            <UserLoginForm navigationDisabled />
          )}
        </>
      )}
    </>
  );
}
