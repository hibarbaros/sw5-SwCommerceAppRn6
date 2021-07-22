import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Div } from 'react-native-magnus';

import { getReferenceFromFirebase } from 'utils/actions/firebaseactions';
import { Container, Text } from 'themes/components';

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
      <Container>
        {initialNotifications &&
          initialNotifications.map((item) => {
            return (
              <Div key={item.id}>
                <Text variant="large">{item.title}</Text>
                <Text variant="medium">{item.description}</Text>
              </Div>
            );
          })}
      </Container>
    </ScrollView>
  );
}
