import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {getReferenceFromFirebase} from '../../utils/actions/firebaseactions';

import {Styled} from './styles';

export default function LocalNotification() {
  const [initialNotifications, setInitialNotifications] = useState(null);

  //TODO: firestore entegre edilecek

  useEffect(() => {
    getReferenceFromFirebase('localnotification').then((response) => {
      const reversed = response.reverse();
      setInitialNotifications(reversed);
    });
  }, []);

  return (
    <ScrollView>
      <Styled.Container>
        {initialNotifications &&
          initialNotifications.map((item) => {
            return (
              <Styled.ListItem key={item.id}>
                <Styled.TextContainer>
                  <Styled.ListItemTitle>{item.title}</Styled.ListItemTitle>
                  <Styled.ListItemDesc>{item.description}</Styled.ListItemDesc>
                </Styled.TextContainer>
              </Styled.ListItem>
            );
          })}
      </Styled.Container>
    </ScrollView>
  );
}
